function crawl(data){

//console.log(data);

//print mark for terminal reference   
console.log('===============================================');  
console.log('1.: Crawling domains...');
console.log('==============================================='); 

//isHTML function to check if body is HTML
var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

//create index array to contain all crawled websites/domains
var index =[];

//limit to query from database
//if you have large datasets this avoids CPU overload
//automatic pagination
var limit = 25000 ;

//check offset
if(data == 'null' || data == null || data == undefined ||data == 'undefined'){

  //empty means we are starting page 1
var page = 1;

}else{

  //not empty means the crawler has begun
var page = data.next_page;

}

//current offset
var offset = (limit * page) - limit;

//current page
var current_page = page;

//pages
var next_page = 1 + parseInt(current_page);

//next offset
var next_offset = (limit * next_page) - limit;

//query
//var text = "SELECT * FROM domains ORDER BY id DESC LIMIT "+limit+" OFFSET "+offset+";";

//loop
pool.query("SELECT * FROM domains ORDER BY id ASC LIMIT "+limit+" OFFSET "+offset+"", (err, res) => {//get the .com first

if(err){

console.log(err);

}else{

//console.log(res.rows);

//get domains
var domains = res.rows;

//count
var expecting = domains.length;


//loop
domains.forEach(function(dm){

//calculate quality of website
var indexScore = 0;

//crawl
//get url
var url = 'http://'+dm.info.domain;

//request
var request;
var status;

//fetch
fetch(url, {
method: "GET",
}).then(function(response){

if (!response.ok) {

return Promise.reject(response);

}else{

//response
var html = response.text();
status = response.status; 
request = response;

//return
return html;
}


})
.then(function(res) {


if(status === 200){   

//response html    
var html = res;

//jquery
let $ = cheerio.load(html);

//variables
var hostname = dm.info.domain;
var http_url = url;
var https_url = 'https://'+dm.info.domain;
var date_created =date_now;
var content_language = '';
var protocol = '';

//meta tags
var title = $('meta[name=title]').attr('content');
if(title == undefined || title == 'undefined'){
title = $('title').text();
}else{
title = title;
//add 10
indexScore=indexScore+10;
}
var description = $('meta[name=description]').attr('content');
if(description !='' || description != undefined || description != 'undefined'){
//add 10
indexScore=indexScore+10;
}
var keywords = $('meta[name=keywords]').attr('content');
if(keywords !='' || keywords != undefined || keywords != 'undefined'){
//add 10
indexScore=indexScore+10;
}
var author = $('meta[name=author]').attr('content');
if(author !='' || author != undefined || author != 'undefined'){
//add 10
indexScore=indexScore+10;
}
var type = $('meta[http-equiv=content-type]').attr('content');
if(type !='' || type != undefined || type != 'undefined'){
//add 10
indexScore=indexScore+10;
}
var favicon = $('link[rel="shortcut icon"]').attr('href');
if(favicon !='' || favicon != undefined || favicon != 'undefined'){
//add 10
indexScore=indexScore+10;
}
var favicon_2 = $('link[rel="fluid-icon"]').attr('href');
if(favicon_2 !='' || favicon_2 != undefined || favicon_2 != 'undefined'){
//add 10
indexScore=indexScore+10;
}
//open graph meta tags
var og_title = $('meta[name=og:title]').attr('content');
var og_type = $('meta[name=og:type]').attr('content');
var og_url = $('meta[name=og:url]').attr('content');
var og_image = $('meta[name=og:image]').attr('content');
var og_site_name = $('meta[name=og:site_name]').attr('content');
var og_description = $('meta[name=og:description]').attr('content');

//declare array of images
var images = [];

//get images
$("img").each(function() {

//variables
var img_alt = $(this).attr("alt");
var img_url = $(this).attr("src");

var image ={
alt : img_alt,
url : img_url,
type : "image"
}

//push to array of images
images.push(image)

});

//check images array lenght
if(images.length >= 1){
//add 10
indexScore=indexScore+10;
}

//get text
var innerHTML = [];

//get divs
$('div').each(function(){

//variables
var div_text = $(this).text();

var div = {

type : 'div',
content : div_text,
}


//push div
innerHTML.push(div);

})

//check innerHTML 
if(innerHTML.length >= 1){
//add 10
indexScore=indexScore+10;
}

//get links
var deepLinks = [];

$('a').each(function(){

//variables
var title = $(this).attr('title');
var href = $(this).attr('href');
var text = $(this).text();

//link url
var link = {
title : title,
text : text,
href : href
}

//push
deepLinks.push(link);

})

//check links
if(deepLinks.length >= 1){
//add 10
indexScore=indexScore+10;
}

//create index site
var site = {
  score : indexScore,//
page : current_page,
offset : offset,    
per_page : limit,
site_name : hostname,
https_url : https_url,
http_url : http_url,
type : type,
category : "",//ecommerce, static, news etc
industry : "",//technology, restaurant etc
timestamp : timestamp,
date_created :date_created,
headers :{
content_language : content_language,
protocol : protocol,
},
metas : [
{
favicon : favicon,
favicon_2 : favicon_2,
title :title,
description : description,
keywords :keywords,
author : author,
}
],
open_graph : [
{
og_title :og_title,
og_type :og_type,
og_url :og_url,
og_image :og_image,
og_site_name :og_site_name,
og_description : og_description,
}
],
deepLinks: [deepLinks],
innerHTML: [innerHTML],
images : [images],
videos : []

}

console.log(site);

//push to array of indexes
index.push(site);

}else{

//variables
var hostname = dm.info.domain;
var http_url = url;
var https_url = 'https://'+dm.info.domain;


//create index site
var site = {
    score : 0,//
page : current_page,
offset : offset,    
per_page : limit,
site_name : hostname,
https_url : https_url,
http_url : http_url,
type : '',
category : "",//ecommerce, static, news etc
industry : "",//technology, restaurant etc
timestamp : timestamp,
date_created :date_now,
headers :{
content_language : '',
protocol : '',
},
metas : [
{
favicon : '',
favicon_2 : '',
title :'',
description : '',
keywords :'',
author : '',
}
],
open_graph : [
{
og_title :'',
og_type :'',
og_url :'',
og_image :'',
og_site_name :'',
og_description :'',
}
],
innerHTML: [],
images : [],
videos : []

}

console.log(site);

//push to array of indexes
index.push(site);

}

//when iteration done
if (--expecting === 0) {

//done
//print mark
console.log('=========================================================================='); 
console.log(':..: END <> done crawling domains on page '+page+' at offset ' + offset +'');
console.log('=========================================================================='); 

console.log(index);

//insert

insertCrawl(
{
offset : offset,
next_offset : next_offset,
current_page : page,
next_page : next_page,
limit : limit,
websites : index

}
);


}

})
.catch((error) => {

console.error('Error:', error);

//when iteration done
if (--expecting === 0) {

//done
//print mark
console.log('=========================================================================='); 
console.log(':..: END <> done crawling domains on page '+page+' at offset ' + offset +'');
console.log('=========================================================================='); 

console.log(index);

//insert

insertCrawl(
{
offset : offset,
next_offset : next_offset,
current_page : page,
next_page : next_page,
limit : limit,
websites : index

}
);


}

});





});

}



})




}crawl();
