const fs = require('fs');

function revertAndFix() {
    const htmlPath = 'c:/Users/User/Desktop/My web/index.html';
    const jsPath = 'c:/Users/User/Desktop/My web/script.js';

    let html = fs.readFileSync(htmlPath, 'utf8');
    let js = fs.readFileSync(jsPath, 'utf8');

    // 1. Add the theme modal before <nav class="mobile-bottom-nav">
    const modalHTML = `
    <!-- THEME SELECTION MODAL -->
    <div id="theme-modal" class="theme-modal" aria-hidden="true">
      <div class="theme-backdrop" id="theme-backdrop"></div>
      <div class="theme-sheet">
        <div class="sheet-drag-handle"></div>
        <div class="sheet-title-row">
          <h3 style="font-family: var(--font-serif); color: var(--deep-rose);">🎨 Choose a Theme</h3>
          <button id="theme-close-btn" class="close-btn" style="background: none; border: none; font-size: 2rem; color: var(--text-color); cursor: pointer;">&times;</button>
        </div>
        <div class="theme-options-grid" style="display: grid; gap: 12px; margin-top: 15px;">
          <button class="theme-option-card active" data-theme="rose" title="Rose Petals & Blush">
            <div class="theme-swatch swatch-rose"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">💖 Rose Petals</span><span class="theme-desc">Sweet Pink & Deep Rose</span></div>
          </button>
          <button class="theme-option-card" data-theme="lavender" title="Lavender Moonlight">
            <div class="theme-swatch swatch-lavender"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">💜 Lavender Moonlight</span><span class="theme-desc">Dreamy Lilac & Twilight Glow</span></div>
          </button>
          <button class="theme-option-card" data-theme="sunset" title="Sunset Romance">
            <div class="theme-swatch swatch-sunset"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">🌅 Sunset Romance</span><span class="theme-desc">Warm Golden Peach</span></div>
          </button>
          <button class="theme-option-card" data-theme="midnight" title="Midnight Starlight">
            <div class="theme-swatch swatch-midnight"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">🌌 Midnight Starlight</span><span class="theme-desc">Velvet Dark Mode</span></div>
          </button>
          <button class="theme-option-card" data-theme="ruby" title="Ruby Passion">
            <div class="theme-swatch swatch-ruby"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">❤️ Ruby Passion</span><span class="theme-desc">Crimson Wine & Rose</span></div>
          </button>
          <button class="theme-option-card" data-theme="ocean" title="Ocean Serenade">
            <div class="theme-swatch swatch-ocean"><span class="swatch-bubble b1"></span><span class="swatch-bubble b2"></span></div>
            <div class="theme-info"><span class="theme-name">🌊 Ocean Serenade</span><span class="theme-desc">Aqua Breeze & Sky Blue</span></div>
          </button>
          <button class="theme-option-card" data-theme="skymoon" title="Moonlit Sky & Stars">
            <div class="theme-swatch swatch-skymoon">
              <span class="swatch-bubble b1" style="background:rgba(255,209,102,0.55);width:14px;height:14px;top:5px;left:8px;border-radius:50%;"></span>
              <span class="swatch-bubble b2" style="background:rgba(255,255,255,0.7);width:5px;height:5px;bottom:8px;right:10px;border-radius:50%;"></span>
            </div>
            <div class="theme-info"><span class="theme-name">✨ Moonlit Sky & Stars</span><span class="theme-desc">Deep Night Sky</span></div>
          </button>
        </div>
      </div>
    </div>
    `;

    if (!html.includes('id="theme-modal"')) {
        html = html.replace('<!-- MOBILE BOTTOM NAV -->', modalHTML + '\n    <!-- MOBILE BOTTOM NAV -->');
    }

    // 2. Fix the Footer text to include both parts beautifully
    html = html.replace(
        /Designed by Sky for his lovely moon, This is our digital sky, hew/g,
        `.Forever & Always &bull; 2026.10.26 &bull; The Most Beautiful Chapter Of My Life<br><span style="font-family: var(--font-mono); font-size: 0.9em; margin-top: 8px; margin-bottom: 8px; display: block;">SKY --&gt; MOON</span><br><span style="font-family: var(--font-sans); font-size: 0.85em; opacity: 0.9;">Designed by Sky for his lovely moon. This is our digital sky, hew ✨</span>`
    );

    // 3. Restore openThemeModal logic in script.js
    // I previously replaced the listener with cycling logic. Let's find and revert it.
    js = js.replace(/let currentThemeIndex = 0;[\s\S]*?applyTheme\(themeKeys\[currentThemeIndex\], true\);\s*\}\);\s*\}/, 
    'if (themeToggleBtn) themeToggleBtn.addEventListener("click", openThemeModal);');
    
    // We also need to re-fetch the newly created themeCards
    // But in `script.js`, it does `const themeCards = document.querySelectorAll(".theme-option-card");` at the top!
    // Since we created the modal elements, they exist when script.js runs.
    if (!js.includes('const themeCards = document.querySelectorAll(".theme-option-card");')) {
        js = js.replace('const metaThemeColor = document.getElementById("meta-theme-color");', 
        'const themeCards = document.querySelectorAll(".theme-option-card");\n    const metaThemeColor = document.getElementById("meta-theme-color");');
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    fs.writeFileSync(jsPath, js, 'utf8');
}

revertAndFix();
