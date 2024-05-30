const fs = require('fs');
const path = require('path');

function findPunycode(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findPunycode(fullPath);
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
    //   if (content.includes("require('punycode')")) {
      if (content.includes("punycode")) {
        console.log(`Found punycode in: ${fullPath}`);
      }
    }
  }
}

findPunycode('node_modules');
