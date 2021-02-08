// import * as fs from 'fs';
// TODO: use es module
const fs = require('fs');
const path = require('path');

const walkFile = function (pathResolve, mime) {
  let files = fs.readdirSync(pathResolve);

  let fileList = {};

  for (let [i, item] of files.entries()) {
    let itemArr = item.split('.');
    let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined';
    if (mime === itemMime) {
      fileList[item] = path.resolve(pathResolve, item);
    }
  }

  return fileList;
}


// export default walkFile;
module.exports = walkFile;
