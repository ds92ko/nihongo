import { XMLParser } from 'fast-xml-parser';
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';
import { svgPathProperties } from 'svg-path-properties';

const INPUT_DIR = path.join('assets/kana');
const OUTPUT_DIR = path.join('assets/paths');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const svgFiles = await glob(`${INPUT_DIR}/*.svg`);

for (const file of svgFiles) {
  const svgContent = fs.readFileSync(file, 'utf-8');

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(svgContent);

  const paths = [];
  function extractPaths(obj) {
    if (!obj) return;
    if (obj.path) {
      const arr = Array.isArray(obj.path) ? obj.path : [obj.path];
      arr.forEach(p => {
        const d = p['@_d'];
        if (d) {
          const properties = new svgPathProperties(d);
          const length = properties.getTotalLength();
          paths.push({ d, length });
        }
      });
    }
    for (const key in obj) {
      if (typeof obj[key] === 'object') extractPaths(obj[key]);
    }
  }

  extractPaths(parsed.svg);

  const baseName = path.basename(file, '.svg');
  const tsFile = path.join(OUTPUT_DIR, `${baseName}.ts`);

  const tsContent = `export const paths = ${JSON.stringify(paths, null, 2)};\n`;

  fs.writeFileSync(tsFile, tsContent, 'utf-8');
  console.log(`Generated: ${tsFile}`);
}

console.log('All SVGs converted to TS paths (approx lengths)!');
