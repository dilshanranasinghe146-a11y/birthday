const fs = require('fs');
const path = 'c:/Users/User/Desktop/My web/index.html';
const scriptPath = 'c:/Users/User/Desktop/My web/script.js';

let html = fs.readFileSync(path, 'utf8');
let js = fs.readFileSync(scriptPath, 'utf8');

// 1. Replace Letter Body
const letterStart = html.indexOf('<div class="letter-body">');
const letterEnd = html.indexOf('</div>', html.indexOf('<div class="letter-signoff">')) + 6;
if (letterStart !== -1 && letterEnd !== -1) {
    const newLetterBody = `<div class="letter-body">
              <p class="letter-salutation">To My Moon 🌙🤍</p>
              <p>You are not just someone who came into my life. You became one of the most beautiful parts of my story, and I will always be grateful to have you. ❤️<br>Happy Birthday, mage Bolee! 🎂🥹❤️</p>
              <p>May your life be filled with happiness, love, peace, and success. May all your dreams come true, and may you become the happiest version of yourself. Sometimes, I feel like I should thank your mom and dad for bringing someone as precious as you into this world. Having you in my life is truly a beautiful gift. 🤍🫶🏻</p>
              <p>මම දන්නේ නැහැ ඉස්සරහට අපේ ජීවිත කොහොම වෙනස් වෙයිද කියලා. ඒත් මගේ ජීවිතයට හමුවුණු ලස්සනම, හොඳම හමුවීම ඔයා. ඒක හැමදාමත් එහෙමයි, වෙනසක් වෙන්නේ නැහැ. අද ඔයාගේ උපන්දිනය දවසේ, මේ මොහොතේ, මේ තත්පරේ මට ඔයා ළඟින් ඉන්න බැරි වුණත්, my heart and my soul are always with you. ❤️🫂</p>
              <p>ඔයාට මතකද අපේ සිංහල සාහිත්‍ය පොතේ තිබුණු “ගඟේ සංගීතය” පාඩම? 🥹❤️<br>අපේ ජීවිතත් ගඟක් වගේ. ගඟකට ගල්පර, බාධක හමුවුණත් ඒවා මඟහරවාගෙන ඉදිරියට ගලාගෙන යනවා. අපේ ජීවිතවලටත් ප්‍රශ්න එයි, ඒත් කොච්චර බාධක ආවත් අපි එකට ඒවාට මුහුණ දෙමු, විසඳුම් හොයාගමු. ප්‍රශ්න නිසා එකිනෙකාව අතහරින්නේ නැතුව, එකිනෙකාට ශක්තියක් වෙලා ඉදිරියට යමු. මට විශ්වාසයි, අපිටත් ලස්සන දවස් උදා වෙනවා කියලා. ❤️✨</p>
              <p>Let's build a beautiful and successful life together. Let's support each other's dreams, celebrate our achievements, and keep choosing each other even on difficult days. I want to see you grow, succeed, and live the life you've always dreamed of—with me beside you, sharing every beautiful moment.</p>
              <p>No matter how much life changes, whenever I hear the name “Pancho,” my heart will always remember you with love. You are more than just someone I love; you are a beautiful part of my life that I will always treasure. 🥹🤍</p>
              <p class="letter-wish">And if someone ever asks me about one of the most beautiful chapters of my life, my answer will always be:<br>
                <span style="display: block; margin-top: 10px; font-size: 1.35rem; color: var(--deep-rose); font-family: var(--font-serif); font-weight: 700;">
                  “It was the chapter where I had my Sudu Bolee.” 🌙❤️
                </span>
              </p>
              <p>I don't just wish to see you happy today; I wish to see you happy and successful for many years to come. May we achieve our dreams together and create a beautiful life filled with love, happiness, and unforgettable memories.</p>
              <p>The dream isn't just about having a beautiful life. It's about building that life with you. 🥹🤍</p>
              <div class="letter-signoff">
                <span class="signoff-note">Forever and always yours,</span>
                <span class="signoff-signature" id="display-signature">SKY 🌙❤️</span>
              </div>
            </div>`;
    
    html = html.substring(0, letterStart) + newLetterBody + html.substring(letterEnd);
}

// 2. Finale Changes
html = html.replace('Wondering how much Dhananjaya loves you today, Pancho?', 'Wondering how much i am loves you, Pancho?');
html = html.replace('Happy Birthday, My Sudu Bolee ❤️', 'Happy level up day, mage Boleee...❤️');
html = html.replace('Happy Birthday, My Sudu Bolee', 'Happy level up day, mage Boleee...');
html = html.replace('🎂 26th October 2002 &bull; Celebrating Kanishka Maduwanthi ✨', '🎂 26th October 2002 &bull; Celebrating my princes ✨');
html = html.replace('🎂 26TH OCTOBER 2002 &bull; CELEBRATING KANISHKA MADUWANTHI ✨', '🎂 26TH OCTOBER 2002 &bull; CELEBRATING MY PRINCES ✨');

// For the quote replacement, since I used regular spaces and newlines, let's just use regex to match it.
html = html.replace(
  /"And if someone ever asks me what one of the most beautiful chapters of my life was... <br>\s*I'll simply say, 'It was the chapter where I had my Sudu Bolee.' ❤️"/,
  '"And if someone ever asks me what one of the most beautiful chapters of my life was... <br>\n            I\'ll simply say, \'It was the chapter where I had you.\' ❤️"'
);

// 3. Gallery Header
html = html.replace('Moments I Never Want To Forget, Kanii 🥺', 'Moments I Never Want To Forget Manika🥺');

// 4. Letter Section Header
html = html.replace('A Romantic Letter For My Sudu Bolee', 'A Romantic Letter For mage pancho,');
html = html.replace("Straight From Dhananjaya's Heart", 'Straight From My Heart');
html = html.replace("STRAIGHT FROM DHANANJAYA'S HEART", 'STRAIGHT FROM MY HEART');

// 5. Hero & Footer
// Using regex in case of different formatting
html = html.replace(/<h1 class="hero-title">\s*Happy Birthday, <br>/, '<h1 class="hero-title">\n        Happy Birthday manika.., <br>');
html = html.replace(/Handcrafted with all my heart by <strong>Dhananjaya Dilshan<\/strong> for his <strong>Sudu Bolee \(Kanishka\)<\/strong> 💖/, 'Handcrafted with all my heart by <strong>Dhananjaya</strong> for my <strong>Sudu Bolee (Kanishka)</strong> 💖<br><span style="font-size: 0.9em; opacity: 0.8; display: block; margin-top: 5px; font-weight: bold; font-family: var(--font-mono);">SKY ---->MOOn</span>');

// Apply to script.js config
js = js.replace(/yourSignature: "Dhananjaya Dilshan",/g, 'yourSignature: "SKY 🌙❤️",');

fs.writeFileSync(path, html, 'utf8');
fs.writeFileSync(scriptPath, js, 'utf8');
console.log("Replaced successfully!");
