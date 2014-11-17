// Generated by CoffeeScript 1.8.0
define(function(require, exports, module) {
  "use strict";
  var Encrypt, Storage, Support, Utils;
  Utils = require("core/utils");
  Support = require("lib/support");
  Encrypt = require("lib/encrypt");
  Storage = (function() {
    function Storage(expire, encrypt, token) {
      this.expire = expire;
      this.encrypt = encrypt;
      this.token = token;
      if (this.expire === "window") {
        if (!Support.sessionstorage()) {
          throw new Error("sessionStorage is not supported!");
        }
        this.storage = sessionStorage;
      } else if (this.expire === "none") {
        if (!Support.localstorage()) {
          throw new Error("localStorage is not supported!");
        }
        this.storage = localStorage;
      }
    }

    Storage.prototype.key = function(index, callback) {
      var e, key;
      try {
        key = this.storage.key(index);
      } catch (_error) {
        e = _error;
        callback(-1, e);
      }
      callback(key);
    };

    Storage.prototype.size = function(callback) {
      var e, size;
      try {
        size = this.storage.length;
      } catch (_error) {
        e = _error;
        callback(-1, e);
      }
      callback(size);
    };

    Storage.prototype.setItem = function(key, val, callback) {
      var cnt, data, e, self;
      self = this;
      cnt = 0;
      try {
        if (this.encrypt) {
          val = Encrypt.encode(val, this.token);
        }
        this.storage.setItem(key, val);
      } catch (_error) {
        e = _error;

        /* TODO
         *  需要在LocalDB的构造函数中增加配置参数，来确定是否自动删除最老数据
         *  增加过期时间配置项
         */
        if (this.encrypt) {
          val = Encrypt.decode(val, this.token);
        }
        data = Utils.parse(val);
        while (cnt > 10) {
          try {
            data.splice(0, 1);
            val = Utils.stringify(data);
            if (self.encrypt) {
              val = Encrypt.encode(val, self.token);
            }
            self.storage.setItem(key, val);
            cnt = 11;
          } catch (_error) {
            e = _error;
            cnt += 1;
          }
        }
      }
      callback((cnt > 10 ? new Error("exceed maximum times trying setItem into Storage") : void 0));
    };

    Storage.prototype.getItem = function(key, callback) {
      var e, item;
      try {
        item = this.storage.getItem(key);
        if (this.encrypt) {
          item = Encrypt.decode(item, this.token);
        }
      } catch (_error) {
        e = _error;
        callback(null, e);
      }
      callback(item);
    };

    Storage.prototype.removeItem = function(key, callback) {
      var e;
      try {
        this.storage.removeItem(key);
      } catch (_error) {
        e = _error;
        callback(e);
      }
      callback();
    };

    Storage.prototype.usage = function(callback) {

      /*
       *  check it out: http://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage
       */
      var allStrings, e, key, val, _ref;
      try {
        allStrings = "";
        _ref = this.storage;
        for (key in _ref) {
          val = _ref[key];
          allStrings += val;
        }
      } catch (_error) {
        e = _error;
        callback(-1, e);
      }
      return callback(allStrings.length / 512);
    };

    return Storage;

  })();
  return module.exports = Storage;
});
