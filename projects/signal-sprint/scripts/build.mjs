import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const pageTemplate = await readFile('worker/page.html', 'utf8');
const client = await readFile('worker/client.js', 'utf8');
const page = pageTemplate.replace('__CLIENT_SCRIPT__', `<script>\n${client}\n</script>`);
const source = await readFile('worker/index.js', 'utf8');
if (!source.includes('const PAGE = "";')) throw new Error('Worker page embed marker is missing.');
const bundled = source.replace('const PAGE = "";', `const PAGE = ${JSON.stringify(page)};`);
const manifest = await readFile('.openai/hosting.json', 'utf8');
await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await writeFile('dist/server/index.js', bundled);
await writeFile('dist/.openai/hosting.json', manifest);
console.log('Built Worker and embedded game page into dist/server/index.js');
