import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

// Restore the bundled website images before Vite copies the public directory.
const root = dirname(fileURLToPath(import.meta.url));
const publicRoot = resolve(root, 'public');
let restored = 0;
for (const filename of ['site-assets-1.assets', 'site-assets-2.assets', 'site-assets-3.assets']) {
const archive = readFileSync(new URL(filename, import.meta.url));
let offset = 0;
while (offset + 30 <= archive.length && archive.readUInt32LE(offset) === 0x04034b50) {
  const flags = archive.readUInt16LE(offset + 6);
  const method = archive.readUInt16LE(offset + 8);
  const compressedSize = archive.readUInt32LE(offset + 18);
  const originalSize = archive.readUInt32LE(offset + 22);
  const nameLength = archive.readUInt16LE(offset + 26);
  const extraLength = archive.readUInt16LE(offset + 28);
  const name = archive.subarray(offset + 30, offset + 30 + nameLength).toString('utf8');
  const start = offset + 30 + nameLength + extraLength;
  const target = resolve(root, name);
  if (flags & 9 || !target.startsWith(publicRoot + sep) || start + compressedSize > archive.length) {
    throw new Error(`Invalid bundled asset: ${name}`);
  }
  const packed = archive.subarray(start, start + compressedSize);
  const data = method === 0 ? packed : method === 8 ? inflateRawSync(packed) : null;
  if (!data || data.length !== originalSize) throw new Error(`Invalid asset data: ${name}`);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, data);
  restored++;
  offset = start + compressedSize;
}
}
if (!restored) throw new Error('The bundled website assets are missing.');
console.log(`Restored ${restored} website assets.`);
