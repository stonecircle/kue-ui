/*jslint node: true */
const path = require('path');
const fs = require('fs');

module.exports = {
  getDistPath() {
    return path.join(__dirname, './dist');
  },
  getIndexFile() {
    return fs.readFileSync(
      path.join(__dirname, './dist/index.html'),
      'utf8'
    );
  }
};
