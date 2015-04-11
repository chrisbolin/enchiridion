var aboutLink = document.getElementById('about-link');
var aboutBox = document.getElementById('about-box');
var aboutClose = document.getElementById('about-close');

aboutLink.onclick = function(){
  if (aboutBox.className === 'shown'){
    aboutBox.className = 'hidden';  
  } else {
    aboutBox.className = 'shown';  
  }
  ;
};

aboutClose.onclick = function(){
  aboutBox.className = 'hidden';
};
