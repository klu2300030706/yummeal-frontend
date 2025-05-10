const fs = require('fs');
const path = require('path');

// Function to walk directories recursively
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Function to fix import statements in JavaScript/JSX files
function fixImports(filePath) {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file contains the issue
    if (!content.includes('from ;')) {
      return;
    }

    console.log(`Fixing imports in ${filePath}`);
    
    // Fix import statements
    const fixedContent = content
      // Fix "import x from ;'module'" pattern
      .replace(/from\s*;\s*(['"])(.*?)\1/g, 'from $1$2$1')
      // Fix "import * ;" pattern in imports (for badge.jsx)
      .replace(/import\s+\*\s*;/g, 'import * as cva from ');
    
    // Write the fixed content back
    fs.writeFileSync(filePath, fixedContent, 'utf8');
  } catch (error) {
    console.error(`Error fixing imports in ${filePath}:`, error);
  }
}

// Start the process from the src directory
const srcDir = path.join(__dirname, 'src');
walkDir(srcDir, fixImports);

console.log('All imports fixed successfully!'); 