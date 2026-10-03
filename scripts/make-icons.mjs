// Erzeugt die PNG-Icons aus public/icon.svg (für Homescreen und App-Manifest).
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const svg = readFileSync('public/icon.svg', 'utf8');
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(`public/${name}`, png);
}
console.log('Icons erstellt.');
