//background script

//These are usually used to run code when the extension is downloaded or on startup of a browser, however, so far there isn't any use of a background script for any of the features in the extension.

console.log("background running");

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

localStorage.setObj('urls', []);
localStorage.setItem('mode', 'light');

/*
chrome.runtime.onInstalled.addListener((reason) => {
      chrome.tabs.create({
        url: 'popup.html'
      });
      console.log("attempted html page open");
    }
  );
*/