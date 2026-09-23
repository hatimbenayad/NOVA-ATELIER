import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const indexHtml = path.resolve('index.html');
const tokensFile = path.resolve('src/styles/tokens.css');

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

const filesToScan = [...getAllFiles(srcDir), indexHtml].filter(
  (f) => path.resolve(f) !== tokensFile
);

const forbiddenPatterns = [
  {
    name: 'Hex color',
    // Exclude meta theme-color in index.html if specifically #EDECE8
    test: (line, isHtml) => {
      if (isHtml && line.includes('meta name="theme-color"') && line.includes('#EDECE8')) {
        const cleaned = line.replace(/<meta name="theme-color" content="#EDECE8"\s*\/?>/, '');
        return /#[0-9a-fA-F]{3,8}\b/.test(cleaned);
      }
      return /#[0-9a-fA-F]{3,8}\b/.test(line);
    },
  },
  {
    name: 'rgb() or rgba()',
    test: (line) => /rgba?\(/.test(line),
  },
  {
    name: 'hsl() or hsla()',
    test: (line) => /hsla?\(/.test(line),
  },
  {
    name: 'black or white used as a color value',
    test: (line) => {
      // Matches CSS property color values or SVG attributes
      return (
        /(?:color|background|background-color|border|border-color|fill|stroke|outline|outline-color)\s*:\s*[^;]*\b(white|black)\b/i.test(line) ||
        /(?:fill|stroke)=["'](white|black)["']/i.test(line) ||
        /\b(?:bg|text|border)-(?:white|black)\b/.test(line)
      );
    },
  },
  {
    name: 'Disallowed Tailwind color utility',
    test: (line) => {
      // Default tailwind palettes like bg-gray-500, text-neutral-400, etc.
      return /\b(bg|text|border|ring|stroke|fill)-(?:gray|neutral|slate|zinc|stone-[0-9]|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-[0-9]+)?\b/.test(line);
    },
  },
  {
    name: 'Old design token',
    test: (line) => {
      return /--(?:color-(?:bg|bg-light|bg-edge|ink|ink-soft|hairline|white|accent)|surface-(?:stone|dome)|ink-on-dome|dome-line)\b/.test(line);
    },
  },
];

let errorCount = 0;

for (const file of filesToScan) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const isHtml = path.extname(file) === '.html';
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // Skip empty lines or pure single-line comment lines
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') && trimmed.endsWith('*/')) {
      return;
    }

    for (const p of forbiddenPatterns) {
      if (p.test(line, isHtml)) {
        console.error(`FAIL: [${p.name}] at ${relPath}:${idx + 1}`);
        console.error(`  Line: ${trimmed}`);
        errorCount++;
      }
    }
  });
}

if (errorCount > 0) {
  console.error(`\nFound ${errorCount} color violations. Strict color policy failed.`);
  process.exit(1);
} else {
  console.log('PASS: All files adhere strictly to the global color tokens.');
  process.exit(0);
}
