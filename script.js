/* ==========================================================================
   ROMANTIC BIRTHDAY SURPRISE WEBSITE - JAVASCRIPT
   Easy to edit, completely self-contained, and interactive.
   ========================================================================== */

/* ==========================================================================
   ðŸ’– 1. CUSTOMIZATION CONFIGURATION (EDIT YOUR DETAILS HERE!)
   ========================================================================== */
const BIRTHDAY_CONFIG = {
  // âœï¸ Girlfriend's name & nicknames:
  girlfriendName: "Kanii (Sudu Bolee)",
  nickname: "Sudu Bolee",
  specialPetName: "Pancho",

  // âœï¸ Boyfriend's name:
  yourSignature: "SKY 🌙❤️",

  // âœï¸ Her Birthday date:
  birthdayDate: "2002-10-26",

  // âœï¸ Romantic message shown after she blows the candles:
  celebrationWish: "ðŸŽ‰ HAPPY BIRTHDAY, SUDU BOLEE! ðŸŽ‚ May all your sweetest dreams come true, my dearest Pancho! You deserve all the happiness in the universe! ðŸ’–",

  // âœï¸ Music settings:
  enableMusicBox: true, // Plays our gentle built-in romantic chime melody
  customAudioFile: ""   // If you have an MP3 file (e.g., "my-song.mp3"), put the filename here!
};


/* ==========================================================================
   ðŸ’– 2. INITIALIZATION ON PAGE LOAD
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Update names from config if customized
  if (BIRTHDAY_CONFIG.girlfriendName && BIRTHDAY_CONFIG.girlfriendName !== "My Beautiful Love") {
    const nameEl = document.getElementById("display-name");
    if (nameEl) nameEl.textContent = BIRTHDAY_CONFIG.girlfriendName;
  }
  if (BIRTHDAY_CONFIG.yourSignature && BIRTHDAY_CONFIG.yourSignature !== "With all my love forever, [Your Name] â¤ï¸") {
    const sigEl = document.getElementById("display-signature");
    if (sigEl) sigEl.textContent = BIRTHDAY_CONFIG.yourSignature;
  }

  // Initialize all interactive and mobile components
  initThemeManager();
  initAmbientCanvas();
  initHeroSurprise();
  initCakeAndCandles();
  initMobilePhotoCarousel();
  initGalleryLightbox();
  initLoveMeter();
  initInteractiveTouchHearts();
  initMusicBox();
  initFinaleButtons();
  initMobileBottomNav();
});


/* ==========================================================================
   ðŸ’– 3. AMBIENT BACKGROUND CANVAS (Floating Hearts, Balloons & Stars)
   ========================================================================== */
const THEME_PALETTES = {
  rose: [
    "rgba(255, 92, 138, ",
    "rgba(255, 133, 162, ",
    "rgba(255, 182, 193, ",
    "rgba(247, 178, 103, ",
    "rgba(216, 187, 255, "
  ],
  lavender: [
    "rgba(155, 107, 204, ",
    "rgba(183, 143, 230, ",
    "rgba(216, 187, 255, ",
    "rgba(255, 209, 102, ",
    "rgba(230, 215, 255, "
  ],
  sunset: [
    "rgba(249, 115, 22, ",
    "rgba(251, 146, 60, ",
    "rgba(245, 158, 11, ",
    "rgba(253, 186, 116, ",
    "rgba(255, 120, 100, "
  ],
  midnight: [
    "rgba(255, 101, 163, ",
    "rgba(255, 64, 129, ",
    "rgba(192, 132, 252, ",
    "rgba(255, 209, 102, ",
    "rgba(255, 255, 255, "
  ],
  ruby: [
    "rgba(225, 29, 72, ",
    "rgba(244, 63, 94, ",
    "rgba(159, 18, 57, ",
    "rgba(234, 179, 8, ",
    "rgba(253, 164, 175, "
  ],
  ocean: [
    "rgba(13, 148, 136, ",
    "rgba(20, 184, 166, ",
    "rgba(56, 189, 248, ",
    "rgba(153, 246, 228, ",
    "rgba(245, 158, 11, "
  ],
  skymoon: [
    "rgba(124, 152, 212, ",
    "rgba(165, 192, 240, ",
    "rgba(255, 209, 102, ",
    "rgba(198, 217, 255, ",
    "rgba(255, 255, 255, "
  ]
};

let activeThemeKey = "rose";
let activeHeartColors = THEME_PALETTES.rose;
let ambientParticlesList = [];

function updateAmbientCanvasColors(themeKey) {
  activeThemeKey = themeKey;
  activeHeartColors = THEME_PALETTES[themeKey] || THEME_PALETTES.rose;
  if (ambientParticlesList && ambientParticlesList.length > 0) {
    ambientParticlesList.forEach(p => {
      p.colorPrefix = activeHeartColors[Math.floor(Math.random() * activeHeartColors.length)];
      // Re-roll type so skymoon particles appear on theme switch
      p.reset(true);
    });
  }
}

function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const MAX_PARTICLES = window.innerWidth < 768 ? 35 : 65;

  // Particle types: heart, balloon, star - or skymoon types
  const particleTypes = ["heart", "heart", "heart", "balloon", "star"];
  const skymoonTypes  = ["star", "star", "star", "star", "moon", "moon", "shootingstar"];

  class AmbientParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 50;
      this.size = Math.random() * 16 + 10;
      this.speedY = Math.random() * 0.9 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.wobbleSpeed = Math.random() * 0.03 + 0.01;
      this.wobbleAmp = Math.random() * 30 + 10;
      this.wobbleOffset = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.5 + 0.25;
      this.colorPrefix = activeHeartColors[Math.floor(Math.random() * activeHeartColors.length)];
      // Choose type based on active theme
      const types = activeThemeKey === "skymoon" ? skymoonTypes : particleTypes;
      this.type = types[Math.floor(Math.random() * types.length)];
      this.rotation = (Math.random() - 0.5) * 0.3;
      // For shooting stars
      this.trailLength = Math.random() * 60 + 40;
      this.shootAngle = Math.PI / 5 + (Math.random() - 0.5) * 0.3;
      // Twinkle phase
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.06 + 0.02;
    }

    update() {
      if (this.type === "shootingstar") {
        this.x += Math.cos(this.shootAngle) * 3.5;
        this.y -= Math.sin(this.shootAngle) * 3.5 + this.speedY * 0.3;
        if (this.y < -80 || this.x > width + 80) this.reset();
      } else {
        this.y -= this.speedY;
        this.wobbleOffset += this.wobbleSpeed;
        this.currentX = this.x + Math.sin(this.wobbleOffset) * this.wobbleAmp;
        if (this.y < -60) this.reset();
      }
      this.twinklePhase += this.twinkleSpeed;
    }

    draw() {
      ctx.save();
      const drawX = this.type === "shootingstar" ? this.x : (this.currentX || this.x);
      ctx.translate(drawX, this.y);
      ctx.rotate(this.rotation);

      const twinkleFactor = this.type === "star" ? 0.7 + 0.3 * Math.sin(this.twinklePhase) : 1;
      const opacity = this.opacity * twinkleFactor;

      if (this.type === "heart") {
        ctx.fillStyle = this.colorPrefix + opacity + ")";
        drawHeart(ctx, 0, 0, this.size);
      } else if (this.type === "balloon") {
        ctx.fillStyle = this.colorPrefix + (opacity * 0.85) + ")";
        drawBalloon(ctx, 0, 0, this.size * 1.2);
      } else if (this.type === "moon") {
        ctx.fillStyle = "rgba(255, 220, 110, " + opacity + ")";
        drawCrescentMoon(ctx, 0, 0, this.size * 1.1);
      } else if (this.type === "shootingstar") {
        drawShootingStar(ctx, 0, 0, this.trailLength, this.shootAngle, opacity);
      } else {
        // star - twinkles
        const starColor = activeThemeKey === "skymoon"
          ? "rgba(220, 235, 255, " + opacity + ")"
          : "rgba(255, 230, 150, " + opacity + ")";
        ctx.fillStyle = starColor;
        if (activeThemeKey === "skymoon") {
          drawGlowStar(ctx, 0, 0, this.size * 0.5, opacity);
        } else {
          drawStar(ctx, 0, 0, this.size * 0.6);
        }
      }

      ctx.restore();
    }
  }

  function drawHeart(c, x, y, size) {
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(x, y + topCurveHeight);
    // Left curve
    c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    // Left bottom curve
    c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    // Right bottom curve
    c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    // Right top curve
    c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    c.closePath();
    c.fill();
  }

  function drawBalloon(c, x, y, size) {
    c.beginPath();
    c.ellipse(x, y, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
    c.fill();
    c.beginPath();
    c.moveTo(x - 3, y + size * 0.8);
    c.lineTo(x + 3, y + size * 0.8);
    c.lineTo(x, y + size * 0.8 + 4);
    c.closePath();
    c.fill();
    c.beginPath();
    c.strokeStyle = "rgba(180, 150, 160, 0.4)";
    c.lineWidth = 1;
    c.moveTo(x, y + size * 0.8 + 4);
    c.bezierCurveTo(x - 6, y + size * 1.3, x + 6, y + size * 1.8, x - 2, y + size * 2.3);
    c.stroke();
  }

  function drawStar(c, x, y, size) {
    c.beginPath();
    for (let i = 0; i < 5; i++) {
      c.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * size + x, -Math.sin(((18 + i * 72) * Math.PI) / 180) * size + y);
      c.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (size / 2) + x, -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size / 2) + y);
    }
    c.closePath();
    c.fill();
  }

  // Glowing 4-point star for skymoon theme
  function drawGlowStar(c, x, y, size, opacity) {
    // Outer glow
    const grd = c.createRadialGradient(x, y, 0, x, y, size * 2.5);
    grd.addColorStop(0, "rgba(220, 235, 255, " + (opacity * 0.4) + ")");
    grd.addColorStop(1, "rgba(220, 235, 255, 0)");
    c.fillStyle = grd;
    c.beginPath();
    c.arc(x, y, size * 2.5, 0, Math.PI * 2);
    c.fill();
    // 4-point star
    c.fillStyle = "rgba(230, 245, 255, " + opacity + ")";
    c.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 - Math.PI / 4;
      c.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      c.lineTo(x + Math.cos(angle + Math.PI / 4) * (size * 0.35), y + Math.sin(angle + Math.PI / 4) * (size * 0.35));
    }
    c.closePath();
    c.fill();
  }

  // Crescent moon for skymoon theme
  function drawCrescentMoon(c, x, y, size) {
    c.save();
    c.beginPath();
    c.arc(x, y, size, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = "destination-out";
    c.beginPath();
    c.arc(x + size * 0.45, y - size * 0.1, size * 0.78, 0, Math.PI * 2);
    c.fillStyle = "rgba(0,0,0,1)";
    c.fill();
    c.globalCompositeOperation = "source-over";
    c.restore();
  }

  // Shooting star trail for skymoon theme
  function drawShootingStar(c, x, y, trailLength, angle, opacity) {
    const grad = c.createLinearGradient(
      x, y,
      x - Math.cos(angle) * trailLength,
      y + Math.sin(angle) * trailLength
    );
    grad.addColorStop(0, "rgba(255, 255, 255, " + opacity + ")");
    grad.addColorStop(0.3, "rgba(200, 220, 255, " + (opacity * 0.6) + ")");
    grad.addColorStop(1, "rgba(100, 150, 255, 0)");
    c.strokeStyle = grad;
    c.lineWidth = 2;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x - Math.cos(angle) * trailLength, y + Math.sin(angle) * trailLength);
    c.stroke();
    // Head dot
    c.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    c.beginPath();
    c.arc(x, y, 2, 0, Math.PI * 2);
    c.fill();
  }

  const particles = [];
  for (let i = 0; i < MAX_PARTICLES; i++) {
    particles.push(new AmbientParticle());
  }
  ambientParticlesList = particles;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}


/* ==========================================================================
   ðŸ’– 4. HERO SECTION & "OPEN YOUR SURPRISE" BUTTON
   ========================================================================== */
function initHeroSurprise() {
  const openBtn = document.getElementById("open-surprise-btn");
  const scrollIndicator = document.getElementById("scroll-indicator");
  const cakeSection = document.getElementById("cake-section");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      // Confetti burst on opening
      launchConfettiCannon({ count: 60, spread: 80, originY: 0.6 });
      
      // Play a happy opening chime
      playChimeChord([523.25, 659.25, 783.99, 1046.5]); // C5 - E5 - G5 - C6

      // Start music if enabled
      startMusicBox();

      // Smoothly scroll down to the cake
      if (cakeSection) {
        cakeSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (scrollIndicator && cakeSection) {
    scrollIndicator.addEventListener("click", () => {
      cakeSection.scrollIntoView({ behavior: "smooth" });
    });
  }
}


/* ==========================================================================
   ðŸ’– 5. ANIMATED BIRTHDAY CAKE & WISH MAKER
   ========================================================================== */
function initCakeAndCandles() {
  const blowBtn = document.getElementById("blow-candles-btn");
  const relightBtn = document.getElementById("relight-candles-btn");
  const cakeWrapper = document.getElementById("cake-wrapper");
  const wishCard = document.getElementById("wish-reveal-card");
  
  const flames = [
    document.getElementById("flame-1"),
    document.getElementById("flame-2"),
    document.getElementById("flame-3")
  ];

  const smokes = [
    document.getElementById("smoke-1"),
    document.getElementById("smoke-2"),
    document.getElementById("smoke-3")
  ];

  let candlesBlown = false;

  function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

    // Extinguish flames
    flames.forEach(flame => {
      if (flame) flame.classList.add("extinguished");
    });

    // Animate smoke
    smokes.forEach(smoke => {
      if (smoke) {
        smoke.classList.add("active");
        setTimeout(() => smoke.classList.remove("active"), 2000);
      }
    });

    // Play sweet celebratory victory tone
    playVictoryMelody();

    // Launch massive celebration confetti
    launchCelebrationConfetti();

    // Reveal wish card
    if (wishCard) {
      wishCard.classList.add("show");
    }

    // Toggle control buttons
    if (blowBtn) blowBtn.style.display = "none";
    if (relightBtn) relightBtn.style.display = "inline-flex";
  }

  // Expose for mic blow detector
  window.triggerCakeBlowOut = blowOutCandles;

  function relightCandles() {
    candlesBlown = false;

    if (navigator.vibrate) navigator.vibrate(20);

    flames.forEach(flame => {
      if (flame) flame.classList.remove("extinguished");
    });

    // Play soft relight sparkle sound
    playChimeChord([659.25, 880]);

    if (wishCard) {
      wishCard.classList.remove("show");
    }

    if (blowBtn) blowBtn.style.display = "inline-flex";
    if (relightBtn) relightBtn.style.display = "none";
  }

  if (blowBtn) blowBtn.addEventListener("click", blowOutCandles);
  if (relightBtn) relightBtn.addEventListener("click", relightCandles);
  if (cakeWrapper) cakeWrapper.addEventListener("click", () => {
    if (!candlesBlown) {
      blowOutCandles();
    }
  });

  // Direct tap on individual flames
  flames.forEach(flame => {
    if (flame) {
      flame.parentElement.style.cursor = "pointer";
      flame.parentElement.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!candlesBlown) blowOutCandles();
      });
    }
  });
}


/* ==========================================================================
   ðŸ’– 6. FULL-SCREEN PHOTO GALLERY LIGHTBOX
   ========================================================================== */
function initGalleryLightbox() {
  const cards = document.querySelectorAll(".polaroid-card");
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const modalCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const backdrop = document.getElementById("lightbox-backdrop");

  if (!modal || !modalImg) return;

  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Don't open lightbox if double tap just occurred
      if (card.dataset.justDoubleTapped === "true") return;

      const fullImgSrc = card.getAttribute("data-full-image");
      const captionText = card.getAttribute("data-caption");

      modalImg.src = fullImgSrc;
      modalCaption.textContent = captionText || "";
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden"; // Prevent background scroll
      document.body.classList.add("modal-open");
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.body.classList.remove("modal-open");
    modalImg.src = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}


/* ==========================================================================
   ðŸ’– 7. INTERACTIVE LOVE METER
   ========================================================================== */
function initLoveMeter() {
  const meterBtn = document.getElementById("love-meter-btn");
  const meterResult = document.getElementById("meter-result");
  const meterFill = document.getElementById("meter-bar-fill");
  const meterScore = document.getElementById("meter-score");

  if (!meterBtn || !meterResult || !meterFill) return;

  meterBtn.addEventListener("click", () => {
    meterResult.classList.add("show");
    meterFill.style.width = "0%";
    meterScore.textContent = "Calculating love score...";

    // Play ascending chime
    playChimeChord([392, 440, 493.88, 523.25]);

    setTimeout(() => {
      meterFill.style.width = "100%";
      launchConfettiCannon({ count: 40, spread: 70, originY: 0.7 });
      meterScore.innerHTML = "Infinity &amp; Beyond! 💖 1000000000% 🚀";
    }, 400);
  });
}


/* ==========================================================================
   ðŸ’– 8. FINALE & ROMANTIC ACTION BUTTONS
   ========================================================================== */
function initFinaleButtons() {
  const replayBtn = document.getElementById("replay-btn");
  const kissBtn = document.getElementById("send-kiss-btn");
  const grandHeart = document.getElementById("grand-heart");

  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      launchConfettiCannon({ count: 50, spread: 90, originY: 0.3 });
    });
  }

  if (kissBtn) {
    kissBtn.addEventListener("click", (e) => {
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          createFloatingPopHeart(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.7 + window.innerHeight * 0.2,
            ["❤️", "💋", "🌙", "⭐", "🤗"][Math.floor(Math.random() * 5)]
          );
        }, i * 70);
      }
      playChimeChord([783.99, 987.77, 1174.66]);
    });
  }

  if (grandHeart) {
    grandHeart.addEventListener("click", (e) => {
      createFloatingPopHeart(e.clientX, e.clientY, "💖");
      launchConfettiCannon({ count: 25, spread: 60, originY: 0.5 });
      playChimeChord([523.25, 659.25, 783.99]);
    });
  }
}


/* ==========================================================================
   ðŸ’– 9. INTERACTIVE TOUCH / CLICK HEART SPARKS
   ========================================================================== */
function initInteractiveTouchHearts() {
  const emojis = ["❤️", "💖", "⭐", "✨", "☁️", "🌙"];

  // Unlock Web Audio API on first user interaction for iOS / Android mobile browsers
  function unlockAudio() {
    getAudioContext();
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("click", unlockAudio);
  }
  window.addEventListener("touchstart", unlockAudio, { passive: true, once: true });
  window.addEventListener("click", unlockAudio, { passive: true, once: true });

  function handleInteraction(x, y) {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    createFloatingPopHeart(x, y, randomEmoji);
    if (navigator.vibrate) navigator.vibrate(10);
  }

  // Click on desktop
  window.addEventListener("click", (e) => {
    // Avoid double spawning when clicking buttons with their own sounds
    if (e.target.tagName !== "BUTTON" && !e.target.closest("button") && !e.target.closest(".polaroid-card")) {
      handleInteraction(e.clientX, e.clientY);
    }
  });

  // Tap on mobile
  window.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      const target = e.target;
      if (target.tagName !== "BUTTON" && !target.closest("button") && !target.closest(".polaroid-card")) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    }
  }, { passive: true });
}

function createFloatingPopHeart(x, y, char = "💖") {
  const heart = document.createElement("div");
  heart.className = "tap-heart";
  heart.innerHTML = char;
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    if (heart && heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, 1200);
}


/* ==========================================================================
   ðŸ’– 10. LIGHTWEIGHT ROMANTIC CONFETTI CANNON (Pure JS, Zero Dependencies)
   ========================================================================== */
function launchConfettiCannon({ count = 50, spread = 70, originY = 0.5 } = {}) {
  const colors = ["#ff4371", "#ff85a2", "#ffd166", "#06d6a0", "#118ab2", "#c77dff", "#ffffff"];
  const pieces = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI / 180) * (90 + (Math.random() - 0.5) * spread);
    const speed = Math.random() * 12 + 6;
    pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * originY,
      vx: Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      size: Math.random() * 10 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 15,
      gravity: 0.35,
      opacity: 1,
      shape: Math.random() > 0.4 ? "circle" : "rect"
    });
  }

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let animationFrame;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;

      if (p.opacity > 0 && p.y < canvas.height + 50) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    });

    if (alive) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    }
  }

  render();
}

function launchCelebrationConfetti() {
  // Triple cannon burst for maximum joy
  launchConfettiCannon({ count: 60, spread: 80, originY: 0.4 });
  setTimeout(() => launchConfettiCannon({ count: 50, spread: 100, originY: 0.5 }), 300);
  setTimeout(() => launchConfettiCannon({ count: 60, spread: 70, originY: 0.35 }), 650);
}


/* ==========================================================================
   ðŸ’– 11. BUILT-IN WEB AUDIO ROMANTIC MUSIC BOX (Zero External Dependencies)
   ========================================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;
let customAudioEl = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle music box chime chord
function playChimeChord(frequencies) {
  const ctx = getAudioContext();
  if (!ctx) return;

  frequencies.forEach((freq, index) => {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    }, index * 90);
  });
}

// Celebratory melody for cake wish
function playVictoryMelody() {
  // Happy Birthday opening notes: G4, G4, A4, G4, C5, B4
  const notes = [
    { f: 392.00, d: 250 },
    { f: 392.00, d: 250 },
    { f: 440.00, d: 450 },
    { f: 392.00, d: 450 },
    { f: 523.25, d: 450 },
    { f: 493.88, d: 800 }
  ];

  const ctx = getAudioContext();
  if (!ctx) return;

  let delay = 0;
  notes.forEach(note => {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.f, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (note.d / 1000) * 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + (note.d / 1000) * 1.6);
    }, delay);
    delay += note.d;
  });
}

// Romantic gentle music loop (Canon in D romantic progression arpeggios)
function startMusicBox() {
  if (isMusicPlaying) return;

  // If user provided a custom audio file, try playing that
  if (BIRTHDAY_CONFIG.customAudioFile) {
    if (!customAudioEl) {
      customAudioEl = new Audio(BIRTHDAY_CONFIG.customAudioFile);
      customAudioEl.loop = true;
    }
    customAudioEl.play().then(() => {
      isMusicPlaying = true;
      updateMusicButtonUI(true);
    }).catch(() => {
      // Fallback to built-in music box synthesizer if file not found
      startSynthesizedMusicBox();
    });
    return;
  }

  startSynthesizedMusicBox();
}

function startSynthesizedMusicBox() {
  const ctx = getAudioContext();
  if (!ctx) return;

  isMusicPlaying = true;
  updateMusicButtonUI(true);

  // Romantic arpeggio sequence in D major / G major
  const arpeggioNotes = [
    587.33, 739.99, 880.00, 1174.66, // D5, F#5, A5, D6
    493.88, 587.33, 739.99, 987.77,  // B4, D5, F#5, B5
    523.25, 659.25, 783.99, 1046.50, // C5, E5, G5, C6
    392.00, 587.33, 783.99, 987.77   // G4, D5, G5, B5
  ];

  let step = 0;
  playMusicNote(arpeggioNotes[step]);

  musicInterval = setInterval(() => {
    if (!isMusicPlaying) return;
    step = (step + 1) % arpeggioNotes.length;
    playMusicNote(arpeggioNotes[step]);
  }, 450);
}

function playMusicNote(freq) {
  const ctx = getAudioContext();
  if (!ctx || ctx.state !== "running") return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 1.2);
}

function stopMusicBox() {
  isMusicPlaying = false;
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
  if (customAudioEl) {
    customAudioEl.pause();
  }
  updateMusicButtonUI(false);
}

function toggleMusic() {
  if (isMusicPlaying) {
    stopMusicBox();
  } else {
    startMusicBox();
  }
}

function updateMusicButtonUI(playing) {
  const btn = document.getElementById("music-toggle-btn");
  if (!btn) return;

  if (playing) {
    btn.classList.add("playing");
    btn.setAttribute("title", "Click to pause melody");
  } else {
    btn.classList.remove("playing");
    btn.setAttribute("title", "Click to play romantic melody");
  }
}

function initMusicBox() {
  const toggleBtn = document.getElementById("music-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      getAudioContext();
      toggleMusic();
    });
  }
}


/* ==========================================================================
   ðŸ’– 12. THEME CHANGER MANAGER (Multiple Romantic Color Palettes)
   ========================================================================== */
function initThemeManager() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const themeModal = document.getElementById("theme-modal");
  const themeCloseBtn = document.getElementById("theme-close-btn");
  const themeBackdrop = document.getElementById("theme-backdrop");
  const themeCards = document.querySelectorAll(".theme-option-card");
  const metaThemeColor = document.getElementById("meta-theme-color");

  const THEME_NAMES = {
    rose: "🌹 Rose Petals (Classic)",
    lavender: "💜 Lavender Moonlight",
    sunset: "🌅 Sunset Romance",
    midnight: "🌌 Midnight Starlight (Dark Mode)",
    ruby: "🍷 Ruby Passion",
    ocean: "🌊 Ocean Serenade",
    skymoon: "🌌 Moonlit Sky & Stars"
  };

  const THEME_META_COLORS = {
    rose: "🌹 Rose Petals (Classic)",
    lavender: "💜 Lavender Moonlight",
    sunset: "🌅 Sunset Romance",
    midnight: "🌌 Midnight Starlight (Dark Mode)",
    ruby: "🍷 Ruby Passion",
    ocean: "🌊 Ocean Serenade",
    skymoon: "🌌 Moonlit Sky & Stars"
  };

  function applyTheme(themeKey, notify = false) {
    if (!THEME_PALETTES[themeKey]) themeKey = "rose";
    
    document.documentElement.setAttribute("data-theme", themeKey);
    localStorage.setItem("birthday_romantic_theme", themeKey);

    // Update active class on theme cards
    themeCards.forEach(card => {
      if (card.getAttribute("data-theme") === themeKey) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    // Update meta theme color for mobile browser status bar
    if (metaThemeColor && THEME_META_COLORS[themeKey]) {
      metaThemeColor.setAttribute("content", THEME_META_COLORS[themeKey]);
    }

    // Update ambient canvas particles
    updateAmbientCanvasColors(themeKey);

    // Haptic vibration
    if (navigator.vibrate) navigator.vibrate(20);

    if (notify) {
      showToast(`Switched to ${THEME_NAMES[themeKey]} ✨`);
      playChimeChord([523.25, 659.25, 783.99]);
    }
  }

  // Load saved theme or default to rose
  const savedTheme = localStorage.getItem("birthday_romantic_theme") || "rose";
  applyTheme(savedTheme, false);

  function openThemeModal() {
    if (!themeModal) return;
    themeModal.classList.add("active");
    themeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (navigator.vibrate) navigator.vibrate(15);
  }

  function closeThemeModal() {
    if (!themeModal) return;
    themeModal.classList.remove("active");
    themeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  
    if (themeToggleBtn) themeToggleBtn.addEventListener("click", openThemeModal);
        
  if (themeCloseBtn) themeCloseBtn.addEventListener("click", closeThemeModal);
  if (themeBackdrop) themeBackdrop.addEventListener("click", closeThemeModal);

  themeCards.forEach(card => {
    card.addEventListener("click", () => {
      const themeKey = card.getAttribute("data-theme");
      applyTheme(themeKey, true);
      setTimeout(closeThemeModal, 350);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && themeModal && themeModal.classList.contains("active")) {
      closeThemeModal();
    }
  });
}


/* ==========================================================================
   ðŸ’– 13. MOBILE TOAST NOTIFICATION HELPER
   ========================================================================== */
let toastTimeout = null;
function showToast(msg, duration = 2500) {
  const toast = document.getElementById("mobile-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}


/* ==========================================================================
   ðŸ’– 14. MOBILE PHOTO CAROUSEL & TOUCH SWIPE GESTURES
   ========================================================================== */
function initMobilePhotoCarousel() {
  const grid = document.getElementById("photo-gallery-grid");
  const viewSwipeBtn = document.getElementById("view-swipe-btn");
  const viewGridBtn = document.getElementById("view-grid-btn");
  const prevBtn = document.getElementById("carousel-prev-btn");
  const nextBtn = document.getElementById("carousel-next-btn");
  const counterEl = document.getElementById("carousel-counter");
  const dotsContainer = document.getElementById("carousel-dots");
  const dots = dotsContainer ? dotsContainer.querySelectorAll(".dot-btn") : [];
  const cards = grid ? Array.from(grid.querySelectorAll(".polaroid-card")) : [];
  const swipeHint = document.getElementById("swipe-hint");

  if (!grid || cards.length === 0) return;

  let currentIndex = 0;
  let isSwipeMode = true;

  function updateCarouselUI(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${cards.length}`;

    // Update dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });

    // Update arrow states
    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    if (nextBtn) nextBtn.style.opacity = currentIndex === cards.length - 1 ? "0.5" : "1";
  }

  function scrollToCard(index, smooth = true) {
    if (!cards[index]) return;
    updateCarouselUI(index);
    cards[index].scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
      inline: "center",
      block: "nearest"
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        scrollToCard(currentIndex - 1);
        if (navigator.vibrate) navigator.vibrate(15);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - 1) {
        scrollToCard(currentIndex + 1);
        if (navigator.vibrate) navigator.vibrate(15);
      }
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      scrollToCard(idx);
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });

  // Track scroll position in swipe mode to sync dots automatically
  let scrollDebounce;
  grid.addEventListener("scroll", () => {
    if (!isSwipeMode) return;
    clearTimeout(scrollDebounce);
    scrollDebounce = setTimeout(() => {
      const gridRect = grid.getBoundingClientRect();
      const gridCenter = gridRect.left + gridRect.width / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - gridCenter);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });

      updateCarouselUI(closestIdx);
    }, 60);
  }, { passive: true });

  // View toggle: Swipe Mode vs Grid Mode
  function setViewMode(swipe) {
    isSwipeMode = swipe;
    if (swipe) {
      grid.classList.add("swipe-mode");
      if (viewSwipeBtn) viewSwipeBtn.classList.add("active");
      if (viewGridBtn) viewGridBtn.classList.remove("active");
      if (dotsContainer) dotsContainer.style.display = "flex";
      if (swipeHint) swipeHint.style.display = "block";
      scrollToCard(currentIndex, false);
    } else {
      grid.classList.remove("swipe-mode");
      if (viewSwipeBtn) viewSwipeBtn.classList.remove("active");
      if (viewGridBtn) viewGridBtn.classList.add("active");
      if (dotsContainer) dotsContainer.style.display = "none";
      if (swipeHint) swipeHint.style.display = "none";
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  if (viewSwipeBtn) viewSwipeBtn.addEventListener("click", () => setViewMode(true));
  if (viewGridBtn) viewGridBtn.addEventListener("click", () => setViewMode(false));

  // Auto-set swipe mode on mobile/tablet screens initially
  if (window.innerWidth <= 768) {
    setViewMode(true);
  }

  // Touch Swipe Gesture Tracking on grid
  let touchStartX = 0;
  let touchStartY = 0;

  grid.addEventListener("touchstart", (e) => {
    if (!isSwipeMode) return;
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  grid.addEventListener("touchend", (e) => {
    if (!isSwipeMode) return;
    if (e.changedTouches && e.changedTouches[0]) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Only swipe if mostly horizontal motion
      if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0 && currentIndex < cards.length - 1) {
          // Swiped left -> next card
          scrollToCard(currentIndex + 1);
          if (navigator.vibrate) navigator.vibrate(15);
        } else if (diffX > 0 && currentIndex > 0) {
          // Swiped right -> prev card
          scrollToCard(currentIndex - 1);
          if (navigator.vibrate) navigator.vibrate(15);
        }
      }
    }
  }, { passive: true });

  // Double-tap on cards for romantic heart burst
  cards.forEach(card => {
    let lastTapTime = 0;
    card.addEventListener("touchend", (e) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime;
      if (tapLength < 320 && tapLength > 50) {
        // Double tap detected!
        card.dataset.justDoubleTapped = "true";
        triggerDoubleTapHeart(card, e);
        setTimeout(() => {
          card.dataset.justDoubleTapped = "false";
        }, 500);
      }
      lastTapTime = currentTime;
    });
  });

  function triggerDoubleTapHeart(card) {
    const heart = document.createElement("div");
    heart.className = "double-tap-heart";
    heart.textContent = "ðŸ’–";
    card.appendChild(heart);
    if (navigator.vibrate) navigator.vibrate([25, 35, 25]);

    setTimeout(() => {
      if (heart && heart.parentNode) heart.parentNode.removeChild(heart);
    }, 900);
  }

  updateCarouselUI(0);
}


/* ==========================================================================
   ðŸ’– 15. MOBILE MICROPHONE BLOW CANDLE DETECTOR
   ========================================================================== */
function initMicBlowDetection() {
  const micBtn = document.getElementById("mic-blow-btn");
  if (!micBtn) return;

  let micStream = null;
  let micAudioCtx = null;
  let micAnalyser = null;
  let micInterval = null;
  let isListening = false;

  function stopMicListening() {
    isListening = false;
    micBtn.classList.remove("listening");
    micBtn.innerHTML = '<span class="icon">🎤🌬️</span> Blow With Mic';

    if (micInterval) {
      clearInterval(micInterval);
      micInterval = null;
    }
    if (micStream) {
      micStream.getTracks().forEach(track => track.stop());
      micStream = null;
    }
    if (micAudioCtx && micAudioCtx.state !== "closed") {
      micAudioCtx.close();
      micAudioCtx = null;
    }
  }

  async function startMicListening() {
    try {
      micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      micAudioCtx = new AudioCtxClass();
      const source = micAudioCtx.createMediaStreamSource(micStream);
      micAnalyser = micAudioCtx.createAnalyser();
      micAnalyser.fftSize = 256;
      source.connect(micAnalyser);

      isListening = true;
      micBtn.classList.add("listening");
      micBtn.innerHTML = '<span class="icon">🎤🌬️</span> Listening... Blow now!';
      showToast("Blow gently directly into your microphone! 🌬️🎤", 3500);
      if (navigator.vibrate) navigator.vibrate([30, 40]);

      const bufferLength = micAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowCount = 0;
      micInterval = setInterval(() => {
        if (!isListening) return;
        micAnalyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        // When user blows into mic, average volume spikes (> 55-60)
        if (average > 55) {
          blowCount++;
          if (blowCount >= 2) {
            stopMicListening();
            if (window.triggerCakeBlowOut) {
              window.triggerCakeBlowOut();
            }
            showToast("ðŸŒ¬ï¸âœ¨ Sudu Bolee blew out her candles! Yay! ðŸŽ‚ðŸŽ‰", 4000);
          }
        } else {
          blowCount = Math.max(0, blowCount - 1);
        }
      }, 100);

      // Auto timeout after 20 seconds to save battery
      setTimeout(() => {
        if (isListening) {
          stopMicListening();
          showToast("Mic turned off. Tap candles to blow them out anytime! ðŸ•¯ï¸");
        }
      }, 20000);

    } catch (err) {
      stopMicListening();
      showToast("Could not access mic. You can tap the candles directly! ðŸ•¯ï¸âœ¨", 3500);
    }
  }

  micBtn.addEventListener("click", () => {
    if (isListening) {
      stopMicListening();
    } else {
      startMicListening();
    }
  });
}


/* ==========================================================================
   ðŸ’– 16. MOBILE BOTTOM APP NAVIGATION & SCROLLSPY
   ========================================================================== */
function initMobileBottomNav() {
  const nav = document.getElementById("mobile-bottom-nav");
  if (!nav) return;

  const navItems = nav.querySelectorAll(".nav-item");
  const sections = ["hero", "cake-section", "letter-section", "gallery-section", "finale-section"];

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("data-target");
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        if (navigator.vibrate) navigator.vibrate(15);
      }
    });
  });

  // Scrollspy with IntersectionObserver
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach(item => {
            if (item.getAttribute("data-target") === id) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    }, {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0.1
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
}


/* ==========================================================================


/* ==========================================================================
   ROMANTIC MEMORY GALLERY — Complete Gallery Engine
   All 59 photos defined here. Renders swipe carousel + all-photos grid.
   ========================================================================== */

(function() {
  'use strict';

  /* ---- Photo data (all 59 photos) ---- */
  var PHOTOS = [
    { src:'images/photo1.jpg',  emoji:['💖','💕','✨','🥺','❤️'], caption:'The day you became part of my story, Sudu Bolee',          title:'Where Our Story Began' },
    { src:'images/photo2.jpg',  emoji:['🧡','💖','✨','🌸','💕'], caption:'Every adventure is better with you beside me, Kanii',       title:'Adventures With You' },
    { src:'images/photo3.jpg',  emoji:['💜','😂','💖','✨','🥺'], caption:'All those cute silly habits I never want to forget',         title:'Silly Moments with Pancho' },
    { src:'images/photo4.jpg',  emoji:['💖','🥂','✨','💕','🌹'], caption:'Lost in your eyes, grateful for every moment with you',      title:'A Moment To Remember' },
    { src:'images/photo5.jpg',  emoji:['💛','🌟','💖','✨','😍'], caption:'The smile that lights up my whole entire world, always',     title:'That Gorgeous Smile' },
    { src:'images/photo6.jpg',  emoji:['❤️','🎂','💖','✨','🥳'], caption:"Here's to you Sudu Bolee, and all our beautiful tomorrows",  title:'Celebrating Us' },
    { src:'images/photo7.jpg',  emoji:['💖','🌸','✨','💕','🥺'], caption:'Your voice, your laugh - I could listen to it forever',      title:'Your Laughter' },
    { src:'images/photo9.jpg',  emoji:['🌟','💖','✨','🧡','💕'], caption:'You shine brighter than any star, my Pancho',                title:'You Shine So Bright' },
    { src:'images/photo10.jpg', emoji:['💕','🌸','💖','✨','❤️'], caption:'Every little moment with you is a treasure to me',           title:'Little Moments' },
    { src:'images/photo11.jpg', emoji:['💜','💖','✨','🌸','🥺'], caption:'Wherever you are, that is where I want to be',               title:'Wherever You Are' },
    { src:'images/photo12.jpg', emoji:['❤️','💕','✨','💖','🌟'], caption:'I love the way you look when you think no one is watching',  title:'Quietly Beautiful' },
    { src:'images/photo13.jpg', emoji:['🧡','💖','✨','💕','😍'], caption:'The little things you do make me fall for you every day',    title:'Falling Every Day' },
    { src:'images/photo14.jpg', emoji:['💖','🌸','✨','💜','🥺'], caption:'You are the kind of memory I never want to lose',            title:'A Memory I Keep' },
    { src:'images/photo15.jpg', emoji:['💕','❤️','✨','💖','🌟'], caption:'Your smile is my happy place, always and forever',           title:'My Happy Place' },
    { src:'images/photo17.jpg', emoji:['🌸','💖','✨','💕','🥺'], caption:'You make ordinary moments feel extraordinary, Kanii',        title:'Extraordinary You' },
    { src:'images/photo18.png', emoji:['💖','💕','✨','❤️','🧡'], caption:"I'd choose you again in every lifetime, Sudu Bolee",        title:'Every Lifetime' },
    { src:'images/photo19.jpg', emoji:['💜','🌟','✨','💖','💕'], caption:'Every photo of you steals my breath away, Pancho',           title:'Breathtaking' },
    { src:'images/photo20.jpg', emoji:['💛','💖','✨','🌸','😍'], caption:'You are sunshine on my cloudiest days, Kanii',               title:'My Sunshine' },
    { src:'images/photo21.jpg', emoji:['💖','🥺','✨','💕','❤️'], caption:'The way you look at the world makes me see it differently',  title:'Through Your Eyes' },
    { src:'images/photo22.jpg', emoji:['🌹','💖','✨','💜','💕'], caption:'You are worth every single moment I have ever waited for',   title:'Worth Every Moment' },
    { src:'images/photo23.jpg', emoji:['💕','🌸','✨','💖','🥺'], caption:'Time stops whenever I am with you, Kanii',                   title:'Time Stops' },
    { src:'images/photo24.jpg', emoji:['❤️','💖','✨','🌟','💕'], caption:'You are the chapter I never want to end, my love',           title:'A Chapter I Keep' },
    { src:'images/photo25.jpg', emoji:['🧡','💕','✨','💖','😍'], caption:'Your eyes tell a story I could read for a lifetime',         title:'Your Beautiful Eyes' },
    { src:'images/photo26.jpg', emoji:['💖','🌸','✨','💜','❤️'], caption:'Growing with you has been the greatest gift of my life',     title:'Growing Together' },
    { src:'images/photo27.jpg', emoji:['💕','💖','✨','🌟','🥺'], caption:'I am so grateful the universe brought you to me, Kanii',    title:'Grateful For You' },
    { src:'images/photo28.jpg', emoji:['🌸','💖','✨','💕','❤️'], caption:'You are softer than every poem ever written about love',     title:'Softer Than A Poem' },
    { src:'images/photo29.jpg', emoji:['💜','💕','✨','💖','🥺'], caption:'Knowing you has made me a better person, always',            title:'You Made Me Better' },
    { src:'images/photo30.jpg', emoji:['💛','💖','✨','🌸','💕'], caption:'You have a way of making everything feel like home',         title:'You Feel Like Home' },
    { src:'images/photo31.jpg', emoji:['❤️','💖','✨','🌟','🧡'], caption:'Every memory with you is a treasure I hold dearly',         title:'A Treasure' },
    { src:'images/photo32.jpg', emoji:['💕','🌸','✨','💜','💖'], caption:'The best feeling in the world is having you in my life',    title:'The Best Feeling' },
    { src:'images/photo33.jpg', emoji:['🌹','💖','✨','💕','❤️'], caption:'You are the kind of beautiful that stays forever',           title:'Forever Beautiful' },
    { src:'images/photo34.jpg', emoji:['💖','🥺','✨','💕','🌸'], caption:'I smile more because of you than anything else',             title:'Because Of You' },
    { src:'images/photo35.jpg', emoji:['💜','💖','✨','😍','💕'], caption:'You are my favorite person to exist on this earth',          title:'My Favorite Person' },
    { src:'images/photo36.jpg', emoji:['🌟','💕','✨','💖','❤️'], caption:'You light up every room just by walking into it',            title:'You Light Up Rooms' },
    { src:'images/photo37.jpg', emoji:['💕','🧡','✨','💖','🥺'], caption:'I love the way you say my name, Sudu Bolee',                 title:'The Way You Say It' },
    { src:'images/photo38.jpg', emoji:['💖','🌸','✨','💜','❤️'], caption:'Our story is my most favorite story in the world',          title:'Our Story' },
    { src:'images/photo39.jpg', emoji:['❤️','💕','✨','🌟','💖'], caption:'Some feelings cannot be described - you are one of them',   title:'Beyond Words' },
    { src:'images/photo40.jpg', emoji:['💛','💖','✨','💕','😍'], caption:'You make even the boring days feel worth living',            title:'Worth Living' },
    { src:'images/photo41.jpg', emoji:['🌸','💜','✨','💖','🥺'], caption:'I love every version of you, always and always',             title:'Every Version of You' },
    { src:'images/photo42.jpg', emoji:['💕','💖','✨','🧡','❤️'], caption:"The world is so much better because you're in it",          title:'A Better World' },
    { src:'images/photo43.jpg', emoji:['💖','🌟','✨','💕','🌸'], caption:'You have no idea how much you mean to me, Kanii',            title:'You Mean So Much' },
    { src:'images/photo44.jpg', emoji:['❤️','💜','✨','💖','🥺'], caption:'I hope you know how truly loved you are, Sudu Bolee',        title:'Truly Loved' },
    { src:'images/photo45.jpg', emoji:['💕','🌹','✨','💖','😍'], caption:'Your gentle heart is one of the most beautiful things I know',title:'Your Gentle Heart' },
    { src:'images/photo46.jpg', emoji:['🧡','💖','✨','💕','🌸'], caption:'I never thought someone could make me feel this way',         title:'You Changed Everything' },
    { src:'images/photo47.jpg', emoji:['💖','💕','✨','❤️','🥺'], caption:'No camera can ever capture how beautiful you truly are',     title:'Beyond A Photo' },
    { src:'images/photo49.jpg', emoji:['💜','💖','✨','🌟','💕'], caption:'Missing you is the hardest part of any day, Kanii',          title:'Missing You' },
    { src:'images/photo50.jpg', emoji:['💛','💕','✨','💖','🌸'], caption:'You are all I ever needed and so much more, always',         title:'All I Ever Needed' },
    { src:'images/photo51.jpg', emoji:['💕','❤️','✨','💖','🥺'], caption:'When I think of the best things in life, I think of you',   title:'The Best Thing' },
    { src:'images/photo55.jpg', emoji:['🌹','💖','✨','💜','❤️'], caption:'You are the most precious thing I have ever known',          title:'Most Precious' },
    { src:'images/photo57.jpg', emoji:['💖','🌸','✨','💕','😍'], caption:'Holding on to these memories like they are gold',            title:'Golden Memories' },
    { src:'images/photo58.jpg', emoji:['💕','🧡','✨','💖','🥺'], caption:'Thank you for being exactly who you are, Sudu Bolee',        title:'Thank You' },
    { src:'images/photo59.jpg', emoji:['❤️','💖','✨','💕','🌟'], caption:'You have made my life so much richer just by being in it',   title:'Richer Because of You' },
    { src:'images/photo60.jpg', emoji:['💜','🌸','✨','💖','💕'], caption:'Of all the beautiful things in the world, you are the most', title:'Most Beautiful' },
    { src:'images/photo61.jpg', emoji:['💛','💕','✨','❤️','💖'], caption:'You will always have a special place in my heart, Pancho',   title:'A Special Place' },
    { src:'images/photo62.jpg', emoji:['💖','🌹','✨','💕','😍'], caption:'Every day I spend with you is a day I want to relive',       title:'Days To Relive' },
    { src:'images/photo63.jpg', emoji:['💕','💖','✨','🌸','🥺'], caption:'If I could freeze any moment, it would be one with you',     title:'Freeze This Moment' },
    { src:'images/photo64.jpg', emoji:['❤️','💜','✨','💖','🌟'], caption:'Loving you is the easiest thing I have ever done',           title:'The Easiest Thing' },
    { src:'images/photo65.jpg', emoji:['🎂','💖','✨','💕','❤️'], caption:'Happy Birthday, my Sudu Bolee - I love you forever',         title:'Happy Birthday, Kanii 🎂' }
  ];

  var total   = PHOTOS.length;
  var current = 0;
  var lbIndex = 0;
  var autoTimer = null;
  var touchStartX = 0;

  /* ---- DOM refs (wait for DOMContentLoaded) ---- */
  document.addEventListener('DOMContentLoaded', function() {
    buildCarousel();
    buildGrid();
    bindControls();
    goTo(0);
    autoTimer = setInterval(function(){ goTo(current + 1); }, 5000);
  });

  /* ---- Build Carousel Slides ---- */
  function buildCarousel() {
    var track = document.getElementById('mem-track');
    if (!track) return;
    track.innerHTML = '';
    PHOTOS.forEach(function(p, i) {
      var slide = document.createElement('div');
      slide.className = 'mem-slide';
      slide.innerHTML =
        '<div class="mem-card" onclick="openMemoryLightbox(' + i + ')">' +
          '<div class="mem-floaters">' +
            p.emoji.map(function(e,j){ return '<span class="mf mf'+(j+1)+'">'+e+'</span>'; }).join('') +
          '</div>' +
          '<div class="mem-photo-wrap">' +
            '<img src="' + p.src + '" alt="Memory ' + (i+1) + '" loading="lazy">' +
            '<div class="mem-photo-caption"><span class="mpc-heart">'+p.emoji[0]+'</span> ' + p.caption + '</div>' +
            '<div class="mem-open-hint">Tap to open "</div>' +
          '</div>' +
          '<div class="mem-card-caption"><h4>' + p.title + '</h4><p>' + p.emoji[0] + ' ' + p.caption + '</p></div>' +
        '</div>';
      track.appendChild(slide);
    });
  }

  /* ---- Build All-Photos Grid ---- */
  function buildGrid() {
    var grid = document.getElementById('all-photos-grid');
    if (!grid) return;
    grid.innerHTML = '';
    PHOTOS.forEach(function(p, i) {
      var card = document.createElement('div');
      card.className = 'apg-card';
      card.setAttribute('onclick', 'openMemoryLightbox(' + i + ')');
      card.innerHTML =
        '<div class="apg-photo-wrap">' +
          '<img src="' + p.src + '" alt="Memory ' + (i+1) + '" loading="lazy">' +
          '<div class="apg-floaters">' +
            '<span>' + p.emoji[0] + '</span><span>' + p.emoji[1] + '</span><span>' + p.emoji[2] + '</span>' +
          '</div>' +
          '<div class="apg-overlay"><span class="apg-caption-float"><span class="mpc-heart">' + p.emoji[0] + '</span> ' + p.caption + '</span></div>' +
        '</div>' +
        '<div class="apg-caption"><h4>' + p.title + '</h4><p>' + p.emoji[0] + ' ' + p.caption + '</p></div>';
      grid.appendChild(card);
    });
  }

  /* ---- Carousel Navigation ---- */
  function goTo(idx) {
    if (idx < 0) idx = total - 1;
    if (idx >= total) idx = 0;
    current = idx;
    var track = document.getElementById('mem-track');
    if (track) track.style.transform = 'translateX(-' + (current * 100) + '%)';
    var fill = document.getElementById('mem-progress-fill');
    if (fill) fill.style.width = ((current + 1) / total * 100).toFixed(1) + '%';
    var ctr = document.getElementById('mem-counter');
    if (ctr) ctr.textContent = (current + 1) + ' / ' + total;
  }

  window.goToMemSlide = function(idx) { goTo(idx); clearInterval(autoTimer); };

  /* ---- Bind Controls ---- */
  function bindControls() {
    var prev  = document.getElementById('mem-prev');
    var next  = document.getElementById('mem-next');
    var track = document.getElementById('mem-track');
    var lb    = document.getElementById('mem-lightbox');

    if (prev) prev.addEventListener('click', function(){ goTo(current-1); clearInterval(autoTimer); });
    if (next) next.addEventListener('click', function(){ goTo(current+1); clearInterval(autoTimer); });

    /* Touch swipe on carousel */
    if (track) {
      track.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, {passive:true});
      track.addEventListener('touchend', function(e){
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { goTo(dx < 0 ? current+1 : current-1); clearInterval(autoTimer); }
      }, {passive:true});
    }

    /* Touch swipe on lightbox */
    if (lb) {
      lb.addEventListener('touchstart', function(e){ touchStartX = e.touches[0].clientX; }, {passive:true});
      lb.addEventListener('touchend', function(e){
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) window.lightboxNav(dx < 0 ? 1 : -1);
      }, {passive:true});
    }

    /* Keyboard */
    document.addEventListener('keydown', function(e) {
      var lbEl = document.getElementById('mem-lightbox');
      var lbOpen = lbEl && lbEl.classList.contains('open');
      if (lbOpen) {
        if (e.key === 'ArrowLeft')  window.lightboxNav(-1);
        if (e.key === 'ArrowRight') window.lightboxNav(1);
        if (e.key === 'Escape')     window.closeMemoryLightbox();
      } else {
        if (e.key === 'ArrowLeft')  { goTo(current-1); clearInterval(autoTimer); }
        if (e.key === 'ArrowRight') { goTo(current+1); clearInterval(autoTimer); }
      }
    });
  }

  /* ---- Lightbox ---- */
  function showLbPhoto(idx) {
    var img = document.getElementById('mem-lb-img');
    var cap = document.getElementById('mem-lb-caption');
    if (img) { img.src = PHOTOS[idx].src; img.alt = PHOTOS[idx].title; }
    if (cap) cap.textContent = PHOTOS[idx].emoji[0] + ' ' + PHOTOS[idx].caption;
  }

  window.openMemoryLightbox = function(idx) {
    lbIndex = idx;
    showLbPhoto(lbIndex);
    var lb = document.getElementById('mem-lightbox');
    if (lb) lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    clearInterval(autoTimer);
  };

  window.closeMemoryLightbox = function() {
    var lb = document.getElementById('mem-lightbox');
    if (lb) lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.lightboxNav = function(dir) {
    lbIndex = (lbIndex + dir + total) % total;
    showLbPhoto(lbIndex);
  };

  /* ---- View Switcher ---- */
  window.switchGalleryView = function(mode) {
    var carousel  = document.getElementById('mem-carousel-wrapper');
    var grid      = document.getElementById('all-photos-grid');
    var hint      = document.getElementById('swipe-hint-text');
    var counter   = document.getElementById('gallery-counter-row');
    var btnSwipe  = document.getElementById('btn-swipe');
    var btnGrid   = document.getElementById('btn-grid');
    if (!carousel || !grid) return;

    if (mode === 'swipe') {
      carousel.style.display = '';
      grid.style.display = 'none';
      if (hint)    hint.style.display = '';
      if (counter) counter.classList.remove('hidden');
      if (btnSwipe) btnSwipe.classList.add('gvt-active');
      if (btnGrid)  btnGrid.classList.remove('gvt-active');
    } else {
      carousel.style.display = 'none';
      grid.style.display = 'grid';
      if (hint)    hint.style.display = 'none';
      if (counter) counter.classList.add('hidden');
      if (btnGrid)  btnGrid.classList.add('gvt-active');
      if (btnSwipe) btnSwipe.classList.remove('gvt-active');
    }
  };

})();
