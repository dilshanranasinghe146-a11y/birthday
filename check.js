const fs = require('fs');
const html = fs.readFileSync('c:/Users/User/Desktop/My web/index.html', 'utf8');

// Find all emojis to see which ones are missing or messed up
const emojis = html.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
console.log([...new Set(emojis)]);

// Find the content of the reason-icons
const icons = html.match(/<div class="reason-icon">(.*?)<\/div>/g);
console.log(icons);

// Find the toast messages in script.js
const js = fs.readFileSync('c:/Users/User/Desktop/My web/script.js', 'utf8');
const toasts = js.match(/Switched to.*?(?=")/g);
console.log(toasts);
