// This script converts TypeScript (.ts, .tsx) files to JavaScript (.js, .jsx)
// by removing TypeScript types and annotations

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to walk directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Convert a TypeScript file to JavaScript
function convertTsToJs(filePath) {
  // Skip if the file is not a TypeScript file or if it's a declaration file
  if ((!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) || 
      filePath.endsWith('.d.ts') || 
      filePath.includes('node_modules')) {
    return;
  }

  // Determine the output file name
  const outputPath = filePath.replace(/\.tsx?$/, match => 
    match === '.ts' ? '.js' : '.jsx'
  );

  // Skip if the JavaScript file already exists
  if (fs.existsSync(outputPath)) {
    // console.log(`Skipping ${filePath} - ${outputPath} already exists`);
    return;
  }

  console.log(`Converting ${filePath} to ${outputPath}`);

  try {
    // Read the TypeScript file
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove TypeScript-specific syntax
    content = content
      // Remove type imports
      .replace(/import\s+type\s+.*?from\s+.*?;?\n?/g, '')
      // Remove inline type imports
      .replace(/import\s+{(.*?)}\s+from\s+(.*?);?/g, (match, imports, from) => {
        const cleanedImports = imports
          .split(',')
          .map(i => i.trim())
          .filter(i => !i.includes('type'))
          .join(', ');
        
        return cleanedImports ? `import { ${cleanedImports} } from ${from};` : '';
      })
      // Remove type definitions
      .replace(/interface\s+\w+\s*{[\s\S]*?}\n?/g, '')
      .replace(/type\s+\w+\s*=[\s\S]*?;\n?/g, '')
      // Remove type annotations
      .replace(/:\s*[\w<>[\],\s|&{}()'"`?!]*?(?=[,)=;])/g, '')
      // Remove generic type parameters
      .replace(/<[\w<>[\],\s|&{}()'"`?!]*?>/g, '')
      // Remove export type statements
      .replace(/export\s+type\s+.*?;\n?/g, '')
      // Fix 'as' casting
      .replace(/\s+as\s+[\w<>[\],\s|&{}()'"`?!]*?(?=[,)=;])/g, '')
      // Remove 'extends' clauses in React.forwardRef
      .replace(/React\.forwardRef<[\w<>[\],\s|&{}()'"`?!]*?,\s*[\w<>[\],\s|&{}()'"`?!]*?>/g, 'React.forwardRef')
      // Fix non-null assertions
      .replace(/!\./g, '.')
      // Fix optional chaining type assertions
      .replace(/\?\.\(.*?\)/g, '?.');
    
    // Write the JavaScript file
    fs.writeFileSync(outputPath, content, 'utf8');
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
}

// Start conversion from the src directory
const srcDir = path.join(__dirname, 'src');
walkDir(srcDir, convertTsToJs);

console.log('Conversion complete!'); 