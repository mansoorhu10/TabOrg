function callback(data) {
    console.log(data)
}

if (firstRun){

chrome.tabs.create({"url": "https://youtube.com"}, callback);

}