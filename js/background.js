chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "get") {
		sendResponse({data: localStorage[request.key]});
	} else if (request.method == "set") {
		localStorage[request.key] = request.value;
		sendResponse({data: true});
	} else {
		sendResponse({});
	}
});