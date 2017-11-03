var expressExtension = require('express-integrator-extension');
var functions = require('./function');
var express = require('express');
var app = express();
var systemToken = 'ed847d0ae24740288184326e89db11cd';
var options = {
  diy: functions,
  systemToken: systemToken,
  port: 5000
};

expressExtension.createServer(options, function(err) {});
