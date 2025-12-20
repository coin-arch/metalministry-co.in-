const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'public', 'images');
const outputFile = path.join(__dirname, 'src', 'lib', 'imageMap.ts');

const files = fs.readdirSync(imagesDir);
const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

const content = `// This file is auto-generated
export const imageMap = ${JSON.stringify(imageFiles, null, 2)};
`;

fs.writeFileSync(outputFile, content);
console.log(`Generated imageMap.ts with ${imageFiles.length} images.`);
