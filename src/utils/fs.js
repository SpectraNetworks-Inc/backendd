const logger = require('../config/logger');
const fs = require('fs');
const path = require("path");

const rmdir = function(dir) {
	var list = fs.readdirSync(dir);
	for(var i = 0; i < list.length; i++) {
		var filename = path.join(dir, list[i]);
		var stat = fs.statSync(filename);

		if(filename == "." || filename == "..") {
    		} else if(stat.isDirectory()) {
			rmdir(filename);
		} else {
			fs.unlinkSync(filename);
		}
	}
  logger.info('Test worked delted dir');
	fs.rmdirSync(dir);
};


module.exports = {
  rmdir
};
