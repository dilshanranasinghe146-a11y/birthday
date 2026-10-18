# 💖 Romantic Birthday Surprise Website for Sudu Bolee (Kanishka Maduwanthi)
### Prepared with love by Dhananjaya Dilshan &bull; Birthday: October 26, 2001

Welcome! This website has been lovingly personalized with your heartfelt letter, her special nicknames (**Sudu Bolee** & **Pancho**), and her birthday date (**2001/10/26**).

It is 100% ready to run right now with **zero setup**, **no terminal commands**, and **no extra software needed**.

---

## 🚀 How to Run the Website Right Now

1. Find the **`index.html`** file in this folder (`c:\Users\User\Desktop\My web\index.html`).
2. **Double-click** `index.html` to open it in Google Chrome, Microsoft Edge, Safari, or any browser.
3. That's it! Everything works immediately, offline or online.

---

## 🎨 How to Customize

All the code is clean, well-commented, and simple to edit with **Notepad**, **VS Code**, or any text editor.

### 1. Change Her Name & Your Name

You can change names in either **`script.js`** or directly in **`index.html`**:

#### Option A: In `script.js` (Easiest)
Open `script.js` and look at lines 9-16:
```javascript
const BIRTHDAY_CONFIG = {
  // Put your girlfriend's name or nickname here:
  girlfriendName: "Sarah", // <-- Put her name here!

  // Put your name or sign-off here:
  yourSignature: "With all my love forever, Alex ❤️", // <-- Put your name here!
  ...
};
```

#### Option B: In `index.html`
- **Her Name**: Search for `id="display-name"` in `index.html` (around line 52) and type her name.
- **Your Signature**: Search for `id="display-signature"` in `index.html` (around line 208) and write your name.

---

### 2. Add Your Own Photos (The Photo Gallery)

We created 6 artistic placeholder images with clear labels so the website looks beautiful immediately, even before you add photos.

When you're ready to put your own photos in:

1. Copy your 6 favorite photos into the **`images/`** folder.
2. Rename them to:
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - `photo4.jpg`
   - `photo5.jpg`
   - `photo6.jpg`
3. Open `index.html`, find the `<!-- PHOTO GALLERY -->` section (around lines 260-390), and change `.svg` to `.jpg` (or `.png`):
   ```html
   <!-- Change this: -->
   <img src="images/photo1.svg" alt="...">
   <!-- To this: -->
   <img src="images/photo1.jpg" alt="...">
   ```
4. You can also customize the captions and subtitles under each photo to describe your actual memories!

> 💡 **Tip:** Square or portrait phone photos look stunning in the polaroid frames.

---

### 3. Personalize The Love Letter & 6 Reasons

In `index.html`:
- **The Romantic Letter**: Lines 180-210. Feel free to edit the paragraphs, add your favorite memories, or write your own message!
- **6 Reasons Why I Love You**: Lines 215-265. Change the titles and little descriptions to match all the unique, sweet things you love about her.

---

### 4. Background Romantic Music

- **Built-in Music Box**: By default, the website has a gentle, romantic music box chime synthesized using the Web Audio API. It works completely offline with no audio files needed!
- **Use Your Own Song (Optional)**: If you and your girlfriend have a special song:
  1. Place your MP3 file into this website folder (e.g. `our-song.mp3`).
  2. Open `script.js` and set:
     ```javascript
     customAudioFile: "our-song.mp3"
     ```
  3. The website will play your song when she taps the music button or opens the surprise!

---

## 🎨 Theme Changer (6 Romantic Color Modes)

Tap the **`🎨 Theme`** button at the top right to switch between 6 moods anytime:
1. 🌸 **Rose Petals & Blush** (Classic romantic pinks & deep rose)
2. 💜 **Lavender Moonlight** (Dreamy lilac, celestial purple & soft glow)
3. 🌅 **Sunset Romance** (Warm golden peach, amber & coral)
4. 🌌 **Midnight Starlight** (Enchanted dark mode with glowing neon stars & hearts — perfect for viewing in bed at night!)
5. 🍒 **Ruby Passion** (Crimson wine, royal velvet & sparkling gold)
6. 🌊 **Ocean Serenade** (Aqua breeze, mint & pastel sky blue)

> 💡 **Tip:** Her selected theme is automatically remembered on her phone even if she closes the browser! The floating hearts and background stars also dynamically change colors to match each theme.

---

## 📱 Mobile App Version & Touch Gestures

This website has been built to feel like a high-end native iOS and Android app:
- **Floating Mobile Bottom App Bar**: Fast-jump between Intro (✨), Cake (🎂), Letter (💌), Photos (📸), and Finale (💖) with smooth scrolling and active tab indicators.
- **Touch-Swipe Photo Story**: On mobile, memories are displayed in a smooth swipeable card carousel. Swipe left or right with your finger, tap the arrow buttons, or use the pagination dots.
- **Double-Tap on Photos**: Double-tapping any memory photo spawns a glowing burst of floating hearts with haptic phone vibration.
- **Interactive Blow-Out Candles**:
  1. Tap the candle flames directly with your finger.
  2. Tap the big thumb-friendly *"Blow Out The Candles! 🕯️💨"* button.
  3. Or tap *"Blow With Mic 🎙️🌬️"* to blow directly into the phone's microphone with your breath!
- **Haptic Feedback**: Gentle vibration responses when tapping hearts, blowing candles, rating on the love meter, and changing themes on supported mobile devices.
- **Safe-Area Insets**: Full edge-to-edge support for iPhone Dynamic Island, notches, and home indicator bars.

---

## 🎁 How to Give It to Her

1. **On her phone (Recommended)**: Host it for free in 1 minute on **GitHub Pages**, **Netlify Drop** (drag-and-drop the folder), or **Vercel** to send her a secret link. When she opens it on Safari or Chrome, she can even tap *"Add to Home Screen"* to install it as an app icon with a heart!
2. **On your computer / laptop**: Set it to full screen (press F11) and ask her to sit down and press *"Open Your Surprise 💝"*.

Happy Birthday to Sudu Bolee (Kanishka)! May she cherish this surprise forever! 💖✨
