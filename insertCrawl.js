function insertCrawl(data){


console.log('=========================================================================='); 
console.log('2.: START <> inserting crawl from page '+data.current_page+' at offset ' + data.offset +'');
console.log('=========================================================================='); 

//websites
var websites = data.websites;

//insert
//count
var expecting = websites.length;

if (websites.length === 0) {

//crawl
crawl(
{
offset : data.offset,
next_offset : data.next_offset,
current_page : data.current_page,
next_page : data.next_page,
limit : data.limit,

}
);
}else{

//loop
websites.forEach(function(dm){

//insert in database
var txt = "INSERT INTO websites(info) VALUES($1) RETURNING*";
var values = [JSON.stringify(dm)];
pool.query(txt, values, function(err,res){

if(err){
console.log(err)
}else{

//print rows
console.log(res.rows);

//resolve?
//when iteration done
if (--expecting === 0) {

//crawl
crawl(
{
offset : data.offset,
next_offset : data.next_offset,
current_page : data.current_page,
next_page : data.next_page,
limit : data.limit,

}
);


}
}

})

})

}
}
