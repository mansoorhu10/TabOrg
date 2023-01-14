/*global chrome*/
//background script
console.log("background running");

chrome.storage.local.set({'currentTabs': []}, function() {
  console.log("'currentTabs' is initialized to ");
  console.log([]);
});

chrome.storage.local.set({'groupCreationTabs': []}, function() {
  console.log("'groupCreationTabs' is initialized to ");
  console.log([]);
});

chrome.storage.local.set({'groups': []}, function() {
  console.log("'groups' is set to '[]'");
});

chrome.storage.sync.set({'mode': 'light'}, function() {
  console.log("'mode' is initialized to " + "'light'");
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