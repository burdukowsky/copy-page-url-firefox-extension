"use strict";

browser.runtime.onMessage.addListener(request => {
    switch (request.action) {
        case "getLocation":
            return Promise.resolve(document.location.href);
        default:
            return Promise.reject(new Error("Unknown action"));
    }
});
