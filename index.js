'use strict';
var superagent = module.exports = require('superagent');
var request = superagent.Request.prototype;

/*jshint eqnull: true*/
superagent.api = function(url) {
  var obj = {};
  var methods = ['get', 'head', 'post', 'put', 'patch', 'del'];

  methods.forEach(function(method) {
    obj[method] = function(params) {
      var parts = url.split('/');
      var body = JSON.parse(JSON.stringify(params));

      for (var i=parts.length-1; i>=0; i--) {
        if (parts[i][0] === ':') {
          var key = parts[i].slice(1);
          if (body[key] != null) {
            parts[i] = body[key];
            delete body[key];
          } else {
            parts.splice(i, 1);
          }
        }
      }

      var uri = parts.join('/');
      var req = superagent[method](uri);

      return method === 'get' || method === 'head' ? req.query(body) : req.send(body);
    };
  });

  return obj;
};

var end = request.end;
request.end = function(cb) {
  var self = this;

  if (cb) {
    return end.call(self, cb);
  }

  return new Promise(function(resolve, reject) {
    end.call(self, function(err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};
