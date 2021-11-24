const Git = require("nodegit");
const logger = require('../config/logger');
const fs = require('fs');
//const test = require('./fs');
var path = require("path");
const dir = './tmp';


const clone = function(){
  Git.Clone("https://github.com/SpectraNetworks-Inc/backendd", "./tmp")
  .then(function() {
    logger.info('Repo Cloned');
  })
  .catch(function(err) { logger.error(err); });
};


const cloneRepo = function(){
  if (fs.existsSync(dir)) {
    fs.rmdir(dir, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }
      clone();
      console.log(`${dir} is deleted!`);
  });
} else {
  clone();
  logger.info('Directory not found.');
  };
};

  module.exports = {
    cloneRepo
  };
