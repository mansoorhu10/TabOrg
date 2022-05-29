//background script
console.log("background running");

chrome.storage.sync.set({'urls': []}, function() {
  console.log("'urls' is set to " + "'[]'");
});

chrome.storage.sync.set({'mode': 'light'}, function() {
  console.log("'mode' is set to " + "'light'");
});

/*
//Creating a function that gets all of the tabs with URL info in the current window and displays it on the page
var currentURL = "";

window.onload = function() {
  let tabs = chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs)
  {
    for (let i = 0; i < tabs.length; i++)
    {
      currentURL += tabs[i].url + " ";
    }
  });

  console.log(tabs)
}

chrome.storage.sync.set({'currentURL': currentURL}, function() {
  console.log("'currentURL is set to " + currentURL);
});
*/