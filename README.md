SH3 Ship Recognition - Web App (PWA)
LICENSE


Progressive Web App for quick identification of 224 merchant ships from Silent Hunter 3 + Onealex Mod 3.2.
Purpose: Help U-boat commanders quickly identify targets using the M/F/K recognition system
Features
Advanced Filtering System
M/F/K Code recognition pattern matching
Funnel position: Amidship / Aft / Unspecified
Superstructure type: Composite / Split / Passenger
Ship type: Merchants / Tankers / Passengers
Islands filter: Front / Middle / Aft (with AND logic)
Multilingual Support
Table
Language	Code	Status
French	fr	Complete
English	en	Complete
German	de	Complete
User Interface
Dark/Light theme toggle with persistent preference
Responsive design: Mobile, tablet, desktop optimized
Keyboard navigation: Arrow keys, Escape, Enter support
Touch gestures for mobile devices
Convoy Management
Build custom convoy lists
Add/remove ships from convoy
Filter view to show only convoy ships
Persistent storage via LocalStorage
Technical Features
Offline capable: Works without internet after first load
PWA installable: Add to home screen
Service Worker: Automatic caching and updates
Lazy loading: Images load on scroll for performance
Accessibility: ARIA labels, keyboard navigation, screen reader support
Quick Start
Option 1: Using the Batch File (Recommended for Windows)
Clone or download the repository:
bash
Copy
git clone https://github.com/Nazaka-Syndrome/SH3-AIO-3.2-Ship-Identification.git
cd SH3-AIO-3.2-Ship-Identification
Double-click start_server.bat
Opera browser opens automatically at http://localhost:8080
The batch file automatically detects Python or Node.js and starts a local server
Option 2: Manual Server Start
With Python (3.x recommended):
bash
Copy
python -m http.server 8080
# Open http://localhost:8080 in your browser
With Node.js:
bash
Copy
npx http-server -p 8080
# Or: npm install -g http-server && http-server -p 8080
With PHP:
bash
Copy
php -S localhost:8080
Option 3: Direct File Open (Limited)
Simply open index.html in a modern browser.
Note: Some features (like JSON loading) may require a local server due to browser CORS policies.
Project Structure
plain
Copy
SH3-AIO-3.2-Ship-Identification/
├── index.html              # Main application entry point
├── app.js                  # Core JavaScript logic
├── app.css                 # Styling (dark/light themes)
├── translations.js         # i18n: FR/EN/DE translations
├── ships_data.json         # 224 ships database
├── sw.js                   # Service Worker for offline support
├── manifest.json           # PWA manifest
├── start_server.bat        # Windows launcher script
├── ships/                  # Ship silhouette images (*.png)
│   ├── AC4_sil.png
│   ├── AE_sil.png
│   └── ... (224 files)
└── icons/                  # PWA icons
    ├── icon-192.png
    └── icon-512.png
How to Use
Basic Identification
Observe the ship in your periscope
Filter using visible characteristics:
Count funnels then select funnel position
Check superstructure layout
Note ship type (merchant/tanker/passenger)
Match the M/F/K code pattern if known
Click any ship card for detailed specs
Using the Convoy Feature
Click a ship to open details modal
Click "Add to convoy" button
Repeat for all ships in the convoy
Click "Convoy" button in header to view only convoy ships
Keyboard Shortcuts
Table
Key	Action
Left Arrow / Right Arrow	Navigate between ships in modal
Escape	Close modal / exit fullscreen
Enter	Open selected ship card
Development
Prerequisites
Modern web browser (Chrome, Firefox, Edge, Opera, Safari)
Python 3.x or Node.js 14+ (for local server)
Git (for cloning/updating)
Data Format
Ships are stored in ships_data.json:
JSON
Copy
{
  "id": "AC4",
  "className": "AC4",
  "code": "KKKKKKKF",
  "maxSpeed": 15,
  "length": 167,
  "width": 19,
  "mast": 37,
  "draft": 9,
  "displacement": 14500,
  "renownAwarded": 0,
  "silhouette": "ships/AC4_sil.png",
  "funnelPosition": "aft",
  "superstructure": "split",
  "shipType": "merchants",
  "islands": ["front"]
}
Updating the Repository
For Users (Getting Updates)
bash
Copy
# Navigate to your local folder
cd SH3-AIO-3.2-Ship-Identification

# Pull latest changes from GitHub
git pull origin main

# If you have local changes, stash them first:
git stash
git pull origin main
git stash pop
For Contributors (Pushing Changes)
bash
Copy
# Check what files changed
git status

# Add modified files
git add index.html app.js README.md

# Commit with descriptive message
git commit -m "feat: add batch file launcher and update README"

# Push to GitHub
git push origin main
First-Time Setup (if you haven't used Git)
bash
Copy
# Configure your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Clone the repository
git clone https://github.com/Nazaka-Syndrome/SH3-AIO-3.2-Ship-Identification.git
Troubleshooting
Table
Issue	Solution
"Python not found"	Install Python from python.org or use Node.js
Images not loading	Ensure ships/ folder exists with PNG files
"Cannot fetch ships_data.json"	You must use a local server, not file:// protocol
Opera doesn't open	Edit start_server.bat and replace opera with chrome or firefox
PWA install prompt not showing	Use HTTPS or localhost (required by browsers)
License
This project is licensed under the MIT License - see LICENSE file for details.
Disclaimer: Silent Hunter 3 is a trademark of Ubisoft. This is a fan-made tool for the Onealex Mod community.
Credits
Ship data: Onealex Mod 3.2 team
Recognition system: M/F/K method from historical U-boat documentation
Icons and silhouettes: SH3 community assets
Support
For issues, suggestions, or contributions:
Open an Issue
Fork and Pull Request
Happy hunting, Kapitän!
