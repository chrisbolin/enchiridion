var aboutLink = document.getElementById('about-link');
var aboutBox = document.getElementById('about-box');
var aboutClose = document.getElementById('about-close');

Object.prototype.hide = function(){
  this.className = this.className.replace('shown','hidden');
};

Object.prototype.show = function(){
  this.className = this.className.replace('hidden','shown');
};

Object.prototype.isHidden = function(){
  return this.className.indexOf('hidden') >= 0;
};

var showHideAboutBox = function(){
  if (aboutBox.isHidden()){
    aboutBox.show();
  } else {
    aboutBox.hide();
  }
};

aboutLink.onclick = showHideAboutBox;
aboutClose.onclick = showHideAboutBox;
