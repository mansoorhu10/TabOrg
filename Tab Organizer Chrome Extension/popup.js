chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {  
  document.write('<h1><center>Welcome to TabOrg!</center></h1>');
  document.write('<hr>');
    document.write(`<h3>These are your tabs:</h3>`);
    document.write('<ul>');
    for (let i = 0; i < tabs.length; i++) {
      document.write(`<br>${tabs[i].url}`);
    }
    document.write('</ul>');
  }); 

//function deleteDup(){
  //chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (tabs) => {
    //document.write('<h2>Here are urls that are the same</h2>');
    //document.write(`<br>${tabs.url}`);
    //};
  //};