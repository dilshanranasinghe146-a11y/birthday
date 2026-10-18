const fs = require('fs');

function fixAll() {
    const htmlPath = 'c:/Users/User/Desktop/My web/index.html';
    const jsPath = 'c:/Users/User/Desktop/My web/script.js';
    const cssPath = 'c:/Users/User/Desktop/My web/style.css';

    let html = fs.readFileSync(htmlPath, 'utf8');
    let js = fs.readFileSync(jsPath, 'utf8');
    let css = fs.readFileSync(cssPath, 'utf8');

    // 1. Fix HTML emojis
    // Replace 🫶🏻 (and any strange box variations) with 🥰 in the text
    html = html.replace(/🫶🏻/g, '🥰');
    html = html.replace(/🤍🫶🏻/g, '🤍🥰');

    // Update reason-icons in index.html to standard emojis
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>Your Beautiful Smile<\/h4>/, '<div class="reason-icon">✨</div><h4>Your Beautiful Smile</h4>');
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>Your Voice & Talk<\/h4>/, '<div class="reason-icon">🌸</div><h4>Your Voice & Talk</h4>');
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>Your Silly Little Habits<\/h4>/, '<div class="reason-icon">🥺</div><h4>Your Silly Little Habits</h4>');
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>My "Pancho"<\/h4>/, '<div class="reason-icon">🧸</div><h4>My "Pancho"</h4>');
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>All Our Tiny Moments<\/h4>/, '<div class="reason-icon">☕</div><h4>All Our Tiny Moments</h4>');
    html = html.replace(/<div class="reason-icon">\?+<\/div><h4>My Sudu Bolee<\/h4>/, '<div class="reason-icon">🌟</div><h4>My Sudu Bolee</h4>');
    // Also try without the `?+` in case my regex missed it because it's literal square or something else
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>Your Beautiful Smile<\/h4>/, '<div class="reason-icon">✨</div><h4>Your Beautiful Smile</h4>');
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>Your Voice & Talk<\/h4>/, '<div class="reason-icon">🌸</div><h4>Your Voice & Talk</h4>');
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>Your Silly Little Habits<\/h4>/, '<div class="reason-icon">🥺</div><h4>Your Silly Little Habits</h4>');
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>My "Pancho"<\/h4>/, '<div class="reason-icon">🧸</div><h4>My "Pancho"</h4>');
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>All Our Tiny Moments<\/h4>/, '<div class="reason-icon">☕</div><h4>All Our Tiny Moments</h4>');
    html = html.replace(/<div class="reason-icon">.*?<\/div><h4>My Sudu Bolee<\/h4>/, '<div class="reason-icon">🌟</div><h4>My Sudu Bolee</h4>');

    // Update mic icon in index.html if it's there
    html = html.replace(/<span class="icon">.*?<\/span> Blow With Mic/, '<span class="icon">🎤🌬️</span> Blow With Mic');
    
    // 3. Update the Signature font in index.html
    // Look for <span class="signoff-signature" id="display-signature">SKY 🌙❤️</span>
    html = html.replace(
        /<span class="signoff-signature" id="display-signature">SKY 🌙❤️<\/span>/, 
        '<span class="signoff-signature" id="display-signature" style="font-family: \'Dancing Script\', cursive; font-size: 2.5rem; color: var(--primary-pink);">SKY 🌙❤️</span>'
    );

    // 4. Update the Footer Text
    html = html.replace(
        /<p>Handcrafted with all my heart by <strong>Dhananjaya<\/strong> for my <strong>Sudu Bolee \(Kanishka\)<\/strong>.*<\/p>/s,
        '<p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--deep-rose); line-height: 1.6;">.Forever & Always &bull; 2026.10.26 &bull; The Most Beautiful Chapter Of My Life<br><span style="font-family: var(--font-mono); font-size: 0.9em; margin-top: 5px; display: block;">SKY --&gt; MOON</span></p>'
    );
    html = html.replace(
        /<p>Handcrafted with all my heart by <strong>Dhananjaya<\/strong> for my <strong>Sudu Bolee \(Kanishka\)<\/strong>.*<\/p>/s,
        '<p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--deep-rose); line-height: 1.6;">.Forever & Always &bull; 2026.10.26 &bull; The Most Beautiful Chapter Of My Life<br><span style="font-family: var(--font-mono); font-size: 0.9em; margin-top: 5px; display: block;">SKY --&gt; MOON</span></p>'
    );

    // Update Header Date
    html = html.replace(
        /🎂 26th October 2002 &bull; Celebrating my princes ✨/, 
        '✨<br>October 26 &bull; The Day An Angel Was Born &bull; Kanishka<br>✨'
    );

    // Fix script.js mojibake
    js = js.replace(/<span class="icon">\?\?\? \?\?\?<\/span>/g, '<span class="icon">🎤🌬️</span>');
    js = js.replace(/<span class="icon">.*?<\/span> Listening\.\.\. Blow now!/, '<span class="icon">🎤🌬️</span> Listening... Blow now!');
    js = js.replace(/<span class="icon">.*?<\/span> Blow With Mic/g, '<span class="icon">🎤🌬️</span> Blow With Mic');
    
    // Fix Theme Emojis
    js = js.replace(/lavender: "\?\? Lavender Moonlight"/g, 'lavender: "💜 Lavender Moonlight"');
    js = js.replace(/skymoon: "\?\? Moonlit Sky & Stars"/g, 'skymoon: "🌌 Moonlit Sky & Stars"');
    js = js.replace(/ocean: "\?\? Ocean Serenade"/g, 'ocean: "🌊 Ocean Serenade"');
    js = js.replace(/sunset: "\?\? Golden Sunset"/g, 'sunset: "🌅 Golden Sunset"');
    js = js.replace(/default: "\?\? Classic Romance"/g, 'default: "💖 Classic Romance"');
    
    js = js.replace(/lavender: ".*? Lavender Moonlight"/g, 'lavender: "💜 Lavender Moonlight"');
    js = js.replace(/skymoon: ".*? Moonlit Sky & Stars"/g, 'skymoon: "🌌 Moonlit Sky & Stars"');
    js = js.replace(/ocean: ".*? Ocean Serenade"/g, 'ocean: "🌊 Ocean Serenade"');
    js = js.replace(/sunset: ".*? Golden Sunset"/g, 'sunset: "🌅 Golden Sunset"');
    js = js.replace(/default: ".*? Classic Romance"/g, 'default: "💖 Classic Romance"');
    
    // Fix Toast emoji
    js = js.replace(/showToast\(\`Switched to \$\{THEME_NAMES\[themeKey\]\} .*?\`\);/, 'showToast(`Switched to ${THEME_NAMES[themeKey]} ✨`);');

    // 4. Update style.css to reduce reason-card width on mobile
    if (!css.includes('.reason-card-mobile-fix')) {
        css += `\n\n/* Mobile reason card fix */\n@media (max-width: 768px) {\n  .reason-card {\n    max-width: 85%;\n    margin: 0 auto;\n  }\n}\n`;
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    fs.writeFileSync(jsPath, js, 'utf8');
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log("Done");
}

fixAll();
