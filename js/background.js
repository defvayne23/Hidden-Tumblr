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

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'tumblr.com' },
          })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: "options.html"});
});
