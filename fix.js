const fs = require('fs');

let html = fs.readFileSync('c:/Users/User/Desktop/My web/index.html', 'utf8');

// 1. Fix Kotu Emojis in HTML
html = html.replace(/🤍🫶🏻/g, '❤️🥰');
html = html.replace(/<div class="reason-icon">🫂<\/div>/g, '<div class="reason-icon">🥰</div>');

// 2. Reduce Box Width on Mobile
// I'll add a CSS rule inside the HTML head or style tag
if (!html.includes('.reason-card { max-width: 90%; }')) {
    html = html.replace('</style>', '  @media (max-width: 768px) { .reason-card { max-width: 92%; margin: 0 auto; } }\n</style>');
}

// 3. Change 😂 to 🥰
html = html.replace(/<div class="reason-icon">😂<\/div>/g, '<div class="reason-icon">🥰</div>');

// 4. Add "Forever & Always..." text
// First, find the footer
// Wait, the footer already has: <p class="footer-small">Forever & Always &bull; 2002.10.26 &bull; The Most Beautiful Chapter Of My Life</p>
// I will change 2002.10.26 to 2026.10.26 as user requested in #4
html = html.replace('2002.10.26 &bull; The Most Beautiful Chapter', '2026.10.26 &bull; The Most Beautiful Chapter');

// 5. Add "October 26 • The Day An Angel Was Born •Kanishka" under the Hero Title or Letter Title?
// The user says "1.st scren short eke tryena me latter eka me tika dal change kral lassnta hadanna... To My Moon 🌙🤍"
// The text "✨ October 26 • The Day An Angel Was Born •Kanishka ✨" looks like it goes right before "A Romantic Letter For you mage pancho,"
html = html.replace('<h2 class="section-title">A Romantic Letter For mage pancho,</h2>', 
  '<h3 style="font-family: var(--font-sans); color: var(--gold); font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase; text-align: center; margin-bottom: 15px;">✨ October 26 &bull; The Day An Angel Was Born &bull; Kanishka ✨</h3>\n          <h2 class="section-title">A Romantic Letter For mage pancho,</h2>');

// Save HTML
fs.writeFileSync('c:/Users/User/Desktop/My web/index.html', html, 'utf8');


let js = fs.readFileSync('c:/Users/User/Desktop/My web/script.js', 'utf8');

// Fix theme names in JS
js = js.replace(/rose: ".*?",/g, 'rose: "🌹 Rose Petals (Classic)",');
js = js.replace(/lavender: ".*?",/g, 'lavender: "💜 Lavender Moonlight",');
js = js.replace(/sunset: ".*?",/g, 'sunset: "🌅 Sunset Romance",');
js = js.replace(/midnight: ".*?",/g, 'midnight: "🌌 Midnight Starlight (Dark Mode)",');
js = js.replace(/ruby: ".*?",/g, 'ruby: "🍷 Ruby Passion",');
js = js.replace(/ocean: ".*?",/g, 'ocean: "🌊 Ocean Serenade",');
js = js.replace(/skymoon: ".*?"/g, 'skymoon: "🌙 Moonlit Sky & Stars"');

// Fix Mic Btn icon in JS
js = js.replace(/<span class="icon">.*?<\/span> Blow With Mic/g, '<span class="icon">🎙️ 🌬️</span> Blow With Mic');
js = js.replace(/Blow gently directly into your microphone! .*?"/g, 'Blow gently directly into your microphone! 🌬️🎤"');

// Fix ShowToast emoji
js = js.replace(/Switched to \ .*?"/g, 'Switched to  ✨"');

fs.writeFileSync('c:/Users/User/Desktop/My web/script.js', js, 'utf8');

console.log("Fixed!");
