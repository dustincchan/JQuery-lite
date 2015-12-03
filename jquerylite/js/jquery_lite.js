(function() {
  'use strict';
  function $l(element){
    var nodelist = document.querySelectorAll(element);
    var nodeArray = [];
    for(var i = 0; i < nodelist.length; i++){
      nodeArray[i] = nodelist[i];
    }
    console.log(nodeArray);
  }
  window.onload = function(){
    $l("li");
  };
}());
