// import fs from 'fs';
// import path from 'path';
// import walkFile from './walk-file.js';
// TODO: use es module
const fs = require('fs');
const path = require('path');
const walkFile = require('./walk-file');

function getSqlMap() {
  let basePath = path.resolve('');
  // 处理windowns下的路径
  // copy
  // basePath.replace(/\\/g, '/');
  // let pathArr = basePath.split('/');
  // pathArr = pathArr.splice(0, pathArr.length - 1);
  // basePath = pathArr.join('/') + '/sql/';

  // me 
  const sqlPath = path.resolve(__dirname, '../sql/');
  return walkFile(sqlPath, 'sql');
}

const sqlContentMap = {};

function getSqlContent(fileName, path) {
  const content = fs.readFileSync(path, 'binary');
  sqlContentMap[fileName] = content;
}

function getSqlContentMap() {
  const sqlMap = getSqlMap();

  for (let key in sqlMap) {
    getSqlContent(key, sqlMap[key]);
  }

  return sqlContentMap;
}

module.exports = getSqlContentMap;
