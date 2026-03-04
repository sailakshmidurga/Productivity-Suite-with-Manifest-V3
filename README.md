# Productivity Suite Chrome Extension (Manifest V3)

## Overview

Productivity Suite is a production-ready Chrome Extension developed using **Manifest Version 3**.
The extension provides multiple productivity tools including tab session management, persistent notes, website blocking, custom new tab dashboard, data export, keyboard shortcuts, and context menu integration.

The project follows a structured development workflow using **Webpack**, where source files are maintained inside the `src` directory and production-ready files are automatically generated inside the `dist` directory.

---

## Features

### Tab Session Management

* Save all currently opened tabs as a named session.
* Restore saved sessions in a new browser window.

### Persistent Notes

* Write notes directly from the popup interface.
* Notes remain saved even after reopening the browser.

### Website Blocker

* Add websites to a blocklist from the options page.
* Blocked websites automatically redirect to a local blocked page.
* Blocked websites are synchronized using Chrome Sync Storage.

### Custom New Tab Dashboard

Overrides Chrome's default new tab page and displays:

* Saved Notes
* Saved Sessions

### Data Export

Export all stored user data including:

* Notes
* Saved Sessions
* Blocked Websites

as a downloadable JSON file.

### Keyboard Shortcuts

| Shortcut         | Action                   |
| ---------------- | ------------------------ |
| Ctrl + Shift + P | Open Extension Popup     |
| Ctrl + Shift + S | Save Current Tab Session |

### Context Menu Integration

Users can right-click selected text on any webpage and save it directly as notes.

---

## Project Structure

```
Productivity-Suite/
│
├── manifest.json
├── package.json
├── webpack.config.js
├── README.md
├── .env.example
│
├── src/
│   ├── popup.html
│   ├── popup.js
│   ├── options.html
│   ├── options.js
│   ├── newtab.html
│   ├── newtab.js
│   ├── background.js
│   └── blocked.html
│
└── dist/
    ├── manifest.json
    ├── popup.html
    ├── popup.js
    ├── options.html
    ├── options.js
    ├── newtab.html
    ├── newtab.js
    ├── background.js
    └── blocked.html
```

---

## Installation Steps

### Step 1: Install Dependencies

Open terminal inside the project folder and run:

```
npm install
```

---

### Step 2: Build the Extension

Generate the production-ready extension files:

```
npm run build
```

This command automatically creates the **dist** folder containing compiled files ready to be loaded into Chrome.

---

### Step 3: Load Extension in Chrome

1. Open Google Chrome.
2. Navigate to:

```
chrome://extensions
```

3. Enable **Developer Mode** (top-right corner).
4. Click **Load unpacked**.
5. Select the **dist** folder.

The Productivity Suite extension will now be installed.

---

## Usage Guide

### Open Extension Popup

Click the extension icon from the Chrome toolbar
OR press:

```
Ctrl + Shift + P
```

---

### Save Current Tab Session

1. Open multiple browser tabs.
2. Open extension popup.
3. Click **Save Current Session**.
4. Provide a session name.

---

### Restore Saved Session

1. Open extension popup.
2. Click **Restore** beside a saved session.
3. All tabs reopen in a new browser window.

---

### Add Website to Blocklist

1. Open Extension Options page.
2. Enter hostname (example.com).
3. Click **Add Website**.
4. Navigation to that website will be blocked automatically.

---

### Export User Data

1. Open Options Page.
2. Click **Export Data**.
3. File `productivity_suite_export.json` downloads automatically.

---

### Context Menu Notes

1. Select any text on a webpage.
2. Right-click mouse.
3. Click **Save text as Note**.
4. Open popup to view saved text.

---

## Storage Usage

| Chrome Storage API   | Usage                  |
| -------------------- | ---------------------- |
| chrome.storage.local | Notes and Tab Sessions |
| chrome.storage.sync  | Website Blocklist      |

---

## Build Workflow

All development files are stored inside the `src` directory.

Whenever code changes are made:

```
npm run build
```

Webpack compiles and copies files automatically into the `dist` directory.

Chrome Extension should always be loaded from the **dist** folder.

---

## Permissions Used

The extension uses the following Chrome permissions:

* storage
* tabs
* scripting
* contextMenus
* downloads
* host_permissions (<all_urls>)

---

## Debugging

### Debug Popup

Right-click extension popup → Inspect

### Debug Service Worker

Go to:

```
chrome://extensions
```

Click **Service Worker → Inspect**

---

## Environment Variables

This project does not require environment variables.

`.env.example` is included for submission completeness.

---

## Manifest Version

This extension is built using:

```
Manifest Version 3
```

---

## Author

Productivity Suite Chrome Extension
Koneti Sai Lakshmi Durga

---
