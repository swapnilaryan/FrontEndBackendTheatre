"use strict";angular.module("backendTheatreApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ui.router"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main",resolve:{nowShowingInTheatres:["nowShowing",function(a){return a.nowShowingMovies()}],upcomingMovies:["upcomingMovies",function(a){return a.upcoming()}]}}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/moviedetails",{templateUrl:"views/moviedetails.html",controller:"MoviedetailsCtrl",controllerAS:"moviedetails",resolve:{movieTomatoDetails:["movieDetails",function(a){return a.getTomatoResult()}],movieInfoDetails:["movieDetails",function(a){return a.getMovieInfo()}]}}).otherwise({redirectTo:"/"})}]),angular.module("backendTheatreApp").controller("MainCtrl",["$scope","$location","searchMovieText","nowShowingInTheatres","upcomingMovies",function(a,b,c,d,e){console.log(d),console.log(e),a.slide_index=0,a.slide_left=function(){a.slide_index-4<=0?(a.slide_index=0,a.movieNowShowing=d.slice(0,4)):(a.slide_index-=4,a.movieNowShowing=d.slice(a.slide_index,a.slide_index+4))},a.slide_right=function(){a.slide_index+4>=d.length?(a.slide_index=d.length-4,a.movieNowShowing=d.slice(a.slide_index,d.length)):(a.slide_index=a.slide_index+4,a.slide_index+4>=d.length?(a.slide_index=d.length-4,a.movieNowShowing=d.slice(a.slide_index,d.length)):a.movieNowShowing=d.slice(a.slide_index,a.slide_index+4))},a.slide_left(),a.slide_index_upcoming=0,a.slide_left_upcoming=function(){a.slide_index_upcoming-5<=0?(a.slide_index_upcoming=0,a.movieComingSoon=e.slice(0,5)):(a.slide_index_upcoming-=5,a.movieComingSoon=e.slice(a.slide_index_upcoming,a.slide_index_upcoming+5))},a.slide_right_upcoming=function(){a.slide_index_upcoming+5>=e.length?(a.slide_index_upcoming=e.length-5,a.movieComingSoon=e.slice(a.slide_index_upcoming,e.length)):(a.slide_index_upcoming=a.slide_index_upcoming+5,a.slide_index_upcoming+5>=e.length?(a.slide_index_upcoming=e.length-5,a.movieComingSoon=e.slice(a.slide_index_upcoming,e.length)):a.movieComingSoon=e.slice(a.slide_index_upcoming,a.slide_index_upcoming+5))},a.slide_left_upcoming(),a.images="../images/add_to_cart_button.png",a.moreInfo=function(a){c.set(a),b.url("/moviedetails"),console.log("----------------------",a)},a.list_show_none=["1:35 pm","4:00 pm","6:35 pm","9:15 pm"],a.list_now_showing=[{image:"../images/img1.png"},{image:"../images/img2.png"},{image:"../images/img3.png"},{image:"../images/img1.png"}]}]),angular.module("backendTheatreApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("backendTheatreApp").directive("addToCart",function(){return{restrict:"E",template:'<a ng-href=\'#/moviedetails\'><img src="/images/add_to_cart_button.png" class="align_add_to_cart"  ></a>'}}),angular.module("backendTheatreApp").controller("IndexCtrl",["$scope","$window","movieTomato","searchMovieText","$location","$uibModalInstance",function(a,b,c,d,e,f){a.close=function(){f.close()},a.movieToSearch="",a.searchMovies=function(b){a.movieToSearch=b,d.set(a.movieToSearch),console.log("Movie entered",a.movieToSearch),a.close(),a.redirect=function(){e.url("/moviedetails")},a.redirect()}}]),angular.module("backendTheatreApp").controller("SearchmodalCtrl",["$scope","$uibModal",function(a,b){a.open=function(a){console.log(a),b.open({templateUrl:"/views/searchmodal.html",controller:"IndexCtrl",size:a})}}]),angular.module("backendTheatreApp").factory("searchMovieText",function(){var a={};return a.obj="",a.obj1="",a.set=function(b){a.obj=b,console.log("Obj set is",a.obj)},a.get=function(){return a.obj},a}).factory("upcomingMovies",["$q","$http","apiKey",function(a,b,c){return{upcoming:function(){var d=a.defer();return console.log("api is ",c.apiUrlFn()),b.get(""+c.apiUrlFn()+"db/upcoming").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]).factory("nowShowing",["$q","$http","apiKey",function(a,b,c){return{nowShowingMovies:function(){var d=a.defer();return console.log("api is ",c.apiUrlFn()),b.get(""+c.apiUrlFn()+"db/nowShowing").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]).factory("movieDetails",["$q","$http","apiKey","searchMovieText",function(a,b,c,d){var e="99888";return{getTomatoResult:function(){var f=a.defer();return console.log("api is ",c.apiUrlFn()),e=d.get(),console.log("getted id is ",e),b.get(""+c.apiUrlFn()+"db/rottenTomatoes/"+e).success(function(a){f.resolve(a)}).error(function(a){f.reject(a)}),f.promise},getMovieInfo:function(){var d=a.defer();return b.get(""+c.apiUrlFn()+"/db/movieinfo/"+e).success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]).factory("movieApiaryInfo",["$q","$http","apiKey","searchMovieText",function(a,b,c,d){var e="",f="",g="";return{getSearchDetails:function(){var h=a.defer();return b.get(""+c.movieApiUrl+"search/movie?api_key="+c.key+"&query="+d.get()+"&year=2016").success(function(a){e=a.results[0].id,f=a.results[0].title,g=a.results[0].imdb_id,h.resolve(a,e,g)}).error(function(a){h.reject(a)}),h.promise},getMovieById:function(d){var e=a.defer(),f="";return b.get(""+c.movieApiUrl+"movie/"+d+"?api_key="+c.key).success(function(a){f=a,e.resolve(a)}).error(function(a){console.log("error",a),f=a,e.reject(a)}),e.promise},getTomatoResult1:function(c){var d=a.defer();return console.log("omdb movie title",f,e),b.get("http://www.omdbapi.com/?i="+c+"&year=2016&plot=full&r=json&tomatoes=true").success(function(a){d.resolve(a)}).error(function(a){d.reject(a)}),d.promise}}}]),angular.module("backendTheatreApp").controller("MoviedetailsCtrl",["$sce","$http","$route","$uibModal","$location","apiKey","$q","$scope","movieTomatoDetails","movieInfoDetails",function(a,b,c,d,e,f,g,h,i,j){console.log(i),console.log(j),h.displayTomatoData={},h.displayTomatoData.imdbID=i.mtImdbID,h.displayTomatoData.movieDescription=i.mtMovieDescription,h.displayTomatoData.movieTitle=i.mtMovieTitle,h.displayTomatoData.allCritics=JSON.parse(i.mtAllCritics),h.displayTomatoData.topCritics=JSON.parse(i.mtTopCritics),h.displayTomatoData.audienceScore=JSON.parse(i.mtAudienceScore),h.displayTomatoData.genre=JSON.parse(i.mtGenre),h.displayMovieDetails=j,h.displayMovieDetails.infoMovieRuntime=parseInt(h.displayMovieDetails.infoMovieRuntime.replace("min",""));var k=h.displayMovieDetails.infoMovieRuntime,l=Math.trunc(k/60),m=k%60;h.displayMovieDetails.infoMovieRuntime=""+l+" hr."+m+" min",h.displayMovieDetails.infoMoviePosterPath=h.displayMovieDetails.infoMoviePosterPath.replace("./app",".."),h.displayMovieDetails.releaseYear=h.displayMovieDetails.infoMovieInTheatres.substr(h.displayMovieDetails.infoMovieInTheatres.length-4),console.log(h.displayMovieDetails);var n=h.displayTomatoData.allCritics.tomatometer;n>=60&&75>n?h.displayTomatoData.allCritics.tomatoImage="../images/rt_fresh.jpg":59>=n?h.displayTomatoData.allCritics.tomatoImage="../images/rt_rotten.jpg":h.displayTomatoData.allCritics.tomatoImage="../images/rt_certified.jpg";var o=h.displayTomatoData.topCritics.tomatometer;o>=60&&75>o?h.displayTomatoData.topCritics.tomatoImage="../images/rt_fresh.jpg":59>=o?h.displayTomatoData.topCritics.tomatoImage="../images/rt_rotten.jpg":h.displayTomatoData.topCritics.tomatoImage="../images/rt_certified.jpg",h.allBoldOrNormal="criticsLink",h.topBoldOrNormal="criticsLink",h.click=function(a){"all"==a?(h.tomatoMeter=h.displayTomatoData.allCritics,h.allBoldOrNormal="criticsLinkTextBold",h.topBoldOrNormal="criticsLink"):(h.tomatoMeter=h.displayTomatoData.topCritics,h.allBoldOrNormal="criticsLink",h.topBoldOrNormal="criticsLinkTextBold")},h.click("all");var p=h.displayTomatoData.audienceScore.averageRating;p=parseInt(p.replace("/5","")),p>=3.5?h.displayTomatoData.audienceScore.audienceImage="../images/rt_user_likes.jpg":3.5>p&&(h.displayTomatoData.audienceScore.audienceImage="../images/rt_user_dislike.jpg"),h.audienceScore=h.displayTomatoData.audienceScore,h.audienceScore.ratingCount=h.audienceScore.ratingCount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"),console.log(h.displayTomatoData),h.totalCasts=JSON.parse(h.displayMovieDetails.infoMovieCasts);for(var q=0;q<h.totalCasts.length;q++)null==h.totalCasts[q].profile_path?h.totalCasts[q].profile_path="../images/credits/image_not_found.jpg":h.totalCasts[q].profile_path="../images/credits"+h.totalCasts[q].profile_path;h.show6CastsFunction=function(){h.show6Casts={};for(var a=0;6>a;a++)h.show6Casts[a]=h.totalCasts[a]},h.show6CastsFunction(),h.show6Casts={};for(var r=0;6>r;r++)h.show6Casts[r]=h.totalCasts[r];h.ngShowAllText=!0,h.show6CastsText=!0,h.showAll=function(a){h.show6Casts=h.totalCasts,h.ngShowAllText=!a,1==h.ngShowAllText&&h.show6CastsFunction()},h.displayTomatoData.trailer="https://www.youtube.com/results?search_query="+h.displayTomatoData.movieTitle+"+trailer",h.trustSrc=function(b){return console.log(b),a.trustAsResourceUrl("https://www.youtube.com/embed?listType=search&amp;list="+b+"+Trailer")},a.trustAsResourceUrl(h.displayTomatoData.trailer)}]),angular.module("backendTheatreApp").service("apiKey",["$location",function(a){var b="";return{key:"2c9306d42037dfb0de0fc3f153819054",movieApiUrl:"http://api.themoviedb.org/3/",apiUrlFn:function(){return b="localhost"==a.host()?"http://localhost:8000/api/":"http://cinestar.affpc.com:8080/api/"}}}]),angular.module("backendTheatreApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="row&quot;"> <div class="col-md-12" id="main_view"> <div class="row"> <div class="container"> <div class="col-md-1" id="top-angle-left"> <p><a ng-href=""><span ng-click="slide_left()" class="glyphicon glyphicon-menu-left"></span></a></p> </div> <div class="col-md-10"> <div class="col-md-4" id="left_banner_now_showing"></div> <div class="col-md-4" id="now_showing_text">NOW SHOWING</div> <div class="col-md-4" id="right_banner_now_showing"></div> </div> <div class="col-md-1" id="top-angle-right"> <p><span ng-click="slide_right()" class="glyphicon glyphicon-menu-right"></span></p> </div> </div> <div class="container" id="show_list"> <div class="col-md-3 container list_now_showing" ng-repeat="mvs in movieNowShowing"> <div class="wrap_all"> <img class="images" ng-src="{{mvs.infoMoviePosterPath}}"> <div class="all_timings"> <div class="list-show-none"> <span ng-repeat="list_show in mvs.list_show_none">{{list_show}}</span> </div> <div class="list-show-3d"> <span><img ng-src="{{mvs.list_show_3d_image}}"> </span> <span ng-repeat="list_show in mvs.list_show_3d">{{list_show}}</span> </div> <div class="list-show-2d"> <!--<img ng-src="">--> <span><img ng-src="{{mvs.list_show_2d_image}}"></span> <span ng-repeat="list_show in mvs.list_show_2d">{{list_show}}</span> </div> </div> <add-to-cart ng-click="moreInfo(mvs.infoImdbID)" class="align_add_to_cart show-cart"></add-to-cart> </div> </div> </div> </div> <div class="row coming-soon"> <div class="container coming-soon"> <div class="col-md-12"> <div class="col-md-5" id="bottom-angle-left"> <p><span ng-click="slide_left_upcoming()" class="glyphicon glyphicon-menu-left"></span></p> </div> <div class="col-md-2"> <h1 id="coming_soon_text">Coming Soon</h1> </div> <div class="col-md-5" id="bottom-angle-right"> <p><span ng-click="slide_right_upcoming()" class="glyphicon glyphicon-menu-right"></span></p> </div> </div> </div> <div class="container" id="coming-soon"> <div class="col-md-3" id="list_coming_soon" ng-repeat="mcs in movieComingSoon"> <div class="parent"> <div class="imagewrap"> <div class="date_month"> <h1 class="coming_soon_date">{{mcs.date}}</h1> <h1 class="coming_soon_month">{{mcs.month}}</h1> </div> <img class="coming_soon_circle" src="/images/circle.png"> </div> <img class="coming_soon_images" ng-src="{{mcs.upPosterPath}}"> </div> </div> </div> </div> </div> </div>'),a.put("views/moviedetails.html",'<div class="row" data-ng-cloak> <div class="container"> <div class="col-md-8" data-ng-model="displayMovieDetails" ng-cloak> <!--<p>Hello {{movieTomato}}</p>--> <div class="container"> <div class="col-md-4"> <br> <img ng-src="{{displayMovieDetails.infoMoviePosterPath}}" class="mdImage"> </div> <div class="col-md-8" data-ng-model="displayTomatoData"> <div class="movieTitle"><h1>{{displayTomatoData.movieTitle}} ({{displayMovieDetails.releaseYear}})</h1></div> <div class="rottenTomatoesInfo col-md-12"> <div class="col-md-4 scorePanel" ng-model="tomatoMeter"> <h3>TOMATOMETER</h3> <div class="tomatoMeterText"> <img id="tomatoImage" ng-src="{{tomatoMeter.tomatoImage}}"> <span class="tomatoMeterPercentage">{{tomatoMeter.tomatometer}}%</span> </div> <br> <div class="tomatoMeterText">Average Rating: <span class="tomatoMeterTextResults">{{tomatoMeter.averageRating}}</span> </div> <div class="tomatoMeterText">Reviews Counted: <span class="tomatoMeterTextResults">{{tomatoMeter.reviewCount}}</span> </div> <div class="tomatoMeterText">Fresh: <span class="tomatoMeterTextResults">{{tomatoMeter.freshCount}}</span> </div> <div class="tomatoMeterText">Rotten: <span class="tomatoMeterTextResults">{{tomatoMeter.rottenCount}}</span> </div> </div> <div class="col-md-4 scorePanel" id="marginRight"> <br> <div class="shiftRight"> <span class="criticsHead"><a class="{{allBoldOrNormal}}" ng-click="click(\'all\')">All Critics</a></span> <span class="criticsHead">|</span> <span class="criticsHead"><a class="{{topBoldOrNormal}}" ng-click="click(\'top\')">Top Critics</a></span> </div> <br> <!--Progress Bar--> <div class="progress"> <div class="progress-bar" role="progressbar" style="width:0"></div> <div class="progress-bar" role="progressbar" aria-valuenow="{{tomatoMeter.tomatometer}}" aria-valuemin="0" aria-valuemax="100" style="width: {{tomatoMeter.tomatometer}}%"> </div> </div> <p class="criticsConcensus">Critics Consensus:<span class="criticsConcensusInfo">{{tomatoMeter.criticsConsensus}}</span></p> </div> <div class="col-md-4 scorePanel" ng-model="audienceScore"> <h3>AUDIENCE SCORE</h3> <div class="audiencePoint"> <img id="audienceImage" ng-src="{{audienceScore.audienceImage}}"> <span class="tomatoMeterPercentage">{{audienceScore.tomatometer}}%</span> </div> <br> <div class="tomatoMeterText">Average Rating: <span class="tomatoMeterTextResults">{{audienceScore.averageRating}}</span> </div> <div class="tomatoMeterText">User Rating: <span class="tomatoMeterTextResults">{{audienceScore.ratingCount}}</span> </div> </div> </div> </div> </div> <br> <div class="container" ng-model="displayMovieDetails"> <div class="col-md-4"> <p id="showtime">Showtimes</p> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> <div class="col-md-4 showtimeRow1">Timing</div> <div class="col-md-4 showtimeRow1">Adults</div> <div class="col-md-4 showtimeRow1">Kids</div> <div class="col-md-4 showtimeRow2">Timing</div> <div class="col-md-4 showtimeRow2">Adults</div> <div class="col-md-4 showtimeRow2">Kids</div> </div> <div class="col-md-8"> <div class="movieDes">{{displayMovieDetails.infoMovieDescription}}</div> <br> <div class="col-md-4 movieTopic"> <div>Rating:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieRated}}</div> </div> <div class="col-md-4 movieTopic"> <div>Genre:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieGenre}}</div> </div> <div class="col-md-4 movieTopic"> <div>Directed By:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieDirectedBy}}</div> </div> <div class="col-md-4 movieTopic"> <div>Written By:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieWrittenBy}}</div> </div> <div class="col-md-4 movieTopic"> <div>In Theatres:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieInTheatres}}</div> </div> <div class="col-md-4 movieTopic"> <div>Box Office:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieBoxOffice}}</div> </div> <div class="col-md-4 movieTopic"> <div>Run Time:</div> </div> <div class="col-md-8 movieDetails"> <div>{{displayMovieDetails.infoMovieRuntime}}</div> </div> <div class="col-md-8 movieTopic"> <div>{{displayMovieDetails.infoMovieProduction}}: <span><a ng-href="{{displayMovieDetails.infoMovieWebsite}}">Official Site</a> </span> </div> </div> </div> <div class="col-md-4"></div> <div class="col-md-8"><hr></div> </div> </div> <div class="col-md-4 rightPage" data-ng-model="theMovieDbId" ng-cloak> <!--Book tickets , Show trailer, Share on social media--> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial"> BUY TICKETS </button> </div> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial"> SHARE ON <a ng-href="http://www.facebook.com"> <img class="shareSocial" src="/images/shareOnFacebook.png"> </a> <span> <a ng-href="http://www.twitter.com"> <img class="shareSocial" src="/images/shareOnTwitter.png"> </a> </span> </button> </div> <div class="buttonShadow"> <button type="button" class="btn btn-default tickTrailerSocial" data-toggle="modal" data-target="#myModal">WATCH TRAILER</button> </div> </div> </div> <div class="container"> <div class="col-md-3"> <div class="col-md-12"><p id="cast">Cast</p></div> </div> <br> <div class="col-md-12"> <div class="col-md-9" data-ng-model="casts"> <div class="col-md-4 casts" ng-repeat="casts in show6Casts"> <div class="col-md-4 castsImage"> <img ng-src="{{casts.profile_path}}"> </div> <div class="col-md-8"> <p>{{casts.name}}</p> <p class="castCharacter">as {{casts.character}}</p> </div> </div> </div> <div class="col-md-5"> <h6 class="ngShowAllText"> <a class="cursor4ShowAll" ng-if="ngShowAllText==true" ng-click="showAll(ngShowAllText)" ng-if="ngShowAllText==true"> Show More Cast <span class="glyphicon glyphicon-triangle-bottom cursor4ShowAll"></span> </a> </h6> <h6 class="ngShowAllText"> <a class="cursor4ShowAll" ng-if="ngShowAllText==false" ng-click="showAll(ngShowAllText)" ng-if="ngShowAllText==true"> Show Less Cast <span class="glyphicon glyphicon-triangle-top cursor4ShowAll"></span> </a> </h6> </div> </div> </div> </div> <!--<button class = "btn btn-primary btn-lg" data-toggle = "modal" data-target = "#myModal">--> <!--Launch demo modal--> <!--</button>--> <!-- Modal --> <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-ng-model="displayTomatoData"> <div class="modal-dialog"> <div class="moveCrossRight"> <span data-dismiss="modal" class="glyphicon glyphicon-remove-circle lightGray"></span> <!--<a data-dismiss="modal"><img clss="modalClose" src="../images/modalClose.png"></a>--> </div> <div class="modal-content" id="yt-player"> <div class="embed-responsive embed-responsive-16by9"> <iframe class="embed-responsive-item" ng-src="{{trustSrc(displayTomatoData.movieTitle)}}" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no"></iframe> <!--<iframe width="854" height="480" src="https://www.youtube.com/watch?v=jWM0ct-OLsM" frameborder="0" allowfullscreen></iframe>--> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal --> <script type="text/javascript">$("#myModal").on(\'hidden.bs.modal\', function (e) {\r\n\r\n        $("#myModal iframe").attr("src", $("#myModal iframe").attr("src"));\r\n    });</script>'),a.put("views/searchmodal.html",'<div> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Search Your Movies Here</h4> </div> <div class="modal-body"> <div class="input-group stylish-input-group"> <input type="text" class="form-control" ng-model="movieToSearch" placeholder="Type a movie name"> <span class="input-group-addon" ng-click="searchMovies(movieToSearch)"> <button> <span class="glyphicon glyphicon-search"></span> </button> </span> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" ng-click="close()">Close</button> </div> <!-- modal-footer --> </div>'),a.put("views/searchresults.html","<p>This is the searchResults view.</p>"),a.put("views/trailermodal.html",'<div ng-controller="MoviedetailsCtrl"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Search Your Movies Here</h4> </div> <div class="modal-body"> <div class="input-group stylish-input-group"> <input type="text" class="form-control" ng-model="movieToSearch" placeholder="Type a movie name"> <span class="input-group-addon" ng-click="searchMovies(movieToSearch)"> <button> <span class="glyphicon glyphicon-search"></span> </button> </span> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" ng-click="close()">Close</button> </div> <!-- modal-footer --> </div>')}]);