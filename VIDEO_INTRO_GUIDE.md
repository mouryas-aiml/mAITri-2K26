# Video Intro Splash Screen - Implementation Guide

## 🎬 Overview

Your website now features a fullscreen video intro that plays automatically when users first visit. After the video completes (or is skipped), the main website content appears.

---

## 📁 Files Created

1. **`src/components/VideoIntro.js`** - React component for video playback
2. **`src/components/VideoIntro.css`** - Fullscreen styling and animations
3. **Updated `src/App.js`** - Integration with main app

---

## 🎯 How It Works

### **First Visit**
1. User opens website
2. Video plays in fullscreen (muted autoplay)
3. "Skip Intro →" button appears in bottom-right
4. After video ends OR user clicks skip → Main website appears
5. Session is marked as "intro seen"

### **Subsequent Navigation**
- Video **ONLY plays once per browser session**
- If user refreshes or navigates between pages → No video
- If user closes and reopens browser → Video plays again

---

## ⚙️ Features

### **Video Playback**
- ✅ Fullscreen display
- ✅ Muted autoplay (browser-friendly)
- ✅ Black background
- ✅ Smooth fade-in animation

### **Skip Button**
- ✅ Gold themed button matching website design
- ✅ Positioned bottom-right
- ✅ Hover effects (glow + lift)
- ✅ "Skip Intro →" text

### **Session Management**
- ✅ Uses `sessionStorage` to track if intro was seen
- ✅ Video shows only once per session
- ✅ Resets when browser is closed

### **Responsive Design**
- ✅ Desktop: Video contained (letterbox if needed)
- ✅ Mobile: Video covers screen
- ✅ Skip button adapts to screen size

---

## 🎨 Customization

### **Change Video File**
Edit `VideoIntro.js` line 45:
```javascript
<source src="/maitri.mp4" type="video/mp4" />
```

Replace `/maitri.mp4` with your video path.

### **Change Video Behavior**

#### Make Video Play Every Time (No Session Storage)
Edit `App.js`:
```javascript
// Remove this block:
useEffect(() => {
  const introSeen = sessionStorage.getItem('introSeen');
  if (introSeen === 'true') {
    setShowIntro(false);
    setHasSeenIntro(true);
  }
}, []);

// And remove this line from handleVideoEnd:
sessionStorage.setItem('introSeen', 'true');
```

#### Enable Sound (Unmute Video)
Edit `VideoIntro.js` line 41:
```javascript
<video
  ref={videoRef}
  className="intro-video"
  autoPlay
  muted={false}  // Change to false or remove this line
  playsInline
  onEnded={handleVideoEnd}
>
```

⚠️ **Note**: Browsers often block autoplay with sound. Users may need to interact first.

### **Skip Button Styling**

Edit `VideoIntro.css` line 33-54 to customize:
- Position: `bottom`, `right` values
- Colors: `background`, `border`, `color`
- Size: `padding`, `font-size`
- Text: Change in `VideoIntro.js` line 50

### **Video Display Mode**

Edit `VideoIntro.css` line 27:
```css
.intro-video {
  object-fit: contain;  /* Options: contain, cover, fill */
}
```

- `contain` - Shows full video with black bars (default)
- `cover` - Fills screen, may crop video
- `fill` - Stretches video to fit

---

## 🔧 Technical Details

### **Video Requirements**
- **Format**: MP4 (H.264 codec recommended)
- **Location**: `/public/maitri.mp4`
- **Autoplay**: Must be muted for browsers to allow autoplay
- **Size**: Optimize for web (recommended < 10MB)

### **Browser Compatibility**
- ✅ Chrome/Edge - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ✅ Mobile browsers - Full support (with muted autoplay)

### **Session Storage**
- **Key**: `introSeen`
- **Value**: `'true'` after video shown
- **Lifetime**: Until browser/tab is closed
- **Alternative**: Use `localStorage` for persistent storage across sessions

---

## 🐛 Troubleshooting

### Video Doesn't Play
1. Check video file is at `/public/maitri.mp4`
2. Ensure video format is MP4
3. Check browser console for errors
4. Try with `muted` enabled (required for autoplay)

### Video Shows Every Time
- Session storage is working correctly
- To change behavior, see "Customization" section above

### Skip Button Not Visible
- Check `z-index` in CSS (should be 10000)
- Ensure video container has `position: fixed`

### Video Too Large/Small
- Adjust `object-fit` property in CSS
- Optimize video file size for web

---

## 📱 Mobile Considerations

### Performance
- Large video files may take time to load on mobile
- Consider creating a smaller mobile-optimized version
- Add loading indicator if needed

### Touch Interactions
- Skip button is touch-friendly (larger on mobile)
- No hover effects on touch devices

---

## 🚀 Advanced Features (Optional)

### Add Loading Spinner
While video loads, show a loading indicator:
```javascript
const [isLoading, setIsLoading] = useState(true);

<video onLoadedData={() => setIsLoading(false)}>
  ...
</video>

{isLoading && <div className="loading-spinner">Loading...</div>}
```

### Add Progress Bar
Show video progress:
```javascript
const [progress, setProgress] = useState(0);

<video onTimeUpdate={(e) => {
  const percent = (e.target.currentTime / e.target.duration) * 100;
  setProgress(percent);
}}>
  ...
</video>

<div className="progress-bar" style={{ width: `${progress}%` }}></div>
```

### Prevent Skip for X Seconds
```javascript
const [canSkip, setCanSkip] = useState(false);

useEffect(() => {
  setTimeout(() => setCanSkip(true), 3000); // 3 seconds
}, []);

<button 
  className="skip-button" 
  onClick={handleSkip}
  disabled={!canSkip}
>
  {canSkip ? 'Skip Intro →' : 'Please wait...'}
</button>
```

---

## 📝 Notes

- Video plays automatically on first visit only
- Uses browser's native video player
- Muted autoplay is required by modern browsers
- Session storage ensures smooth user experience
- Fully responsive and mobile-friendly

---

**Need Help?**
- Video location: `public/maitri.mp4`
- Component: `src/components/VideoIntro.js`
- Styling: `src/components/VideoIntro.css`
- Integration: `src/App.js`
