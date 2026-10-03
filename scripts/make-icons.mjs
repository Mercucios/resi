// Erzeugt die PNG-Icons für Homescreen und App-Manifest.
// icon.svg          – abgerundetes Icon (Browser, in der App)
// icon-maskable.svg – Android: Inhalt mit Sicherheitsabstand, weil Android rund/oval zuschneidet
// icon-full.svg     – iPhone: volle Fläche, iOS rundet die Ecken selbst ab
import { readFileSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const jobs = [
  ['icon.svg', 'icon-192.png', 192],
  ['icon.svg', 'icon-512.png', 512],
  ['icon-maskable.svg', 'icon-maskable-192.png', 192],
  ['icon-maskable.svg', 'icon-maskable-512.png', 512],
  ['icon-full.svg', 'apple-touch-icon.png', 180]
];
for (const [src, out, size] of jobs) {
  const svg = readFileSync(`public/${src}`, 'utf8');
  writeFileSync(`public/${out}`, new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng());
}
console.log('Icons erstellt.');
