// Generated by CoffeeScript 1.7.1
'use strict';
var Engine;

Engine = (function() {
  function Engine(engine) {
    if (engine === localStorage) {
      this.type = 1;
    } else if (engine === sessionStorage) {
      this.type = 2;
    } else if (engine === indexedDB) {
      this.type = 3;
    } else {
      this.type = 9;
    }
  }

  Engine.prototype.key = function(name) {
    switch (this.type) {
      case 1:
        return localStorage.key(name);
      case 2:
        return sessionStorage.key(name);
    }
  };

  Engine.prototype.size = function() {
    switch (this.type) {
      case 1:
        return localStorage.length;
      case 2:
        return sessionStorage.length;
    }
  };

  Engine.prototype.setItem = function(key, val) {
    switch (this.type) {
      case 1:
        return localStorage.setItem(key, val);
      case 2:
        return sessionStorage.setItem(key, val);
    }
  };

  Engine.prototype.getItem = function(key) {
    switch (this.type) {
      case 1:
        return localStorage.getItem(key);
      case 2:
        return sessionStorage.getItem(key);
    }
  };

  Engine.prototype.removeItem = function(key) {
    switch (this.type) {
      case 1:
        return localStorage.removeItem(key);
      case 2:
        return sessionStorage.removeItem(key);
    }
  };

  return Engine;

})();

module.exports = Engine;
