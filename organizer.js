//Popup script that runs when the extension is opened

const reader = new FileReader();
let urlArr = [];
let createURLs = [];
var groupName = "";

//functions created in order to simplify the process of saving arrays into localStorage of chrome browser

Storage.prototype.setObj = function(key, obj) { 
  return this.setItem(key, JSON.stringify(obj));
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
}

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
    
    }); */
  }
  reader.readAsText(input.files[0]);

}, false);


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


//Setting the background to dark/light mode with a button
if (localStorage.getItem("mode") == "dark") //created in order to save the user's setting on light/dark mode, regardless of exiting the extension
{
  document.body.classList.toggle("dark");
}

var darkButton = document.getElementById("darkBtn"); 
darkButton.onclick = function setDarkMode()
{
  document.body.classList.toggle("dark");

  if (localStorage.getItem("mode") == "light")
  {
    localStorage.setItem("mode", "dark");
    console.log("mode is set to dark");
  }
  else if (localStorage.getItem("mode") == "dark")
  {
    localStorage.setItem("mode", "light");
    console.log("mode is set to light");
  }

}