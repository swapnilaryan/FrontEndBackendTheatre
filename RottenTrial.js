/**
 * Created by !!.Swapnil..Aryan.!! on 11-Apr-16.
 */
var RottenCrawler = require('./RottenCrawler.js');
console.log(RottenCrawler);
 var rc = new RottenCrawler('/m/zoolander_2/');
 console.log(rc);
 rc.getMovieInfo()
     .then(function() {
         console.log(rc);
     });
   console.log("Hello");