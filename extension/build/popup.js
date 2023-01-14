// Popup script that runs when the extension is opened

const reader = new FileReader();
let urlArr = [];
let createURLs = [];
let groupName = "";
let tempMode = {};
let newIndexURL = "";

var currentURL = "";
  

// Getting all tabs with all required info in all windows
async function getAllTabInfo(callback) {

    let urlArr = [];
    let nameArr = [];
    let iconArr = [];

    let currentTabs = [];

    chrome.windows.getAll({populate: true}, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          urlArr.push(tab.url);
          nameArr.push(tab.title);
          iconArr.push(tab.favIconUrl);
        });
      });

      currentTabs = combineTabInfo(urlArr, nameArr, iconArr);

      callback(currentTabs);
    });
}

function combineTabInfo(urls, names, icons){
  let tabs = []
  for(let i = 0; i < urls.length; i++){
    tabs.push({
      id: i,
      url: urls[i],
      title: names[i],
      icon: icons[i],
    })
  }
  return tabs;
}


let currentTabs = getAllTabInfo(currentTabs => {
  chrome.storage.local.set({'currentTabs': currentTabs}, () => {
    console.log("currentTabs is verified to ");
    console.log(currentTabs);
  });
  
});

// functions created in order to simplify the process of saving arrays into localStorage of chrome browser

Storage.prototype.setObj = function(key, obj) { 
  return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
}

/*
//Opening the popup in a new tab using webBtn

var webButton = document.getElementById("webBtn");
webButton.onclick = function openWeb()
{
  newIndexURL = chrome.runtime.getURL("index.html")
  chrome.tabs.create({url: newIndexURL});
}

*/

//Automatically deleting all duplicate versions of tabs and keeping the originals in the current or selected window to allow users to save CPU usage and unnecessary open tabs
let dupeId = [];

var deleteButton = document.getElementById("deleteBtn");
deleteButton.onclick = function deleteDupes()
{
  let tabs = chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs) 
  {
    for (let i = 0; i < tabs.length; i++) 
    {
      for (let k = i+1; k < tabs.length; k++)
      {
        if (tabs[i].url == tabs[k].url)
        {
          dupeId.push(tabs[k].id);
          console.log("Dupe Tab Index Array is: " + dupeId);
        } 
      }
    }

    chrome.tabs.remove(dupeId, console.log("Removed duplicates"));

  }); 
}


chrome.storage.sync.get(['mode'], function(tempMode) {
  console.log("'mode' is set to " + tempMode['mode']);
  if (tempMode['mode'] == 'dark')
  {
    document.body.classList.toggle("dark");
  }
});
