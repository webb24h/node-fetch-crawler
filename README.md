# node-fetch-crawler
I spent great deal online looking for web crawlers and web scrapers whatnot. Tried many solutions ranging from axio, cheerio to puppeteer. Whilst they all kind of worked, they all broke when faced errors. After many tears, I decided to build my own Web Crawler with Node-Fetch.It is far from being as robust and fast as scrapy.py but it works with Node and wont break.

<h3> Notes </h3>

I'm running Ubuntu but if you are on Windows or Mac, steps are similir.

<h3> Prerequesites </h3>

A list of domains stored in your database

<h3> Libraries </h3>

    - Node-Fetch
    - Cheerio
    - Postgres


<h3> Install Node-Fetch </h3>

    npm install node-fetch
    

<h3> Install Cheerio </h3>

    npm install cheerio
    

<h3> Install Postgres </h3>

    sudo apt install postgresql

> Notes : for more details on how to install Postgres and run a server read good tutorial on StackOverflow <a href="https://stackoverflow.com/questions/53267642/create-new-local-server-in-pgadmin/66489652#66489652"> here </a>

<h3> Getting Started </h3>

Download or copy crawl.js and insertCrawl.js.

Pop a terminal open and type in

    node crawl.js


Let the magic unfold! Just sit back and watch your terminal work until you're done crawling everything.
