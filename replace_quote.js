const fs = require('fs');

const file = 'c:/Users/User/Desktop/My web/index.html';
let content = fs.readFileSync(file, 'utf8');

const target = '“It was the chapter where I had my Sudu Bolee.” 🌙❤️';
const replacement = '“It was the chapter where I had You.” 🌙❤️';

console.log('Includes target:', content.includes(target));

content = content.split('where I had my Sudu Bolee.').join('where I had You.');
content = content.split('where I had my Sudu Bolee.”').join('where I had You.”');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated!');
