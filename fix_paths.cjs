const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(searchRegex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
}

// 1. Fix Root HTML files (index.html, dashboard.html)
const rootFiles = ['index.html', 'dashboard.html'];
rootFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    // replace /src/ with ./src/
    replaceInFile(filePath, /href="\/src\//g, 'href="./src/');
    replaceInFile(filePath, /src="\/src\//g, 'src="./src/');
    // replace /theme.js with ./theme.js
    replaceInFile(filePath, /src="\/theme\.js"/g, 'src="./theme.js"');
    console.log('Fixed paths in', file);
  }
});

// 2. Fix Services HTML files
const servicesDir = path.join(__dirname, 'services');
if (fs.existsSync(servicesDir)) {
  const files = fs.readdirSync(servicesDir).filter(f => f.endsWith('.html'));
  files.forEach(file => {
    const filePath = path.join(servicesDir, file);
    // replace /src/ with ../src/
    replaceInFile(filePath, /href="\/src\//g, 'href="../src/');
    replaceInFile(filePath, /src="\/src\//g, 'src="../src/');
    // replace /theme.js with ../theme.js
    replaceInFile(filePath, /src="\/theme\.js"/g, 'src="../theme.js"');
    console.log('Fixed paths in', file);
  });
}
