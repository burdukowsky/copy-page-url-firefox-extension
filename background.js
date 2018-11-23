"use strict";

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(tab.id, {action: "getLocation"}).then(response => {
            navigator.clipboard.writeText(response).then(null, onError);
        }).catch(onError);
    }
}

browser.browserAction.onClicked.addListener(() => {
    browser.tabs.query({currentWindow: true, active: true}).then(sendMessageToTabs).catch(onError);
});
