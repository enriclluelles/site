
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

;
(function() {
  var Dollar,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.$ = new (Dollar = (function() {
    var Wrapper, WrapperList, query, queryDom, type, wrapIteratorProperty;

    Wrapper = (function() {
      var allClassesExceptOne;

      allClassesExceptOne = function(name, elem) {
        var cl, _i, _len, _ref, _results;
        _ref = elem.className.split(" ");
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cl = _ref[_i];
          if (cl !== name && cl !== "") _results.push(cl);
        }
        return _results;
      };

      function Wrapper(elem) {
        __extends(elem, Wrapper.prototype);
        return elem;
      }

      Wrapper.prototype.addClass = function(name) {
        var classNames;
        if (!name) return this;
        classNames = allClassesExceptOne(name, this);
        this.className = "" + (classNames.join(' ')) + " " + name;
        return this;
      };

      Wrapper.prototype.removeClass = function(name) {
        var classNames;
        if (!name) return this;
        classNames = allClassesExceptOne(name, this);
        this.className = classNames.join(' ');
        return this;
      };

      Wrapper.prototype.find = function(selector) {
        return queryDom(this, selector);
      };

      Wrapper.prototype.html = function(content) {
        if (content) this.innerHTML = content;
        return this.innerHTML;
      };

      return Wrapper;

    })();

    wrapIteratorProperty = function(object, property) {
      return object[property] = function(args) {
        var e, results, _i, _len;
        for (_i = 0, _len = this.length; _i < _len; _i++) {
          e = this[_i];
          results = e[property](args);
        }
        return results;
      };
    };

    WrapperList = (function() {

      function WrapperList(elems) {
        var property, _ref;
        __extends(elems, WrapperList.prototype);
        _ref = Wrapper.prototype;
        for (property in _ref) {
          if (!__hasProp.call(_ref, property)) continue;
          wrapIteratorProperty(elems, property);
        }
        return elems;
      }

      WrapperList.prototype.first = function() {
        return this[0];
      };

      WrapperList.prototype.last = function() {
        return this[this.length - 1];
      };

      return WrapperList;

    })();

    queryDom = function(domain, selector) {
      var arr, domElements;
      domElements = domain.querySelectorAll(selector);
      arr = Array.prototype.slice.call(domElements);
      return new WrapperList(arr.map(function(el) {
        return new Wrapper(el);
      }));
    };

    type = function(obj) {
      var classToType, myClass, name, _i, _len, _ref;
      if (obj === void 0 || obj === null) return String(obj);
      classToType = new Object;
      _ref = "Boolean Number String Function Array Date RegExp".split(" ");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        classToType["[object " + name + "]"] = name.toLowerCase();
      }
      myClass = Object.prototype.toString.call(obj);
      if (myClass in classToType) return classToType[myClass];
      return "object";
    };

    query = function(selector) {
      var arr;
      if (!selector) return;
      switch (type(selector)) {
        case 'function':
          return document.addEventListener("DOMContentLoaded", selector);
        case 'array':
          arr = selector;
          return new WrapperList(arr.map(function(el) {
            return new Wrapper(el);
          }));
        case 'string':
          return arr = queryDom(document, selector);
        case 'object':
          return new Wrapper(selector);
      }
    };

    function Dollar() {
      return query;
    }

    return Dollar;

  })());

}).call(this);
(function() {

  $(function() {
    $('div, h1, img').removeClass('hidden');
    return $('#who').addClass('hidden');
  });

}).call(this);
