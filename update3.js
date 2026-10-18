const fs = require('fs');

function fixAll() {
    const htmlPath = 'c:/Users/User/Desktop/My web/index.html';
    const jsPath = 'c:/Users/User/Desktop/My web/script.js';

    let html = fs.readFileSync(htmlPath, 'utf8');
    let js = fs.readFileSync(jsPath, 'utf8');

    // 1. Remove the theme-options-grid section at the bottom of HTML
    // Looking at the HTML structure, the footer was previously deleted because of my bad regex.
    // Let's replace the whole finale-actions and whatever follows with proper structure.
    const finaleActionsIndex = html.indexOf('<div class="finale-actions">');
    if (finaleActionsIndex !== -1) {
        const bottomNavIndex = html.indexOf('<!-- MOBILE BOTTOM NAV -->');
        if (bottomNavIndex !== -1) {
            // Replace everything from finaleActions to bottomNav with proper footer
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
    }

    // Fix Hero date text
    html = html.replace(
        /October 26 &bull; The Day An Angel Was Born &bull; .*?</,
        'October 26 &bull; The Day An Angel Was Born &bull; Kanishka<'
    );
    html = html.replace(
        /October 26 &bull; The Day An Angel Was Born &bull; .*?</,
        'October 26 &bull; The Day An Angel Was Born &bull; Kanishka<'
    );
    
    // Fix Reasons Title
    html = html.replace(
        /6 Little Things I Adore About You, .*?</g,
        '6 Little Things I Adore About You, Sudu manika <'
    );

    // Fix the broken emoji boxes
    html = html.replace(/with you\.[^<]*/g, 'with you. 🤍');

    // Make the theme button cycle themes instead of opening modal/scrolling
    // Replace script.js theme handling logic
    js = js.replace(/const themeCards = document\.querySelectorAll\("\.theme-option-card"\);/, '');
    
    const themeBtnClickMatch = js.indexOf('themeToggleBtn.addEventListener("click"');
    if (themeBtnClickMatch !== -1) {
        // Find the end of the event listener
        // Let's just override it by appending a script to the end of js, or regex replace it.
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    fs.writeFileSync(jsPath, js, 'utf8');
}
fixAll();
