chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabId" && sender.tab) {
        sendResponse({ tabId: sender.tab.id });
    }
});
