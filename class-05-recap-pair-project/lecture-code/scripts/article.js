var articles = [];

// article constructor
function Article (opts) {
    this.author = opts.author;
    this.authorUrl = opts.authorUrl;
    this.title = opts.title;
    this.category = opts.category;
    this.body = opts.body;
    this.publishedOn = opts.publishedOn;
}

// convert article object's properties to an "HTML snippet"
Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());//fnction with template attached, so it will read {{}}} keywords
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishedStatus = this.publishedOn ? 'published' + this.daysAgo + 'days ago' : '(draft)';
  this.body = marked(this.body);//markdown to html
  return template(this); //html snippet will be returned
    /* Call Handlebars
       Compute date
       Convert markdown to HTML
       Render "HTML snippet" and return it
    */
};


if (typeof rawData !== 'undefined') {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    articles.push(new Article(ele));
  })
};

articles.forEach(function(a){
  $('#articles').append(a.toHtml())
});
