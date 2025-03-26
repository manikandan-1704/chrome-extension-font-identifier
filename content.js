let tooltip;
let isEnabled = false;

chrome.storage.local.get(["isEnabledTabs"], (data) => {
    let activeTabs = data.isEnabledTabs || {}; 
    chrome.runtime.sendMessage({ action: "getTabId" }, (response) => {
        if (response?.tabId && activeTabs[response.tabId]) {
            enableExtension(); 
        }
    });
});

function enableExtension() {
    if (isEnabled) return;
    isEnabled = true;

    tooltip = document.createElement("div");
    tooltip.style.position = "fixed";
    tooltip.style.background = "rgba(0, 0, 0, 0.8)";
    tooltip.style.color = "#fff";
    tooltip.style.padding = "5px 10px";
    tooltip.style.borderRadius = "5px";
    tooltip.style.fontSize = "14px";
    tooltip.style.zIndex = "10000";
    tooltip.style.display = "none";
    tooltip.style.pointerEvents = "none";
    document.body.appendChild(tooltip);

    document.addEventListener("mousemove", showFontDetails);
    document.addEventListener("mouseout", hideTooltip);
}

function disableExtension() {
    isEnabled = false;
    tooltip?.remove();
    document.removeEventListener("mousemove", showFontDetails);
    document.removeEventListener("mouseout", hideTooltip);
}

function showFontDetails(event) {
    if (!isEnabled) return;
    const element = event.target;
    const computedStyle = window.getComputedStyle(element);
    const fontFamily = computedStyle.fontFamily;
    const fontSize = computedStyle.fontSize;

    if (element.textContent.trim().length > 0) {
        tooltip.textContent = `Font: ${fontFamily} | Size: ${fontSize}`;
        tooltip.style.top = `${event.clientY + 10}px`;
        tooltip.style.left = `${event.clientX + 10}px`;
        tooltip.style.display = "block";
    } else {
        tooltip.style.display = "none";
    }
}

function hideTooltip() {
    tooltip.style.display = "none";
}

chrome.runtime.onMessage.addListener((message) => {
    chrome.runtime.sendMessage({ action: "getTabId" }, (response) => {
        if (!response?.tabId) return;
        
        chrome.storage.local.get(["isEnabledTabs"], (data) => {
            let activeTabs = data.isEnabledTabs || {};

            if (message.action === "enableExtension") {
                activeTabs[response.tabId] = true;
                chrome.storage.local.set({ isEnabledTabs: activeTabs });
                enableExtension();
            } else if (message.action === "disableExtension") {
                delete activeTabs[response.tabId];
                chrome.storage.local.set({ isEnabledTabs: activeTabs });
                disableExtension();
            }
        });
    });
});
