document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        const tabId = tabs[0].id;

        chrome.storage.local.get(["isEnabledTabs"], (data) => {
            let activeTabs = data.isEnabledTabs || {};
            const isEnabled = activeTabs[tabId] || false;

            if (isEnabled) {
                document.getElementById("exitButton").textContent = "Disable Extension";
            } else {
                document.getElementById("exitButton").textContent = "Enable Extension";
            }
        });

        document.getElementById("exitButton").addEventListener("click", () => {
            chrome.storage.local.get(["isEnabledTabs"], (data) => {
                let activeTabs = data.isEnabledTabs || {};

                if (activeTabs[tabId]) {
                    chrome.tabs.sendMessage(tabId, { action: "disableExtension" });
                    delete activeTabs[tabId];
                    chrome.storage.local.set({ isEnabledTabs: activeTabs });
                    document.getElementById("exitButton").textContent = "Enable Extension";
                } else {
                    chrome.tabs.sendMessage(tabId, { action: "enableExtension" });
                    activeTabs[tabId] = true;
                    chrome.storage.local.set({ isEnabledTabs: activeTabs });
                    document.getElementById("exitButton").textContent = "Disable Extension";
                }
            });
        });
    });
});
