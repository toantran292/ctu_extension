const stringToHTML = (str) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc;
};
