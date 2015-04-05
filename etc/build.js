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

  // remove comments
  text = text.replace(/^#.*\n/gm, '');

  // trim whitespace
  text = text.replace(/^\s+/g, '');

  // basic paragraph handling
  text = '<p>' + text + '</p>'; // wrap in <p>
  text = text.replace(/\n\n/g,'</p>\n<p>'); // double return -> new <p> 
  
  // numbered headers
  text = text.replace(/<p>(\d+\.)/g, '<p><span class="mini-header">$1</span>'); // bold numbered headers
  
  return text;
};

var buildIndex = function(content){
  var template = fs.readFileSync(templatePath).toString();
  var contentTag = '{{content}}';
  return template.replace(contentTag, content);
};

build();
