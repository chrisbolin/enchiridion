// node.js builder for book's HTML

var fs = require('fs');

var inpath = __dirname + '/../enchiridion.txt';
var outpath = __dirname + '/enchiridion.out.html';
var encoding = 'utf8';

var build = function(){
  var text = fs.readFileSync(inpath, encoding);
  text = '<p>' + text + '</p>'; // wrap in <p>
  text = text.replace(/\n\n/g,'</p>\n<p>'); // double return -> new <p> 
  text = text.replace(/<p>(\d+\.)/g, '<p><span class="mini-header">$1</span>'); // bold numbered headers

  fs.writeFileSync(outpath, text, encoding);
};

build();
