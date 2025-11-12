# Footer Configuration Instructions

## How to Update Footer Information

### 1. Update Team Members

Open `src/components/Footer.js` and locate the `teamMembers` array (around line 6-11):

```javascript
const teamMembers = [
  { name: 'Member Name 1', linkedin: 'https://www.linkedin.com/in/profile1' },
  { name: 'Member Name 2', linkedin: 'https://www.linkedin.com/in/profile2' },
  { name: 'Member Name 3', linkedin: 'https://www.linkedin.com/in/profile3' },
  { name: 'Member Name 4', linkedin: 'https://www.linkedin.com/in/profile4' },
];
```

**Replace with actual team member names and LinkedIn URLs:**

```javascript
const teamMembers = [
  { name: 'John Doe', linkedin: 'https://www.linkedin.com/in/johndoe' },
  { name: 'Jane Smith', linkedin: 'https://www.linkedin.com/in/janesmith' },
  { name: 'Alex Kumar', linkedin: 'https://www.linkedin.com/in/alexkumar' },
  // Add more members as needed
];
```

### 2. Update Social Media Links

Locate the `socialLinks` array (around line 13-19):

```javascript
const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/geeksforgeeks-draitclub', icon: '💼' },
  { name: 'Instagram', url: 'https://www.instagram.com/yourpage', icon: '📷' },
  { name: 'Twitter', url: 'https://twitter.com/yourpage', icon: '🐦' },
  { name: 'Facebook', url: 'https://www.facebook.com/yourpage', icon: '📘' },
  { name: 'YouTube', url: 'https://www.youtube.com/yourchannel', icon: '📺' },
];
```

**Replace URLs with actual social media links.**

### 3. Update Club LinkedIn Link

Find the club link section (around line 78-85) and update the URL:

```javascript
<a
  href="https://www.linkedin.com/company/YOUR-ACTUAL-CLUB-PAGE"
  target="_blank"
  rel="noopener noreferrer"
  className="club-link"
>
  GeeksforGeeks Campus Body - Dr.AIT Club
</a>
```

### 4. Optional: Change Icon Style

If you want to use proper icon libraries instead of emojis:

1. Install react-icons:
   ```bash
   npm install react-icons
   ```

2. Import icons in Footer.js:
   ```javascript
   import { FaLinkedin, FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
   ```

3. Replace the emoji icons with React icons.

---

## Example with Real Data

```javascript
const teamMembers = [
  { name: 'Mourya S', linkedin: 'https://www.linkedin.com/in/mouryas' },
  { name: 'Rahul Sharma', linkedin: 'https://www.linkedin.com/in/rahulsharma' },
  { name: 'Priya Patel', linkedin: 'https://www.linkedin.com/in/priyapatel' },
  { name: 'Amit Verma', linkedin: 'https://www.linkedin.com/in/amitverma' },
];

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/gfg-draitclub', icon: '💼' },
  { name: 'Instagram', url: 'https://www.instagram.com/gfg_draitclub', icon: '📷' },
  { name: 'Twitter', url: 'https://twitter.com/gfg_draitclub', icon: '🐦' },
  { name: 'Facebook', url: 'https://www.facebook.com/gfgdraitclub', icon: '📘' },
  { name: 'YouTube', url: 'https://www.youtube.com/@gfgdraitclub', icon: '📺' },
];
```

---

## Need Help?

- All changes are in: `src/components/Footer.js`
- Styling is in: `src/components/Footer.css`
- The footer automatically appears on all pages
