var text = '';

var init = function(){
  var request = new XMLHttpRequest();
  request.open('GET', '/enchiridion.txt');
  request.onreadystatechange = function() {
    text = request.responseText;
    renderPage();
  }
  request.send();
};

var renderPage = function(){
  var page = document.getElementById('page');
  page.innerHTML = prepareText();
};

var prepareText = function(){
  var pageText = text;
  pageText = '<p>' + pageText + '</p>'; // wrap in <p>
  pageText = pageText.replace(/\n\n/g,'</p><p>'); // double return -> new <p> 
  return pageText;
};

init();
