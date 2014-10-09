// Generated by CoffeeScript 1.7.1
"use strict";
var Collection, LocalDB, expect;

expect = require("expect.js");

LocalDB = require("../src/localdb.js");

Collection = require("../src/lib/collection.js");

console.log("Test Browser is: ", navigator.userAgent.toLowerCase());

describe("LocalDB", function() {
  var db;
  it("LocalStorage Support", function() {
    return expect(LocalDB.support().localStorage).to.be(true);
  });
  it("SessionStorage Support", function() {
    return expect(LocalDB.support().sessionStorage).to.be(true);
  });
  it("IndexedDB Support", function() {
    if (navigator.userAgent.toLowerCase().indexOf("mozilla") !== -1) {
      return expect(LocalDB.support().indexedDB).to.be(false);
    } else {
      return expect(LocalDB.support().indexedDB).to.be(true);
    }
  });
  it("wrong usage", function() {
    var db, e;
    try {
      return db = new LocalDB();
    } catch (_error) {
      e = _error;
      return expect(e.message).to.be("dbName should be specified.");
    }
  });
  db = new LocalDB('foo', {
    engine: localStorage
  });
  it("new LocalDB", function() {
    return expect(db instanceof LocalDB).to.be(true);
  });
  it("options", function() {
    var options;
    options = db.options();
    expect(options).to.be.ok();
    expect(options.name).to.be("foo");
    return expect(options.engine.type).to.be(1);
  });
  it("collection", function() {
    var collection;
    collection = db.collection("bar");
    collection.insert({
      a: 1
    });
    return expect(collection instanceof Collection).to.be(true);
  });
  it("collections", function() {
    var collections;
    collections = db.collections();
    db.ls.length;
    console.log(db.collections());
    return expect(collections).to.be.eql(["bar"]);
  });
  it("drop collection", function() {
    var collections;
    db.drop("bar");
    collections = db.collections();
    return expect(collections).to.be.eql([]);
  });
  it("drop db", function() {
    var bar1, bar2, collections;
    bar1 = db.collection("bar1");
    bar2 = db.collection("bar2");
    bar1.insert({
      a: 1
    });
    bar2.insert({
      b: 2
    });
    db.drop();
    collections = db.collections();
    return expect(collections).to.be.eql([]);
  });
  it("timestamp", function() {
    expect(LocalDB.getTimestamp("543509d5f3692b00001b2b61")).to.be.ok();
    return expect(LocalDB.getTime("543509d5f3692b00001b2b61")).to.be(1412762069000);
  });
  return it("window.LocalDB", function() {
    return expect(typeof window.LocalDB).to.be("undefined");
  });
});
