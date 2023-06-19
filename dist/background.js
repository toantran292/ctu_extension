/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed");
});
chrome.bookmarks.onCreated.addListener(() => {
    console.log("Bookmarked");
});

/******/ })()
;
//# sourceMappingURL=background.js.map