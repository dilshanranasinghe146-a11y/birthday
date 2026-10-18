const fs = require('fs');

function updateFooter() {
    const htmlPath = 'c:/Users/User/Desktop/My web/index.html';
    let html = fs.readFileSync(htmlPath, 'utf8');

    // Regex to match the footer paragraph exactly, no matter the current text content
    const footerRegex = /<footer class="romantic-footer">\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/footer>/;
    
    const newFooter = `<footer class="romantic-footer">
          <p style="font-family: var(--font-serif); font-size: 0.9rem; color: var(--text-color); line-height: 1.8; text-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 0 10px;">
            .Forever & Always &bull; 2026.10.26 &bull; The Most Beautiful Chapter Of My Life<br>
            <span style="font-family: var(--font-mono); font-size: 1.05rem; margin-top: 10px; margin-bottom: 10px; display: block; color: var(--text-color); font-weight: bold;">SKY -💌-&gt; MOON</span>
            <span style="font-family: var(--font-sans); font-size: 0.85rem; color: var(--text-color); opacity: 0.9;">Designed with my all harts by Sky for his lovely moon. This is our digital sky, hew☁️🌙 ✨</span>
          </p>
        </footer>`;

    if (footerRegex.test(html)) {
        html = html.replace(footerRegex, newFooter);
        fs.writeFileSync(htmlPath, html, 'utf8');
        console.log("Footer updated successfully.");
    } else {
        console.log("Could not find footer to replace.");
    }
}

updateFooter();
