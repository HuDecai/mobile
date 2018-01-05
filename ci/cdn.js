var OSS = require('ali-oss').Wrapper;
var fs = require('fs');
var path = require('path');
// var ENV = process.env.APPENV;
var ENV = 'yihe';


var client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI1KeZazjWNR7e',
  accessKeySecret: 'krTrMuZBq4xH4L0jKuLw0ml3j3uAYN',
  bucket: 'dash'
});

fs.readdir(path.resolve(__dirname, '..', 'dist'), function(err, files) {
  if (files) {
    files.map(fileName => {
      if (ENV) {
        client.put(`fe-mobile/${ENV}/${fileName}`, path.resolve(__dirname, '..', 'dist', fileName)).then(function (val) {
          console.log(val.url);
        }).then(function (val) {
        });
      } else {
        client.put(`fe-mobile/${fileName}`, path.resolve(__dirname, '..', 'dist', fileName)).then(function (val) {
          console.log(val.url);
        }).then(function (val) {
        });
      }
    });
  }
});
