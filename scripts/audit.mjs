import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const indexHtml = path.resolve('index.html');

function getAllFiles(dir, exts = ['.ts', '.tsx', '.css']) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = [...getAllFiles(srcDir), indexHtml];

const patterns = [
  { name: 'hex', regex: /#[0-9a-fA-F]{3,8}\b/g },
  { name: 'rgb/rgba', regex: /rgba?\([^)]+\)/g },
  { name: 'hsl/hsla', regex: /hsla?\([^)]+\)/g },
  { name: 'color keywords', regex: /:\s*(white|black|gray|grey)\b|fill=["'](white|black|gray|grey)["']|stroke=["'](white|black|gray|grey)["']/gi },
  { name: 'tailwind color utility', regex: /\b(bg|text|border)-(white|black|gray|neutral|slate|zinc|stone)-[a-z0-9]+\b|\b(bg|text|border)-(white|black)\b/g },
  { name: 'old tokens', regex: /--(color-[a-z0-9-]+|surface-[a-z0-9-]+|ink-[a-z0-9-]+|dome-[a-z0-9-]+|ink\b)/g },
  { name: 'svg fill/stroke', regex: /(fill|stroke)=["'](?!none|currentColor|var\()[^"']+["']/g }
];

const results = [];

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    for (const p of patterns) {
      let match;
      const re = new RegExp(p.regex);
      while ((match = re.exec(line)) !== null) {
        results.push({
          file: relPath,
          line: lineNum,
          category: p.name,
          match: match[0],
          rawLine: line.trim()
        });
      }
    }
  });
}

fs.writeFileSync('scripts/audit_results.json', JSON.stringify(results, null, 2), 'utf-8');
console.log(`Total occurrences: ${results.length}`);

const files = {};
for (const item of results) {
  if (!files[item.file]) files[item.file] = [];
  files[item.file].push(item);
}
console.log('Files with color matches:');
for (const [f, items] of Object.entries(files)) {
  console.log(`${f}: ${items.length} matches`);
}
