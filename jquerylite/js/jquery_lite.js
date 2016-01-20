(function() {
  'use strict';
  var functionsQueue = [];
  function $l(element){
    var nodeArray = [];
    if (element instanceof(HTMLElement)) {
      nodeArray.push(element);
    } else if (typeof element === "function"){
      functionsQueue.push(element);
    } else {
      var nodelist = document.querySelectorAll(element);
      for(var i = 0; i < nodelist.length; i++){
        nodeArray[i] = nodelist[i];
      }
    }
    return new DOMNodeCollection(nodeArray);
  }

  document.addEventListener('DOMContentLoaded', function () {
    functionsQueue.forEach(function(func){
      func();
    });
  });

  function DOMNodeCollection (HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === 'undefined') {
      return this.HTMLElements[0].innerHTML;
    } else {
      this.HTMLElements.forEach(function(el){
        el.innerHTML = string;
      });
    }
  };

  DOMNodeCollection.prototype.empty = function (){
    this.html("");
  };

  DOMNodeCollection.prototype.append = function (contents){
    if(typeof contents === "string"){
      this.HTMLElements.forEach(function(el){
        el.innerHTML += contents;
      });
    } else if(contents instanceof DOMNodeCollection) {
      this.HTMLElements.forEach(function(element){
        contents.HTMLElements.forEach(function(content){
          element.innerHTML += content.outerHTML;
        });
      });
    } else {
      this.HTMLElements.forEach(function(element){
        element.innerHTML += contents.outerHTML;
      });
    }
  };

  DOMNodeCollection.prototype.attr = function (attributeName, value) {
    if (typeof value === 'undefined') {
      if (typeof attributeName === "object") {
        // console.log(attributeName);
        for (var key in attributeName) {
           if (attributeName.hasOwnProperty(key)) {
            this.HTMLElements.forEach(function(el){
              el.setAttribute(key, attributeName[key]);
            });
          }
        }
      } else {
        return this.HTMLElements[0].getAttribute(attributeName);
      }
    } else { //setting attribute
      this.HTMLElements.forEach(function(el){
        el.setAttribute(attributeName, value);
      });
    }
  };
  DOMNodeCollection.prototype.addClass = function (addClass) {
    this.HTMLElements.forEach(function(el){
      el.classList.add(addClass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (removeClass) {
    this.HTMLElements.forEach(function(el){
      el.classList.remove(removeClass);
    });
  };

  DOMNodeCollection.prototype.children = function () {
    var children = [];
    this.HTMLElements.forEach(function(DOMNode) {
      var kids = Array.prototype.slice.call( DOMNode.children );
      kids.forEach(function(child){
        children.push(child);
      });
    });
    return new DOMNodeCollection(children);
  };
  Array.prototype.pushUnique = function (item){
    if(this.indexOf(item) == -1) {
    //if(jQuery.inArray(item, this) == -1) {
        this.push(item);
        return true;
    }
    return false;
  };

  DOMNodeCollection.prototype.parent = function () {
    var parents = [];
    this.HTMLElements.forEach(function(DOMNode) {
      parents.pushUnique(DOMNode.parentNode);
    });
    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var matches = [];
    this.HTMLElements.forEach(function(el){
      var match = [].slice.call(el.querySelectorAll(selector));
      match.forEach(function(m){
        matches.pushUnique(m);
      });
    });
    return new DOMNodeCollection(matches);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.HTMLElements.forEach(function(el){
      el.remove();
    });
  };

  DOMNodeCollection.prototype.on = function (eventType, callback) {
    this.HTMLElements.forEach(function(el){
      el.addEventListener(eventType, callback);
    });
  };

  DOMNodeCollection.prototype.off = function (eventType, callback) {
    this.HTMLElements.forEach(function(el){
      el.removeEventListener(eventType, callback);
    });
  };

  root.$l.extend = function (base) {
    var otherObjs = Array.prototype.slice.call(arguments, 1);
    otherObjs.forEach(function (obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          base[prop] = obj[prop];
        }
      }
    });
    return base;
  };

  

  window.$l = $l;
}());
