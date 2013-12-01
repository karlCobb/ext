var p = document.getElementsByTagName("p");
  var text = JSON.stringify(p[0]);
   console.log(text);
chrome.runtime.sendMessage({greeting: text}, function(response) {

});
