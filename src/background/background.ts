chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed");
});

chrome.bookmarks.onCreated.addListener(() => {
  console.log("Bookmarked");
});
