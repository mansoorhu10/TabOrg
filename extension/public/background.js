/*global chrome*/
//background script
console.log("background running");

chrome.storage.sync.set({'currentURL': []}, function() {
  console.log("'currentURL' is set to ");
  console.log([]);
});

chrome.storage.sync.set({'mode': 'light'}, function() {
  console.log("'mode' is set to " + "'light'");
});


chrome.storage.sync.set({'names': []}, function() {
  console.log("'names' is set to '[]'");
});

chrome.storage.sync.set({'icons': []}, function() {
  console.log("'icons' is set to '[]'");
});


chrome.storage.sync.set({'groupURLs': []}, function() {
  console.log("'groupURLs is set to '[]'");
});

chrome.storage.sync.set({'groupNames': []}, function() {
  console.log("'groupNames' is set to '[]'");
});

chrome.storage.sync.set({'groupIcons': []}, function() {
  console.log("'groupIcons' is set to '[]'");
});

chrome.storage.sync.set({'groups': []}, function() {
  console.log("'groups' is set to '[]'");
});

chrome.storage.sync.set({'groupTitles': []}, function() {
  console.log("'groupTitles' is set to '[]'");
});

chrome.storage.sync.set({'groupColors': []},function() {
  console.log("'groupColors' is set to '[]'");
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