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

function onError(error) {
    console.error(`Error: ${error}`);
    showBadge("er", "#dc3545");
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, {action: "getLocation"}).then(response => {
            navigator.clipboard.writeText(response).then(() => {
                showBadge("ok", "#28a745");
            }, onError);
        }).catch(onError);
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({currentWindow: true, active: true}).then(sendMessageToTabs).catch(onError);
});
