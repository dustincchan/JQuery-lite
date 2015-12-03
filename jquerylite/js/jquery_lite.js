(function() {
  'use strict';
  function $l(element){
    var nodelist = document.querySelectorAll(element);
    var nodeArray = [];
    for(var i = 0; i < nodelist.length; i++){
      nodeArray[i] = nodelist[i];
    }
    // console.log(nodeArray);
    return new DOMNodeCollection(nodeArray);
  }
  window.onload = function(){
    $l("li").html("I am innerHTML");
    $l("li").append("COOOOOOL");
    var kyle = $l("div");
    $l("li").append(kyle.HTMLElements[0]);
    $l("li").attr({"align":"right", "type":"text"});
    $l("li").attr("class", "coooool-class");
    $l("li").addClass("awesome-class");
    $l("li").removeClass("coooool-class");
    // $l("li").empty();
  };

  function DOMNodeCollection (HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  DOMNodeCollection.prototype.html = function (string) {
    if (string === "undefined") {
      return this.HTMLElements[0].innerHTML();
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
    if (value === undefined) {
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
}());
