var rp = require('request-promise'),
    cheerio = require('cheerio');
var mysql = require("mysql");
var imdb_id = "";

var connection = "";
var pool = "";
var RottenCrawler = function(movieURL) {
    var rc = this;
    rc.apiKey = "2c9306d42037dfb0de0fc3f153819054";
    rc.movieURL = movieURL || "";
    rc.movieResponse = {
        "movieInfo": [],
        "movieCredits": [],
        "omdbData": []
    };
    console.log("API Key",movieURL,rc.apiKey);
    return rc;
};

RottenCrawler.prototype.getConnection = function(conn,p){
    connection = conn;
    pool = p;
    return connection;
};
RottenCrawler.prototype.theMovieDB = function() {
    var rc = this;
    var date = new Date();
    var year = date.getFullYear();
    //console.log(year);
    return rp('http://api.themoviedb.org/3/search/movie?api_key='+rc.apiKey+"&query="+rc.movieURL+"&year="+year)
        .then(function(response){
            rc.response = JSON.parse(response).results[0].id;
            //console.log(rc);
            //get Details via id in movie apiary
            return rp('http://api.themoviedb.org/3/movie/'+rc.response+'?api_key='+rc.apiKey)
            .then(function(res){
                rc.movieResponse["movieInfo"].push(JSON.parse(res));
              console.log(rc.movieResponse["movieInfo"]);
                imdb_id = JSON.parse(res).imdb_id;
                //console.log("--",JSON.parse(res).imdb_id);
                return rp('http://api.themoviedb.org/3/movie/'+rc.response+'/credits?api_key='+rc.apiKey)
                    .then(function(r){
                        rc.movieResponse["movieCredits"].push(JSON.parse(r));
                        return rp("http://www.omdbapi.com/?i="+imdb_id+"&plot=full&r=json&tomatoes=true")
                            .then(function(r){
                                rc.movieResponse["omdbData"].push(JSON.parse(r));
                                console.log(rc["movieResponse"],rc["movieCredits"],rc["omdbData"]);
                            });
                    });
            });
        })
        .catch(function(err){
            console.log(err);
        });
};
RottenCrawler.prototype.getMovieInfo = function(data) {
    var rc = this;
    rc.crawlTomato = {};
  return rp('http://www.rottentomatoes.com' + rc.movieURL)
        .then(function(response) {
            //console.log(rc.movieURL);
            var $ = cheerio.load(response);

            var ratingRegex = /(\d+)?(.)?\d+\/\d+$/;

            rc.crawlTomato["movieTitle"] = (rc.movieTitle = $('#movie-title').clone().find('span').remove().end().text().trim());

            rc.crawlTomato["releaseYear"] = (rc.releaseYear = parseInt(/\d+/.exec($('#movie-title').text())[0]));

            rc.crawlTomato["allCritics"] = (rc.allCritics = {
                freshness: $('#all-critics-numbers .meter-tomato').hasClass('fresh') ? 'fresh' : 'rotten',
                tomatometer: parseInt($('#all-critics-numbers .meter-value span').text()),
                averageRating: $('#all-critics-numbers #scoreStats > div:first-of-type').text().trim().match(ratingRegex)[0].trim(),
                reviewCount: parseInt($('#all-critics-numbers #scoreStats span[itemprop*=reviewCount]').text().trim()),
                freshCount: parseInt(/\d+$/.exec($('#all-critics-numbers #scoreStats > div:nth-of-type(3)').text().trim())[0]),
                rottenCount: parseInt(/\d+$/.exec($('#all-critics-numbers #scoreStats > div:nth-of-type(4)').text().trim())[0]),
                criticsConsensus: $('#all-critics-numbers .critic_consensus').clone().find('span').remove().end().text().trim()
            });
//                 reviewCount: parseInt($('#top-critics-numbers #scoreStats span[itemprop*=reviewCount]').text().trim()),

            if ($('#top-critics-numbers .meter-value').length)

            rc.crawlTomato["topCritics"] = (rc.topCritics = {
                freshness: $('#top-critics-numbers .meter-tomato').hasClass('fresh') ? 'fresh' : 'rotten',
                tomatometer: (parseInt($('#top-critics-numbers .meter-value span').text()))?(parseInt($('#top-critics-numbers .meter-value span').text())):(parseInt(($('#top-critics-numbers .meter-value').text()).replace("%",""))),
                averageRating: $('#top-critics-numbers #scoreStats > div:first-of-type').text().trim().match(ratingRegex)[0].trim(),
                reviewCount: (parseInt($('#top-critics-numbers #scoreStats span[itemprop*=reviewCount]').text().trim()))?(parseInt($('#top-critics-numbers #scoreStats span[itemprop*=reviewCount]').text().trim())):(parseInt( ((($('#top-critics-numbers #scoreStats span')).contents())[2]).data )),
                freshCount: parseInt(/\d+$/.exec($('#top-critics-numbers #scoreStats > div:nth-of-type(3)').text().trim())[0]),
                rottenCount: parseInt(/\d+$/.exec($('#top-critics-numbers #scoreStats > div:nth-of-type(4)').text().trim())[0]),
                criticsConsensus: $('#top-critics-numbers .critic_consensus').clone().find('span').remove().end().text().trim()
            });

            rc.crawlTomato["audienceScore"] = (rc.audienceScore = {
                tomatometer: /\d+/.exec($('.audience-score .meter-value span').text())[0],
                averageRating: $('.audience-info > div:first-of-type').text().trim().match(ratingRegex)[0].trim(),
                ratingCount: parseInt(/((\d+)?(\,)?)*\d+$/.exec($('.audience-info > div:last-of-type').text().trim())[0].replace(',', ''))
            });

            rc.crawlTomato["movieDes"] = (rc.movieDes = $('#movieSynopsis').text().trim());

            rc.crawlTomato["genre"] = (rc.genre = $('.movie_info .content_body table.info td:contains("Genre")').next('td').text().trim().split(', '));

            rc.crawlTomato["boxOffice"] = (rc.boxOffice = $('.movie_info .content_body table.info td:contains("Box Office")').next('td').text().trim() || "unknown");
        })
        .then(function(){
            //console.log(rc.crawlTomato,imdb_id);
            /*Here We will add the tomato data to the database*/
            var query = "INSERT INTO ?? (??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?)";
            var table = [   "admin_movietomatoes",
                "mtImdbID", "mtMovieTitle","mtAllCritics","mtTopCritics",
                "mtAudienceScore","mtMovieDescription","mtGenre",
                imdb_id,rc.crawlTomato["movieTitle"],JSON.stringify(rc.crawlTomato["allCritics"]),
                JSON.stringify(rc.crawlTomato["topCritics"]),JSON.stringify(rc.crawlTomato["audienceScore"]),
                rc.crawlTomato["movieDes"],JSON.stringify(rc.crawlTomato["genre"])];
            // pool.getConnection(function(err,connection) {
            //     if (err) {
            //         console.log("Error happened :- ", err);
            //         self.connectMysql();
            //     } else {
            //         query = mysql.format(query, table);
            //         connection.query(query, function (err, rows) {
            //             if (pool._freeConnections.indexOf(connection) == -1) {
            //                 connection.release();
            //             }
            //             if (err) {
            //                 console.log("Error executing MySQL query", err);
            //             } else {
            //                 console.log("Success", "Data Inserted");
            //             }
            //         });
            //     }
            //     connection.release();
            // });
            /*End Adding tomato data to the database*/
            console.log("After everything");
        })
        .catch(function(err) {
          //console.log("err");s
            console.log(err);
        });
};

RottenCrawler.prototype.getCriticsInfo = function() {
    var rc = this;

    return rp('http://www.rottentomatoes.com' + rc.movieURL)
        .then(function(response) {
            rc.critics = [];
        })
        .then(function() {
            return rc.getAllCritics();
        })
        .catch(function(err) {
            //console.log("err");
            console.log(err);
        });
};

RottenCrawler.prototype.getCritics = function(url) {
    var rc = this;

    return rp(url)
        .then(function(response) {
            var $ = cheerio.load(response);

            var nextURL = $('.content > div:first-child a:last-child').attr("href");

            var newReviews = $('.review_table_row').toArray().map(function(review) {
                var scoreRegex = /Original Score: (.*)$/;
                var score = scoreRegex.exec($(review).find('.review_desc .subtle').text());

                return {
                    criticName: $(review).find('.critic_name a').text().trim(),
                    criticTitle: $(review).find('.critic_name .subtle').text().trim(),
                    isTopCritic: $(review).find('.top_critic').has('div').length ? true : false,
                    tomatometer: $(review).find('.review_icon').hasClass('rotten') ? 'rotten' : 'fresh',
                    reviewDate: $(review).find('.review_date').text().trim(),
                    review: $(review).find('.the_review').text().trim(),
                    fullReview: $(review).find('.review_desc .subtle a').attr('href'),
                    originalScore: score && score.length === 2 ? score[1] : 'unknown'
                };
            });

            rc.critics = rc.critics.concat(newReviews);

            //if (nextURL != '#')
            //    return rc.getCritics('http://www.rottentomatoes.com' + nextURL);
        });
};

RottenCrawler.prototype.getAllCritics = function() {
    var rc = this;

    return rc.getCritics('http://www.rottentomatoes.com' + rc.movieURL + 'reviews/')
        .then(function() {
            // console.log(rc.critics);
        });
};


RottenCrawler.prototype.getReviews = function(url) {
    var rc = this;

    return rp(url)
        .then(function(response) {
            var $ = cheerio.load(response);

            var nextURL = $('#reviews > div:last-of-type > a:last-of-type').attr("href");
            if (!nextURL) return;

            var newReviews = $('.review_table_row').toArray().map(function(review) {
                var score = $(review).find('.user_review .scoreWrapper span').attr('class').trim();
                if (score === "wts") return null;

                return {
                    reviewName: $(review).find('div:first-of-type div:last-of-type a').text().trim(),
                    isSuperReviewer: $(review).find('.top_critic').has('div').length ? true : false,
                    score: parseInt(score) || 0,
                    reviewDate: $(review).find('> div:last-of-type > span.subtle').text().trim(),
                    review: $(review).find('.user_review').text().trim()
                };
            });

            newReviews = newReviews.filter(function(review) {
                return review;
            });

            rc.reviews = rc.reviews.concat(newReviews);

            if (nextURL != '#')
                return rc.getReviews('http://www.rottentomatoes.com' + nextURL);
        });
};

module.exports = RottenCrawler;
