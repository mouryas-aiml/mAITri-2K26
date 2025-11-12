# mAITri 2K26 - Pages Documentation

## 🎉 All Pages Created Successfully!

Your website now has a complete navigation system with 7 fully functional pages, all connected through React Router.

---

## 📄 Pages Overview

### 1. **Home Page** (`/`)
- **Location**: `src/pages/Home.js`
- **Features**:
  - Welcome message and tagline
  - Highlight cards showcasing key features (Innovative Sessions, Networking, Competitions, Workshops)
  - Call-to-action buttons (Register Now, View Events)
  - Responsive grid layout

### 2. **Events Page** (`/events`)
- **Location**: `src/pages/Events.js`
- **Features**:
  - Complete event schedule with 6 sample events
  - Event cards showing:
    - Category badge
    - Event title
    - Date and time
    - Description
  - Fully customizable event data

### 3. **Guest Speakers Page** (`/guest`)
- **Location**: `src/pages/Guest.js`
- **Features**:
  - Guest speaker profiles with avatars
  - Speaker details (name, title, company)
  - Topics they'll be discussing
  - "More speakers coming soon" notification
  - Responsive card layout

### 4. **Sponsors Page** (`/sponsors`)
- **Location**: `src/pages/Sponsors.js`
- **Features**:
  - Multi-tier sponsor display (Platinum, Gold, Silver, Community Partners)
  - Color-coded tier headings
  - Sponsor logo placeholders
  - "Become a Sponsor" call-to-action with link to Contact page
  - Grid layout for each sponsor tier

### 5. **Contact Page** (`/contact`)
- **Location**: `src/pages/Contact.js`
- **Features**:
  - Two-column layout (contact info + form)
  - Contact information section with:
    - Email address
    - Phone number
    - Location
    - Event date
  - Working contact form with:
    - Name, Email, Subject, Message fields
    - Form validation
    - Submit functionality

### 6. **Register Page** (`/register`)
- **Location**: `src/pages/Register.js`
- **Features**:
  - Two-column layout (benefits + form)
  - Registration benefits list
  - Pricing information
  - Comprehensive registration form with:
    - Full name, email, phone
    - College/Organization
    - Year of study dropdown
    - Multiple event selection (checkboxes)
  - Form validation and submit handler

### 7. **Login Page** (`/login`)
- **Location**: `src/pages/Login.js`
- **Features**:
  - Two-column layout (login form + benefits)
  - Email and password fields
  - "Remember me" checkbox
  - "Forgot Password?" link
  - Link to Register page
  - Login benefits sidebar

---

## 🎨 Styling

All pages share a common stylesheet:
- **File**: `src/pages/Pages.css`
- **Features**:
  - Cosmic theme matching your background
  - Gold (#ffd700) accent colors
  - Responsive design (mobile, tablet, desktop)
  - Hover effects and animations
  - Form styling
  - Card layouts

---

## 🔗 Navigation

### Menu Links
The hamburger menu (top-right) includes all 7 pages:
- HOME → `/`
- EVENTS → `/events`
- GUEST → `/guest`
- SPONSORS → `/sponsors`
- CONTACT US → `/contact`
- REGISTER → `/register` (highlighted in gold)
- LOGIN → `/login`

### Internal Links
Pages also have internal navigation:
- **Home**: Links to Register and Events pages
- **Sponsors**: Links to Contact page
- **Login**: Links to Register page

---

## 🚀 Routing System

**Technology**: React Router DOM v6

**Implementation**:
- `src/App.js` - Main router configuration
- `src/components/Menu.js` - Navigation menu with React Router Links
- All pages use `<Link>` component for navigation

**Routes**:
```javascript
/ → Home
/events → Events
/guest → Guest
/sponsors → Sponsors
/contact → Contact
/register → Register
/login → Login
```

---

## ✏️ Customization Guide

### Update Event Data
Edit `src/pages/Events.js` line 6-46 to modify the events array.

### Update Guest Speakers
Edit `src/pages/Guest.js` line 6-30 to modify the speakers array.

### Update Sponsors
Edit `src/pages/Sponsors.js` line 6-25 to modify the sponsor tiers.

### Update Contact Information
Edit `src/pages/Contact.js` lines 38-62 to update contact details.

### Update Registration Fields
Edit `src/pages/Register.js` to customize form fields and event options.

---

## 📱 Responsive Design

All pages are fully responsive:
- **Desktop**: Multi-column layouts, full-size cards
- **Tablet**: Adjusted grid layouts
- **Mobile**: Single-column layouts, stacked elements

Breakpoints:
- 968px - Large tablets
- 768px - Tablets and small laptops
- 480px - Mobile phones

---

## 🎯 Next Steps

1. **Customize Content**: Update placeholder text with actual event information
2. **Add Images**: Replace emoji icons with actual logos and photos
3. **Backend Integration**: Connect forms to a backend service
4. **Add More Features**: 
   - Gallery page
   - Schedule timeline
   - Ticket purchasing
   - User dashboard

---

## 🔧 Technical Details

**Dependencies**:
- React 19.2.0
- React Router DOM (latest)
- No additional UI libraries required

**File Structure**:
```
src/
├── pages/
│   ├── Home.js
│   ├── Events.js
│   ├── Guest.js
│   ├── Sponsors.js
│   ├── Contact.js
│   ├── Register.js
│   ├── Login.js
│   └── Pages.css
├── components/
│   ├── Menu.js
│   ├── Menu.css
│   ├── Footer.js
│   └── Footer.css
└── App.js
```

---

## 🎨 Color Scheme

- **Primary**: #ffd700 (Gold)
- **Background**: #0a0a15 (Deep Space)
- **Text**: #ffffff (White) / #e0e0e0 (Light Gray)
- **Accent**: Cosmic gradient background
- **Borders**: rgba(255, 215, 0, 0.3)

---

## 📞 Support

For any questions or customization help, refer to the code comments in each file.
Each component is well-documented and easy to modify!

---

**Created for**: mAITri 2K26
**Developed by**: GeeksforGeeks Campus Body - Dr.AIT Club
**Team**: Mourya S, Bhanu Prakash BM, Mallikarjun C
