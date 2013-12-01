var on = 0;
chrome.browserAction.onClicked.addListener(function(tab) {
if(on === 0){
    on = 1;
    chrome.tabs.executeScript(null, {file: "content_script.js"});
}else{
chrome.tabs.executeScript(null, {file: "reload.js"});
on = 0;
}
});

