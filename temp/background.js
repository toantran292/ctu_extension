chrome.action.disable();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    console.log(tab.url);
    if (tab.url.indexOf("ctu.edu.vn") != -1) {
      console.log("enable");
      chrome.action.enable(tabId);
    } else {
      console.log("disable");
      chrome.action.disable(tabId);
    }
  }
});
