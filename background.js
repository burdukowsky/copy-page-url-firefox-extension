"use strict";

browser.browserAction.setBadgeTextColor({color: "white"});

let badgeTimeout;

function showBadge(text, bgColor) {
    browser.browserAction.setBadgeText({text: text});
    browser.browserAction.setBadgeBackgroundColor({color: bgColor});
    clearTimeout(badgeTimeout);
    badgeTimeout = setTimeout(() => {
        browser.browserAction.setBadgeText({text: ""});
    }, 3000);
}

browser.browserAction.onClicked.addListener(tab => {
    navigator.clipboard.writeText(tab.url).then(() => {
        showBadge("ok", "#28a745");
    }, error => {
        console.error(`Error: ${error}`);
        showBadge("er", "#dc3545");
    });
});
