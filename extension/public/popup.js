//Popup script that runs when the extension is opened

const reader = new FileReader();
let urlArr = [];
let createURLs = [];
var groupName = "";
var tempMode = {};
var newIndexURL = "";

var currentURL = "";
  

//Getting all URLs in the window
async function getTabs(callback) {

    const urlArr = [];
    let i = 0;

    chrome.windows.getAll({populate: true}, function(windows) {
      windows.forEach(function(window) {
        window.tabs.forEach(function(tab) {
          urlArr.push(tab.url);
          i++;
        });
      });

      callback(urlArr);
    });
}

async function getNames(callback) {

  const nameArr = [];
  let i = 0;

  chrome.windows.getAll({populate: true}, function(windows) {
    windows.forEach(function(window) {
      window.tabs.forEach(function(tab) {
        nameArr.push(tab.title);
        i++;
      });
    });

    console.log("nameArr is");
    console.log(nameArr);
    callback(nameArr);
  });
}

async function getIcons(callback) {

  const iconArr = [];
  let i = 0;

  chrome.windows.getAll({populate: true}, function(windows) {
    windows.forEach(function(window) {
      window.tabs.forEach(function(tab) {
        iconArr.push(tab.favIconUrl);
        i++;
      });
    });

    console.log("iconArr is");
    console.log(iconArr);
    callback(iconArr);
  });
}


let currentTabs = getTabs(currentTabs => {
  chrome.storage.sync.set({'currentURL': currentTabs}, () => {
    console.log("currentURL is verified to ");
    console.log(currentTabs);
  });
  
});

let currentNames = getNames(currentNames => {
  chrome.storage.sync.set({'names': currentNames}, () => {
    console.log("'names' is verified to ");
    console.log(currentNames);
  })
})

let currentIcons = getIcons(currentIcons => {
  chrome.storage.sync.set({'icons': currentIcons}, () => {
    console.log("'icons' is verified to ");
    console.log(currentIcons);
  })
})


//functions created in order to simplify the process of saving arrays into localStorage of chrome browser

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

/*
//Saving a file in order to permanently store url info on hard drive
var saveButton = document.getElementById("saveBtn"); 
saveButton.onclick = function saveToFile() 
{
  groupName = document.getElementById("grpName").value;
  document.getElementById("grpName").value = "";
  console.log(groupName);
  
  var blob = new Blob(localStorage.getObj('urls'), {type: "text/plain; charset=utf-8"});
    saveAs(blob, groupName);

  localStorage.setObj('urls', []);
  
}

//Entering in copy pasted URLs to save them into a string array
var urlInput = document.querySelector('input[type = "text"]'); 
urlInput.addEventListener('change', function() {
  var userInput = document.getElementById("userInput").value;
  document.getElementById("userInput").value="";

  urlArr = localStorage.getObj('urls'); //url array is updated with previously entered urls that are saved locally to browser when clicking off the extension in order to copy paste more URLs

  urlArr.push(userInput + " "); 

  localStorage.setObj('urls', urlArr);
  
  console.log(urlArr);

}, false);


//Selecting a file on the local hard drive in order to get url info
var input = document.querySelector('input[type = "file"]'); 
input.addEventListener('change', function() {
  reader.onload = function() {
    console.log(reader.result);
    var fileText = reader.result;
    var bank = "";
    for (let i = 0; i < fileText.length; i++) //Simple parsing algorithm to sort URLs on the text file into string array without spaces (' ') at the end of each url element
    {
      if (fileText.charAt(i) == " ")
      {
        createURLs.push(bank);
        bank = "";
      }
      else
      {
        bank = bank + fileText.charAt(i);
      } 
    }
    
    console.log(createURLs);
    chrome.windows.create({'url': createURLs});

    //var windowArr = chrome.windows.getAll(windowId);
    /*

    if (confirm("A Tab Group will be created in the following window."))
    {
      console.log('OK button was pressed');
    }
    else
    {
      console.log('Cancel button was pressed');
    }

    var topWindow = window.top.id;

    var newGroup = [];
    
    let tabs = chrome.tabs.query({windowId: topWindow}, function (tabs) 
    {
      for (let i = 0; i < tabs.length; i++)
      {
        newGroup.push(tabs[i].id);
      }
    chrome.tabs.group({'tabIds': newGroup});
    console.log("Attempted grouping");
    
    }); 
  }
  reader.readAsText(input.files[0]);

}, false);

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

/*
if (localStorage.getItem("mode") == "dark") //created in order to save the user's setting on light/dark mode, regardless of exiting the extension
{
  document.body.classList.toggle("dark");
}
*/

/*
var darkButton = document.getElementById("darkBtn"); 
darkButton.onclick = function setDarkMode()
{
  document.body.classList.toggle("dark");

  chrome.storage.sync.get(['mode'], function(tempMode) {
    console.log("'mode' is currently set to " + tempMode['mode']);
    if (tempMode['mode'] == "light")
    {
      chrome.storage.sync.set({'mode': 'dark'}, function() {
        console.log("'mode' is updated to 'dark'");
      });
    }
    else if (tempMode['mode'] == "dark")
    {
      chrome.storage.sync.set({'mode': 'light'}, function() {
        console.log("'mode' is updated to 'light'");
      });
    }
  });

}
*/
