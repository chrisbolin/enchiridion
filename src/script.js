var text = '';
var state = {};

var init = function(){
  downloadText();
};

var downloadText = function(){
  var request = new XMLHttpRequest();
  request.open('GET', '/enchiridion.txt');
  request.onreadystatechange = function() {
    text = request.responseText;
    renderPage();
  }
  request.send();
};

var renderPage = function(){
  var page = document.getElementById('page-text');
  page.innerHTML = prepareText();
};

var prepareText = function(){
  var hashNumber = parseInt(location.hash.substr(1));
  state.start =  (hashNumber > 0)? hashNumber : 0;
  state.offset = 600;
  
  var pageText = text.substring(state.start, state.start + state.offset);
  pageText = '<p>' + pageText + '</p>'; // wrap in <p>
  pageText = pageText.replace(/\n\n/g,'</p><p>'); // double return -> new <p> 
  
  return pageText;
};

var flipPage = function(back){
  var direction = back? -1 : 1;
  var newState = state.start + direction * state.offset;
  if (newState < 0) {
    newState = 0;
  }
  location.hash = '#' + newState;
};

document.getElementById('forward-button').addEventListener('click', function() {
  flipPage();
}, false);

document.getElementById('back-button').addEventListener('click', function() {
  flipPage(true);
}, false);

window.addEventListener('hashchange', function(){
  renderPage();
}, false);

window.addEventListener('keydown', function(e){
  e = e || window.event;

  if (e.keyCode == '37') {
     flipPage(true); // left arrow --> back
  } else if (e.keyCode == '39') {
     flipPage(); // right arrow --> forward
  }
}, false);

init();
