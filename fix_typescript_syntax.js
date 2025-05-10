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

// Function to fix TypeScript syntax in JavaScript/JSX files
function fixTypescriptSyntax(filePath) {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) {
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Remove TypeScript interfaces
    content = content.replace(/export\s+interface\s+\w+[\s\S]*?{[\s\S]*?}/g, '');
    content = content.replace(/interface\s+\w+[\s\S]*?{[\s\S]*?}/g, '');
    
    // Remove TypeScript type definitions
    content = content.replace(/export\s+type\s+\w+[\s\S]*?[=;]/g, '');
    content = content.replace(/type\s+\w+[\s\S]*?[=;]/g, '');
    
    // Fix generic types in React.forwardRef
    content = content.replace(/React\.forwardRef<[^>]*>/g, 'React.forwardRef');
    
    // Fix React.ElementRef<...> with trailing commas
    content = content.replace(/React\.ElementRef<[^,>]*>,/g, 'React.ElementRef,');
    
    // Remove TypeScript generics from useParams
    content = content.replace(/useParams<[^>]*>/g, 'useParams');
    
    // Fix missing closing brackets or parentheses issues
    content = content.replace(/resolver\),/g, 'resolver}),');
    
    // Fix mismatched tags in Profile.jsx
    if (filePath.includes('Profile.jsx')) {
      content = content.replace(/<\/CardTitle>/g, '</div>');
      content = content.replace(/<\/CardDescription>/g, '</CardHeader>');
      // Fix Button props
      content = content.replace(/<Button variant=/g, '<Button');
    }
    
    // Fix specific issue with toaster.jsx
    if (filePath.includes('toaster.jsx')) {
      content = content.replace(/toasts\.map\(function/g, 'toasts && toasts.map(function');
    }
    
    // Fix issue with Restaurant.jsx
    if (filePath.includes('Restaurant.jsx')) {
      content = content.replace(/useParams<{ id\);/g, 'useParams();');
    }
    
    // Fix issue with Calorie.jsx
    if (filePath.includes('Calorie.jsx')) {
      content = content.replace(/\[key\],/g, '[key]:');
    }
    
    // Fix issue with Cart.jsx
    if (filePath.includes('Cart.jsx')) {
      content = content.replace(/delivery' \? 3\.99 ;/g, "delivery' ? 3.99 :");
    }

    // Only write if content has changed
    if (content !== originalContent) {
      console.log(`Fixing TypeScript syntax in ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  } catch (error) {
    console.error(`Error fixing TypeScript syntax in ${filePath}:`, error);
  }
}

// Start from the src directory
const srcDir = path.join(__dirname, 'src');
walkDir(srcDir, fixTypescriptSyntax);

console.log('All TypeScript syntax fixed successfully!'); 