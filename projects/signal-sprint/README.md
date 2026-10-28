# Signal Sprint

A live, turn-based multiplayer word game for 2–6 people playing on separate devices.

**Play:** https://signal-sprint.richeft10.chatgpt.site

## Rules

1. The host creates a room and shares the invite link or six-character room code.
2. The host starts when at least one other player has joined. Rooms support up to six players.
3. Players take turns naming a word that fits the displayed category and starts with the displayed letter.
4. A player has 60 seconds per turn. The word must not have appeared earlier in the round.
5. A valid word earns one point and passes the turn. A timeout passes the turn without a point.
6. The first player to reach five points wins. The host can start another game in the same room.

## Run and build

The app is a single-page HTML/CSS/JavaScript client served by an ESM Worker. The Worker uses a D1-compatible database binding named DB; it creates its game_rooms table on first request. Rooms and player sessions expire after three hours. The browser stores a player session in sessionStorage.

With Node.js installed, run:

```sh
node scripts/build.mjs
node scripts/validate-artifact.mjs
```

The build writes dist/server/index.js and dist/.openai/hosting.json. For another hosting project, create .openai/hosting.json with your Sites project ID and D1 binding name before building. The production deployment is currently managed by ChatGPT Sites.

## Source layout

- worker/index.js: room API, game rules, validation, and D1 persistence.
- worker/page.html: responsive game page and styles.
- worker/client.js: room UI, live polling, and word entry.
- scripts/build.mjs: embeds the client into the Worker bundle.
- scripts/validate-artifact.mjs: validates the built Worker module.

## Privacy and retention

Room data includes display names, scores, game state, and room session tokens. The server expires rooms after three hours. The browser stores each player's session token in session storage so it can rejoin after a refresh.
