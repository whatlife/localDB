// Generated by CoffeeScript 1.8.0
define(function(require, exports, module) {
  'use strict';
  var Proxy;
  Proxy = require('core/proxy');
  return describe('Proxy', function() {
    var proxy;
    proxy = new Proxy(false, true, true, "http://localdb.emptystack.net/server.html");
    it('setItem', function() {
      return proxy.setItem("name", "Arron", function(data) {
        return console.log("proxy=======>setItem==" + data);
      });
    });
    it('key', function() {
      return proxy.key(0, function(data) {
        return console.log("proxy=======>key==" + data);
      });
    });
    it('size', function() {
      return proxy.size(function(data) {
        return console.log("proxy=======>size==" + data);
      });
    });
    it('getItem', function() {
      return proxy.getItem("name", function(data) {
        return console.log("proxy=======>getItem==" + data);
      });
    });
    it('removeItem', function() {
      return proxy.removeItem("name", function(data) {
        return console.log("proxy=======>removeItem==" + data);
      });
    });
    return it('usage', function() {
      return proxy.usage(function(data) {
        return console.log("proxy=======>usage==" + data);
      });
    });
  });
});
