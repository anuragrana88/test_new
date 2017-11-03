var client = require('./restcall.js')
var _ = require('lodash')

var obj = {
    hooks: {
      preSaveFunction: function(options, callback) {
        client.registerMethod("jsonMethod", "http://api.fixer.io/latest",
          "GET");
        client.methods.jsonMethod(function(data, response) {
          var currentRate = JSON.stringify(data['rates'].INR);
          var currentDate = JSON.stringify(data['date']);
          var data = options.data;
          _.each(data, function(mydata) {
            mydata.amount = parseInt(mydata.amount) * currentRate;
            mydata.date = currentDate;
          })
          var responseData = {
            data: data
          };
          return callback(null, responseData);
        });
      }
    },

    wrappers: {
      pingFunction: function(options, callback) {}
    };

    module.exports = obj;
