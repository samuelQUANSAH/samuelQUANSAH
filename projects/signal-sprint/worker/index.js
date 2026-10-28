const PAGE = "";

const CATEGORIES = [
  "animals",
  "foods",
  "countries",
  "things you can find at the beach",
  "sports",
  "jobs",
  "things that are round",
  "things in a kitchen",
  "things that fly",
  "movies or shows",
];
const LETTERS = "ABCDEFGHJKLMNPRSTW";
const ROOM_TTL_MS = 3 * 60 * 60 * 1000;
const TURN_MS = 60 * 1000;
const WIN_SCORE = 5;
const ROOM_SCHEMA = `CREATE TABLE IF NOT EXISTS game_rooms (
  room_code TEXT PRIMARY KEY,
  payload TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  expires_at INTEGER NOT NULL
)`;
let dbReady = false;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(PAGE, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
          "content-security-policy": "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }
    if (!url.pathname.startsWith("/api/")) return new Response("Not found", { status: 404 });
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "allow": "GET, POST, OPTIONS" } });
    }
    if (!env.DB) return json({ error: "The game room database is not available." }, 503);

    try {
      await ensureDatabase(env.DB);
      if (url.pathname === "/api/rooms" && request.method === "POST") {
        return await createRoom(request, env.DB);
      }
      const match = url.pathname.match(/^\/api\/rooms\/([A-Z0-9]+)(?:\/(join|state|start|word))?$/);
      if (!match) return json({ error: "That game endpoint was not found." }, 404);
      const roomCode = match[1];
      const action = match[2] || "state";
      if (action === "join" && request.method === "POST") return await joinRoom(request, env.DB, roomCode);
      if (action === "state" && request.method === "GET") return await getState(request, env.DB, roomCode, url);
      if (action === "start" && request.method === "POST") return await startGame(request, env.DB, roomCode);
      if (action === "word" && request.method === "POST") return await submitWord(request, env.DB, roomCode);
      return json({ error: "That game action is not supported." }, 405);
    } catch (error) {
      return json({ error: "The game service hit a temporary error. Please retry." }, 500);
    }
  },
};

async function ensureDatabase(db) {
  if (dbReady) return;
  // This is an application-owned table. IF NOT EXISTS makes first-use setup safe across Worker isolates.
  await db.prepare(ROOM_SCHEMA).run();
  dbReady = true;
}

async function createRoom(request, db) {
  const body = await readJson(request);
  if (body.error) return json({ error: body.error }, 400);
  const name = cleanName(body.value.name);
  if (!name) return json({ error: "Enter a name up to 18 characters long." }, 400);
  await db.prepare("DELETE FROM game_rooms WHERE expires_at <= ?").bind(Date.now()).run();
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const roomCode = randomRoomCode();
    const token = randomToken();
    const room = {
      roomCode,
      status: "lobby",
      round: 0,
      category: "",
      letter: "",
      players: [{ token, name, score: 0, isHost: true }],
      hostToken: token,
      currentToken: "",
      lastWord: "",
      lastName: "",
      usedWords: [],
      winner: "",
      winnerToken: "",
      deadline: 0,
    };
    try {
      await db.prepare("INSERT INTO game_rooms (room_code, payload, version, expires_at) VALUES (?, ?, 1, ?)")
        .bind(roomCode, JSON.stringify(room), Date.now() + ROOM_TTL_MS).run();
      return json({ token, state: publicState(room, token) }, 201);
    } catch {
      // A code collision is rare; retry with a new random code.
    }
  }
  return json({ error: "Could not create a room right now. Try again." }, 503);
}

async function joinRoom(request, db, roomCode) {
  const body = await readJson(request);
  if (body.error) return json({ error: body.error }, 400);
  const name = cleanName(body.value.name);
  if (!name) return json({ error: "Enter a name up to 18 characters long." }, 400);
  const token = randomToken();
  const result = await mutateRoom(db, roomCode, (room) => {
    if (room.status !== "lobby") return { error: "This game has already started." };
    if (room.players.length >= 6) return { error: "This room is full (6 players maximum)." };
    room.players.push({ token, name, score: 0, isHost: false });
    return { token };
  });
  if (result.error) return json({ error: result.error }, result.status || 400);
  return json({ token, state: publicState(result.room, token) }, 200);
}

async function getState(request, db, roomCode, url) {
  const token = url.searchParams.get("token") || "";
  if (!token) return json({ error: "Your room session is missing. Rejoin with the room code." }, 401);
  let roomResult = await loadRoom(db, roomCode);
  if (!roomResult.room) return json({ error: roomResult.error }, roomResult.status);
  if (!roomResult.room.players.some((player) => player.token === token)) return json({ error: "That room session is no longer valid." }, 401);
  if (roomResult.room.status === "playing" && roomResult.room.deadline <= Date.now()) {
    await advanceTimedOutPlayer(db, roomCode);
    roomResult = await loadRoom(db, roomCode);
    if (!roomResult.room) return json({ error: roomResult.error }, roomResult.status);
  }
  return json(publicState(roomResult.room, token));
}

async function startGame(request, db, roomCode) {
  const body = await readJson(request);
  if (body.error) return json({ error: body.error }, 400);
  const token = typeof body.value.token === "string" ? body.value.token : "";
  const result = await mutateRoom(db, roomCode, (room) => {
    if (room.hostToken !== token) return { error: "Only the host can start the game.", status: 403 };
    if (room.players.length < 2) return { error: "Invite at least one friend before starting." };
    if (room.status === "playing") return { error: "The game is already in progress." };
    if (room.status === "finished") room.players.forEach((player) => { player.score = 0; });
    room.status = "playing";
    room.round = (room.round || 0) + 1;
    room.category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    room.letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    room.currentToken = room.players[0].token;
    room.lastWord = "";
    room.lastName = "";
    room.usedWords = [];
    room.winner = "";
    room.winnerToken = "";
    room.deadline = Date.now() + TURN_MS;
    return {};
  });
  if (result.error) return json({ error: result.error }, result.status || 400);
  return json(publicState(result.room, token));
}

async function submitWord(request, db, roomCode) {
  const body = await readJson(request);
  if (body.error) return json({ error: body.error }, 400);
  const token = typeof body.value.token === "string" ? body.value.token : "";
  const word = typeof body.value.word === "string" ? body.value.word.trim().toLocaleLowerCase("en-US") : "";
  if (!word || word.length > 32) return json({ error: "Enter a word up to 32 characters long." }, 400);
  const result = await mutateRoom(db, roomCode, (room) => {
    if (room.status !== "playing") return { error: "The game is not accepting words right now." };
    if (room.deadline <= Date.now()) return { error: "Time ran out. The turn has moved on." };
    if (room.currentToken !== token) return { error: "It is not your turn yet." };
    if (!word.startsWith(room.letter.toLocaleLowerCase("en-US"))) return { error: `Your word must start with ${room.letter}.` };
    if (room.usedWords.includes(word)) return { error: "That word has already been used this round." };
    const player = room.players.find((entry) => entry.token === token);
    if (!player) return { error: "That room session is no longer valid.", status: 401 };
    player.score += 1;
    room.usedWords.push(word);
    room.lastWord = word;
    room.lastName = player.name;
    if (player.score >= WIN_SCORE) {
      room.status = "finished";
      room.winner = player.name;
      room.winnerToken = token;
      room.deadline = 0;
    } else {
      const index = room.players.findIndex((entry) => entry.token === token);
      room.currentToken = room.players[(index + 1) % room.players.length].token;
      room.deadline = Date.now() + TURN_MS;
    }
    return {};
  });
  if (result.error) return json({ error: result.error }, result.status || 400);
  return json(publicState(result.room, token));
}

async function advanceTimedOutPlayer(db, roomCode) {
  await mutateRoom(db, roomCode, (room) => {
    if (room.status !== "playing" || room.deadline > Date.now()) return { error: "No timeout to process." };
    const index = room.players.findIndex((player) => player.token === room.currentToken);
    room.currentToken = room.players[(index + 1) % room.players.length]?.token || "";
    room.deadline = Date.now() + TURN_MS;
    room.lastWord = "";
    room.lastName = "Time ran out; turn passed.";
    return {};
  });
}

async function mutateRoom(db, roomCode, mutate) {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const loaded = await loadRoom(db, roomCode);
    if (!loaded.room) return { error: loaded.error, status: loaded.status };
    const room = loaded.room;
    const outcome = mutate(room) || {};
    if (outcome.error) return { error: outcome.error, status: outcome.status };
    const saved = await db.prepare("UPDATE game_rooms SET payload = ?, version = version + 1 WHERE room_code = ? AND version = ?")
      .bind(JSON.stringify(room), roomCode, loaded.version).run();
    if (saved.meta?.changes === 1) return { room, ...outcome };
  }
  return { error: "Room changed just now. Please retry." , status: 409 };
}

async function loadRoom(db, roomCode) {
  const row = await db.prepare("SELECT payload, version, expires_at FROM game_rooms WHERE room_code = ?")
    .bind(roomCode).first();
  if (!row) return { error: "Room not found. Check the code and try again.", status: 404 };
  if (row.expires_at <= Date.now()) return { error: "This room has expired. Create a new room.", status: 410 };
  try { return { room: JSON.parse(row.payload), version: row.version }; }
  catch { return { error: "This room could not be loaded. Create a new room.", status: 500 }; }
}

function publicState(room, token) {
  const currentPlayer = room.players.find((player) => player.token === room.currentToken);
  const winner = room.players.find((player) => player.token === room.winnerToken);
  return {
    roomCode: room.roomCode,
    status: room.status,
    round: room.round,
    category: room.category,
    letter: room.letter,
    players: room.players.map((player) => ({
      name: player.name,
      score: player.score,
      isHost: player.isHost,
      isYou: player.token === token,
      isCurrent: player.token === room.currentToken,
    })),
    isHost: room.hostToken === token,
    yourTurn: room.currentToken === token && room.status === "playing",
    currentName: currentPlayer?.name || "",
    lastWord: room.lastWord,
    lastName: room.lastName,
    winner: room.winner,
    winnerScore: winner?.score || 0,
    deadline: room.deadline,
  };
}

async function readJson(request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 4096) return { error: "Request is too large." };
  try {
    const value = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) return { error: "Request body must be an object." };
    return { value };
  } catch { return { error: "Request body must be valid JSON." }; }
}

function cleanName(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[<>\u0000-\u001f]/g, "").slice(0, 18);
}
function randomRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(bytes, (byte) => chars[byte % chars.length]).join("");
}
function randomToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}
function json(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff" },
  });
}
