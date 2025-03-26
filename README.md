# Font Identifier Chrome Extension

A simple Chrome extension that allows users to identify the font family and size used on any webpage by hovering over text elements.

## 🚀 Features
- Displays the font family and size of any text      element when hovered.
- Can be enabled or disabled per tab.
- Remembers active tabs where the extension is enabled.
- Simple and responsive UI


## 📦 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/manikandan-1704/chrome-extension-font-identifier.git
    ```
2. Open Google Chrome and go to chrome://extensions/.

3. Enable Developer Mode (toggle in the top right corner).

4. Click "Load unpacked" and select the folder containing this extension.

5. The extension will now be added to Chrome.

##  Usage

1. Click on the extension icon to open the popup.

2. Click "Enable Extension" to activate font detection for the current tab.

3. Hover over any text on the webpage to see its font details in a tooltip.

4. Click "Disable Extension" to stop font detection in the current tab.

##  How It Works

1. Popup (popup.js)

- Enables/disables the extension for the current tab.
- Sends a message to the content script to start or stop font detection.
- Stores enabled tabs in chrome.storage.local to track per-tab activation.

2. Content Script (content.js)

- Listens for mouse movements and displays the font details.
- Listens for messages from the popup to enable or disable itself.
- Cleans up when the extension is disabled for a tab.

3. Background Script (background.js)
- Provides the tab ID when requested by content scripts.

## Contributing

Feel free to fork this repository and submit pull requests to improve the extension! 🚀


## ✨ Happy Coding! 🚀
