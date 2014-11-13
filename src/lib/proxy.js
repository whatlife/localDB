// Generated by CoffeeScript 1.8.0
define(function(require, exports, module) {
  'use strict';
  var Evemit, Proxy, Utils;
  Evemit = require('lib/evemit');
  Utils = require('lib/utils');
  Proxy = (function() {
    function Proxy(expire, encrypt, token, proxy) {
      var self;
      this.expire = expire;
      this.encrypt = encrypt;
      this.token = token;
      this.proxy = proxy;
      self = this;
      this.evemit = new Evemit();
      Evemit.bind(window, 'message', function(e) {
        var result;
        result = JSON.parse(e.data);
        if (self.proxy.indexOf(e.origin) === -1) {
          return;
        }
        if (result.data != null) {
          return self.evemit.emit(result.eve, result.data, result.err);
        } else {
          return self.evemit.emit(result.eve, result.err);
        }
      });
    }

    Proxy.prototype.sendMessage = function(type, data, callback) {
      var eve, iframe, self;
      self = this;
      eve = type + "|" + new Date().getTime();
      data.eve = eve;
      data.expire = this.expire;
      data.encrypt = this.encrypt;
      data.token = this.token;
      this.evemit.once(eve, callback);
      data = JSON.stringify(data);
      iframe = Utils.getIframe(this.proxy);
      if (iframe != null) {
        return iframe.contentWindow.postMessage(data, Utils.getOrigin(this.proxy));
      } else {
        iframe = Utils.createIframe(this.proxy);
        return iframe.onload = function() {
          return iframe.contentWindow.postMessage(data, Utils.getOrigin(self.proxy));
        };
      }
    };

    Proxy.prototype.key = function(index, callback) {
      return this.sendMessage('key', {
        index: index
      }, callback);
    };

    Proxy.prototype.size = function(callback) {
      return this.sendMessage('size', {}, callback);
    };

    Proxy.prototype.setItem = function(key, val, callback) {
      return this.sendMessage('setItem', {
        key: key,
        val: val
      }, callback);
    };

    Proxy.prototype.getItem = function(key, callback) {
      return this.sendMessage('getItem', {
        key: key
      }, callback);
    };

    Proxy.prototype.removeItem = function(key, callback) {
      return this.sendMessage('removeItem', {
        key: key
      }, callback);
    };

    Proxy.prototype.usage = function(callback) {
      return this.sendMessage('usage', {}, callback);
    };

    return Proxy;

  })();
  return module.exports = Proxy;
});
