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
  
  // numbered headers and dividers
  var numberedHeaderTemplate = '<p><span class="mini-header">$1</span>';
  var dividerTemplate = '<div class="divider"></div>';
  text = text.replace(/<p>(\d+\.)/g, dividerTemplate + numberedHeaderTemplate); // bold numbered headers
  text = text.replace(dividerTemplate, ''); // remove first divider

  return text;
};

var buildIndex = function(content){
  var index = fs.readFileSync(templatePath).toString();
  
  // insert content
  var contentTag = '{{content}}';
  index = index.replace(contentTag, content);
  
  // insert timestamps
  var timestampTagPattern = /{{timestamp}}/g;
  index = index.replace(timestampTagPattern, Date.now());

  return index;
};

build();
