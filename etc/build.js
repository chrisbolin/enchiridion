// node.js builder for book's HTML

var fs = require('fs');

var contentPath = __dirname + '/../enchiridion.txt';
var templatePath = __dirname + '/index.template.html';
var outputPath = __dirname + '/../index.html';
var encoding = 'utf8';

var build = function(){
  var content = buildContent();
  var index = buildIndex(content);
  fs.writeFileSync(outputPath, index, encoding);
  console.info('built: ', outputPath);
};

var buildContent = function(){
  var text = fs.readFileSync(contentPath, encoding);

  // basic paragraph handling
  text = '<p>' + text + '</p>'; // wrap in <p>
  text = text.replace(/\n\n/g,'</p>\n<p>'); // double return -> new <p> 
  
  // numbered headers
  text = text.replace(/<p>(\d+\.)/g, '<p><span class="mini-header">$1</span>'); // bold numbered headers
  
  // micro-markdown
  text = text.replace(/<p># (.*?)<\/p>/g, '<h1>$1</h1>'); // make h1 headers
  text = text.replace(/<p>## (.*?)<\/p>/g, '<h2>$1</h2>'); // make h1 headers
  text = text.replace(/<p>### (.*?)<\/p>/g, '<h3>$1</h3>'); // make h1 headers
  text = text.replace(/<p>-{3,}<\/p>/g, '<hr>'); // make h1 headers

  return text;
};

var buildIndex = function(content){
  var template = fs.readFileSync(templatePath).toString();
  var contentTag = '{{content}}';
  return template.replace(contentTag, content);
};

build();
