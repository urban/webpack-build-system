"use strict";

exports.__esModule = true;
exports["default"] = buildBanner;

function buildBanner(pack) {
  var now = new Date();
  var year = now.getFullYear();
  var dateStamp = now.toISOString();
  return pack.name + " v" + pack.version + "\n\nCopyright " + year + " " + pack.author + "\nReleased under the " + pack.license + " license\n\nDate: " + dateStamp;
}

module.exports = exports["default"];