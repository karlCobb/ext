chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
   
    if (request.greeting != ""){
   	console.log("background " + request.greeting);
	   sendResponse({farewell: JSON.stringify(request.greeting)});
	}  
     });
