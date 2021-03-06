// Generated by CoffeeScript 1.8.0
define(function(require, exports, module) {
  "use strict";
  var Support, mod;
  mod = "lST$*@?";
  Support = {};
  Support.localstorage = function() {
    var e;
    try {
      localStorage.setItem(mod, mod);
      localStorage.removeItem(mod);
      return true;
    } catch (_error) {
      e = _error;
      return false;
    }
  };
  Support.sessionstorage = function() {
    var e;
    try {
      sessionStorage.setItem(mod, mod);
      sessionStorage.removeItem(mod);
      return true;
    } catch (_error) {
      e = _error;
      return false;
    }
  };
  Support.postmessage = function() {
    return typeof postMessage !== "undefined" && postMessage !== null;
  };
  Support.websqldatabase = function() {
    return typeof openDatabase !== "undefined" && openDatabase !== null;
  };
  Support.indexedDB = function() {
    return (typeof indexedDB !== "undefined" && indexedDB !== null) || (typeof webkitIndexedDB !== "undefined" && webkitIndexedDB !== null) || (typeof mozIndexedDB !== "undefined" && mozIndexedDB !== null) || (typeof OIndexedDB !== "undefined" && OIndexedDB !== null) || (typeof msIndexedDB !== "undefined" && msIndexedDB !== null);
  };
  Support.applicationcache = function() {
    return typeof applicationCache !== "undefined" && applicationCache !== null;
  };
  Support.userdata = function() {
    return document.documentElement.addBehavior != null;
  };
  return module.exports = Support;
});
