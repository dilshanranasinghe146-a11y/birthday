const fs = require('fs');

function updateFiles() {
    const htmlPath = 'c:/Users/User/Desktop/My web/index.html';
    const jsPath = 'c:/Users/User/Desktop/My web/script.js';

    let html = fs.readFileSync(htmlPath, 'utf8');
    let js = fs.readFileSync(jsPath, 'utf8');

    // 1. Remove theme grid and fix footer
    const themeGridIndex = html.indexOf('<div class="theme-options-grid">');
    if (themeGridIndex !== -1) {
        // Find the start of finale-actions to replace up to bottom nav
        const finaleActionsIndex = html.indexOf('<div class="finale-actions">');
        const bottomNavIndex = html.indexOf('<!-- MOBILE BOTTOM NAV -->');
        if (finaleActionsIndex !== -1 && bottomNavIndex !== -1) {
            html = html.substring(0, finaleActionsIndex) + 
            `<div class="finale-actions">
            <button id="replay-btn" class="action-btn secondary-btn"><span>✨</span> Replay The Surprise</button>
            <button id="send-kiss-btn" class="action-btn"><span>😘</span> Send Birthday Kisses to Pancho!</button>
          </div>
  
          <footer class="romantic-footer">
            <p style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--deep-rose); line-height: 1.6;">Designed by Sky for his lovely moon, This is our digital sky, hew</p>
          </footer>
        </div>
      </div>
    </section>

    ` + html.substring(bottomNavIndex);
        }
    } else {
        // If theme grid was already removed but footer text needs update
        html = html.replace(
            /Designed by Sky for his lovely moon, This is our digital sky, hew/,
            'Designed by Sky for his lovely moon, This is our digital sky, hew'
        );
    }

    // 2. Fix Hero date text (Kanishka)
    html = html.replace(
        /October 26 &bull; The Day An Angel Was Born &bull; .*?</g,
        'October 26 &bull; The Day An Angel Was Born &bull; Kanishka<'
    );
    html = html.replace(
        /October 26 &bull; The Day An Angel Was Born &bull; .*?</g,
        'October 26 &bull; The Day An Angel Was Born &bull; Kanishka<'
    );

    // 3. Fix 6 little things text
    html = html.replace(
        /6 Little Things I Adore About You, .*?</g,
        '6 Little Things I Adore About You, Sudu manika <'
    );
    
    // 4. Fix square boxes
    html = html.replace(/with you\. 🤍.*/g, 'with you. 🤍</p>');

    // 5. Update script.js for cycling themes
    if (!js.includes('themeKeys = Object.keys(THEME_NAMES)')) {
        js = js.replace(/if \(themeToggleBtn\) themeToggleBtn\.addEventListener\("click", openThemeModal\);/, `
    let currentThemeIndex = 0;
    const themeKeys = Object.keys(THEME_NAMES);
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            currentThemeIndex = (currentThemeIndex + 1) % themeKeys.length;
            applyTheme(themeKeys[currentThemeIndex], true);
        });
    }
        `);
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    fs.writeFileSync(jsPath, js, 'utf8');
}

updateFiles();
