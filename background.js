var disabled = false;

chrome.browserAction.onClicked.addListener(function () {
  if (disabled) {
      enableExtension();
  }
  else {
      disableExtension();
  }
  disabled = !disabled;
});


function enableExtension() {
  chrome.browserAction.setIcon({
    path: {
      "48": "res/img/test.png",
      "88": "res/img/test.png",
      "172": "res/img/test.png"
    },
  });
  chrome.tabs.query({
      active: true,
      currentWindow: true,
}, function (tabs) {
    if (tabs.length > 0) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    }
  });
  console.log("ON");
};



function disableExtension() {
  chrome.browserAction.setIcon({
    path: {
      "48": "res/img/Distest.png",
      "88": "res/img/Distest.png",
      "172": "res/img/Distest.png"
},
  });
  chrome.tabs.query({
    active: true,
    currentWindow: true,
    url: '*://*.youtube.com/watch?v=*',
  }, function (tabs) {
  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id, {action: "ON"});
    chrome.tabs.onUpdated.addListener(
      function(tabId, changeInfo, tab) {
        // read changeInfo data
        if (tabId==tabs[0].id) {
          chrome.browserAction.setIcon({
            path: {
              "48": "res/img/test.png",
              "88": "res/img/test.png",
              "172": "res/img/test.png"
            },
          });
        
        }
      }
    );
    
  }
  });
  console.log("OFF");
};
