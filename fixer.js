const fs = require('fs');

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove BOM if it exists so we don't duplicate it
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }

    // Fix quotes and dashes that got mojibaked into Windows-1252
    content = content.replace(/â€œ/g, '"');
    content = content.replace(/â€/g, '"');
    content = content.replace(/â€™/g, "'");
    content = content.replace(/â€˜/g, "'");
    content = content.replace(/â€¦/g, '...');
    content = content.replace(/â€”/g, '-');
    content = content.replace(/â€“/g, '-');
    content = content.replace(/\?T/g, "'");
    content = content.replace(/\?o/g, '"');
    content = content.replace(/\?\?/g, '"');
    content = content.replace(/\?~/g, "'");
    content = content.replace(/\?/g, "...");
    content = content.replace(/\?"/g, "-");

    // Replace HTML entities with actual Unicode characters so they don't break in textContent
    content = content.replace(/&#x1F496;/g, '💖');
    content = content.replace(/&#x2764;&#xFE0F;/g, '❤️');
    content = content.replace(/&#x2728;/g, '✨');
    content = content.replace(/&#x1F338;/g, '🌸');
    content = content.replace(/&#x1F48C;/g, '💌');
    content = content.replace(/&#x1F4F8;/g, '📸');
    content = content.replace(/&#x1F382;/g, '🎂');
    content = content.replace(/&#x1F49D;/g, '💝');
    content = content.replace(/&#x1F56F;&#xFE0F;/g, '🕯️');
    content = content.replace(/&#x1F4A8;/g, '💨');
    content = content.replace(/&#x1F399;&#xFE0F;/g, '🎙️');
    content = content.replace(/&#x1F32C;&#xFE0F;/g, '🌬️');
    content = content.replace(/&#x1F389;/g, '🎉');
    content = content.replace(/&#x1F97A;/g, '🥺');
    content = content.replace(/&#x1F90D;/g, '🤍');
    content = content.replace(/&#x1FFAC;/g, '🫂');
    content = content.replace(/&#x2615;/g, '☕');
    content = content.replace(/&#x1F31F;/g, '🌟');
    content = content.replace(/&#x1F4F1;/g, '📱');
    content = content.replace(/&#x1F5BC;&#xFE0F;/g, '🖼️');
    content = content.replace(/&#x1F448;/g, '👈');
    content = content.replace(/&#x1F449;/g, '👉');
    content = content.replace(/&#x2715;/g, '✕');
    content = content.replace(/&#x1F495;/g, '💕');
    content = content.replace(/&#x1F49C;/g, '💜');
    content = content.replace(/&#x1F9E1;/g, '🧡');
    content = content.replace(/&#x1F49B;/g, '💛');
    content = content.replace(/&#x1F48B;/g, '💋');
    content = content.replace(/&#x1F381;/g, '🎁');
    content = content.replace(/&#x1F3A8;/g, '🎨');
    content = content.replace(/&#x2713;/g, '✓');
    content = content.replace(/&#x1F304;/g, '🌅');
    content = content.replace(/&#x1F30C;/g, '🌌');
    content = content.replace(/&#x1F352;/g, '🍒');
    content = content.replace(/&#x1F30A;/g, '🌊');
    content = content.replace(/&#x1F319;/g, '🌙');
    content = content.replace(/&#x1F3B5;/g, '🎵');
    content = content.replace(/&#x1F602;/g, '😂');
    content = content.replace(/&#x1F942;/g, '🥂');
    content = content.replace(/&#x1F339;/g, '🌹');
    content = content.replace(/&#x1F60D;/g, '😍');
    content = content.replace(/&#x1F973;/g, '🥳');
    content = content.replace(/&#x2B50;/g, '⭐');
    content = content.replace(/&#x2601;&#xFE0F;/g, '☁️');
    content = content.replace(/&#x1F917;/g, '🤗');
    content = content.replace(/&#x1F680;/g, '🚀');
    
    // Also catch some double-encoded entities just in case
    content = content.replace(/&amp;#x/g, '&#x');

    // Add BOM and write
    fs.writeFileSync(filePath, '\uFEFF' + content, 'utf8');
}

fixFile('c:/Users/User/Desktop/My web/index.html');
fixFile('c:/Users/User/Desktop/My web/script.js');

console.log("Done");
