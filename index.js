'use strict';

var fs = require('fs');
var path = require('path');
module.exports.setup = function (reportPath, nemo, callback) {
  nemo.perfectomobile = {
    getReport: function(_fname) {
      var type, fname;
      if (_fname) {
        type = _fname.substr(_fname.lastIndexOf('.') + 1, _fname.length);
        fname = _fname;
      } else {
        type = 'html';
      }

      return nemo.driver.close().then(function () {
        nemo.perfectomobile.getCapsString().then(function (capsString) {
          if (!fname) {
            fname = capsString + (Date.now()) + '.' + type;
          }
          return nemo.driver.executeScript('mobile:report:download', {'type':type}).then(function(val)
            {
              var buf = new Buffer(val, 'base64');
              var d = nemo.wd.promise.defer();
              var fileName = path.resolve(reportPath, fname);
              fs.writeFile(fileName, buf.toString(), {encoding: 'utf8'}, function (err) {
                if (err) {
                  return d.reject(err);
                }
                d.fulfill(fileName);
              });
              return d.promise;
            }
          );
        });
      });


    },
    getCapsString: function() {
      return nemo.driver.getCapabilities().then(function(_caps) {
        var caps = _caps.caps_;
        var capsString = '';
        capsString += (caps.browserName) ? caps.browserName + '-' : '';
        capsString += (caps.platformName) ? caps.platformName + '-' : '';
        capsString += (caps.platformVersion) ? caps.platformVersion + '-' : '';
        return capsString;
      });
    }
  };
  callback(null);
};