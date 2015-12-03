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
    $l("li").append(kyle);
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
      this.html(contents);
    } else if(contents instanceof DOMNodeCollection) {
      console.log("DOM NODE COLLECTION");
    } else {
      console.log("NETIHER");
    }
  };

}());
