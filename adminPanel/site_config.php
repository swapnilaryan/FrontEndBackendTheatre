<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE HTML>
<html>
<head>
<title>Cinestar Admin Panel</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="Cinestar Admin , 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design" />
<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
<link href="css/bootstrap.min.css" rel='stylesheet' type='text/css' />
<!-- Custom Theme files -->
<link href="css/style.css" rel='stylesheet' type='text/css' />
<link href="css/font-awesome.css" rel="stylesheet"> 
<script src="js/jquery.min.js"> </script>
<script src="js/bootstrap.min.js"> </script>
  
<!-- Mainly scripts -->
<script src="js/jquery.metisMenu.js"></script>
<script src="js/jquery.slimscroll.min.js"></script>
<!-- Custom and plugin javascript -->
<link href="css/custom.css" rel="stylesheet">
<script src="js/custom.js"></script>
<script src="js/screenfull.js"></script>
		<script>
		$(function () {
			$('#supported').text('Supported/allowed: ' + !!screenfull.enabled);

			if (!screenfull.enabled) {
				return false;
			}

			

			$('#toggle').click(function () {
				screenfull.toggle($('#container')[0]);
			});
			

			
		});
		</script>



</head>
<body>
<div id="wrapper">
       <!----->
        <nav class="navbar-default navbar-static-top" role="navigation">
             <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
               <h1> <a class="navbar-brand" href="index.html">Cinestar Admin </a></h1>         
			   </div>
			 <div class=" border-bottom">
        	<div class="full-left">
        	  <section class="full-top">
				<button id="toggle"><i class="fa fa-arrows-alt"></i></button>	
			</section>
			<form class=" navbar-left-right">
              <input type="text"  value="Search..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Search...';}">
              <input type="submit" value="" class="fa fa-search">
            </form>
            <div class="clearfix"> </div>
           </div>
     
       
            <!-- Brand and toggle get grouped for better mobile display -->
		 
		   <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="drop-men" >
		        <ul class=" nav_1">
		           
		    		<li class="dropdown at-drop">
		              <a href="#" class="dropdown-toggle dropdown-at " data-toggle="dropdown"><i class="fa fa-globe"></i> <span class="number">5</span></a>
		              <ul class="dropdown-menu menu1 " role="menu">
		                <li><a href="#">
		               
		                	<div class="user-new">
		                	<p>New user registered</p>
		                	<span>40 seconds ago</span>
		                	</div>
		                	<div class="user-new-left">
		                
		                	<i class="fa fa-user-plus"></i>
		                	</div>
		                	<div class="clearfix"> </div>
		                	</a></li>
		                <li><a href="#">
		                	<div class="user-new">
		                	<p>Someone special liked this</p>
		                	<span>3 minutes ago</span>
		                	</div>
		                	<div class="user-new-left">
		                
		                	<i class="fa fa-heart"></i>
		                	</div>
		                	<div class="clearfix"> </div>
		                </a></li>
		                <li><a href="#">
		                	<div class="user-new">
		                	<p>John cancelled the event</p>
		                	<span>4 hours ago</span>
		                	</div>
		                	<div class="user-new-left">
		                
		                	<i class="fa fa-times"></i>
		                	</div>
		                	<div class="clearfix"> </div>
		                </a></li>
		                <li><a href="#">
		                	<div class="user-new">
		                	<p>The server is status is stable</p>
		                	<span>yesterday at 08:30am</span>
		                	</div>
		                	<div class="user-new-left">
		                
		                	<i class="fa fa-info"></i>
		                	</div>
		                	<div class="clearfix"> </div>
		                </a></li>
		                <li><a href="#">
		                	<div class="user-new">
		                	<p>New comments waiting approval</p>
		                	<span>Last Week</span>
		                	</div>
		                	<div class="user-new-left">
		                
		                	<i class="fa fa-rss"></i>
		                	</div>
		                	<div class="clearfix"> </div>
		                </a></li>
		                <li><a href="#" class="view">View all messages</a></li>
		              </ul>
		            </li>
					<li class="dropdown">
		              <a href="#" class="dropdown-toggle dropdown-at" data-toggle="dropdown"><span class=" name-caret">Rackham<i class="caret"></i></span><img src="images/wo.jpg"></a>
		              <ul class="dropdown-menu " role="menu">
		                <li><a href="profile.html"><i class="fa fa-user"></i>Edit Profile</a></li>
		                <li><a href="inbox.html"><i class="fa fa-envelope"></i>Inbox</a></li>
		                <li><a href="calendar.html"><i class="fa fa-calendar"></i>Calender</a></li>
		                <li><a href="inbox.html"><i class="fa fa-clipboard"></i>Tasks</a></li>
		              </ul>
		            </li>
		           
		        </ul>
		     </div><!-- /.navbar-collapse -->
			<div class="clearfix">
       
     </div>
	  
		   <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
				
                    <li>
                        <a href="index.html" class=" hvr-bounce-to-right"><i class="fa fa-dashboard nav_icon "></i><span class="nav-label">Dashboards</span> </a>
                    </li>

                       <li>
                        <a href="site_config.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">Site Config</span><span class="fa arrow"></span></a>
                    </li>
                    <li>
                        <a href="movies.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">Movies</span><span class="fa arrow"></span></a>
                         <ul class="nav nav-second-level">
                            <li><a href="current_movies.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Current Movies</a></li>
                            <li><a href="future_movies.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Upcomming Movies</a></li>
                        </ul>
                    </li>
                    <li>
                         <a href="promotions.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">Promotions</span><span class="fa arrow"></span></a>
                    </li>
                    <li>
                        <a href="user_account.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">User Accounts</span><span class="fa arrow"></span></a>
                    </li>
                    <li>
                        <a href="reports.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">Reports </span><span class="fa arrow"></span></a>
                    </li>
                   <li>
                        <a href="settings.php" class=" hvr-bounce-to-right"><i class="fa fa-cog nav_icon"></i> <span class="nav-label">Settings</span><span class="fa arrow"></span></a>
                         <ul class="nav nav-second-level">
                            <li><a href="screen.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Screen Settings</a></li>
                            <li><a href="ticket.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Ticket Settings</a></li>
                              <li><a href="social.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Social Settings</a></li>
                            <li><a href="location.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Location Settings</a></li>
                              <li><a href="contact.php" class=" hvr-bounce-to-right"><i class="fa fa-sign-in nav_icon"></i>Contact Settings</a></li>
                        </ul>
                    </li>


                   
                   
                </ul>
            </div>
			</div>
        </nav>
		 <div id="page-wrapper" class="gray-bg dashbard-1">
       <div class="content-main">
 
 	<!--banner-->	
		     <div class="banner">
		    	<h2>
				<a href="index.html">Home</a>
				<i class="fa fa-angle-right"></i>
				<span>Site Configuration</span>
				</h2>
		    </div>
		<!--//banner-->
 	 <!--faq-->
 	<div class="blank">
	

			<div class="blank-page">
				
	        	<form role="form" class="form-horizontal">
						<div class="form-group">
							<label class="col-md-2 control-label">Theater Name</label>
							<div class="col-md-8">
								<div class="input-group">							
									<span class="input-group-addon">
										<i class="fa fa-envelope-o"></i>
									</span>
									<input type="text" class="form-control1" placeholder="Theater Name" required="">
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-2 control-label">Website URL</label>
							<div class="col-md-8">
								<div class="input-group">
									<span class="input-group-addon">
										<i class="fa fa-key"></i>
									</span>
						<input type="text" class="form-control1" id="exampleInputPassword1"placeholder="Website URL" required="">
								</div>
							</div>
					</div>
<div class="form-group">
									<label for="selector1" class="col-sm-2 control-label">Time Zone</label>
									<div class="col-sm-8"><select name="selector1" id="selector1" class="form-control1">
										<option>Lorem ipsum dolor sit amet.</option>
										<option>Dolore, ab unde modi est!</option>
										<option>Illum, fuga minus sit eaque.</option>
										<option>Consequatur ducimus maiores voluptatum minima.</option>
									</select></div>
								</div>

                                          <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Sunday</label>
    <div class="col-md-2">
								<div class="input-group"><span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span> <input type="text" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div>
   
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Monday</label>
    <div class="col-md-2">
								<div class="input-group"><span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span> <input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div> 
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Tuesday</label>
    <div class="col-md-2">
								<div class="input-group"><span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span> <input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div> 
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Wednesday</label>
    <div class="col-md-2">
								<div class="input-group"><span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span> <input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div> 
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Thursday</label>
    <div class="col-md-2">
								<div class="input-group"> <span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span><input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div> 
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Friday</label>
    <div class="col-md-2">
								<div class="input-group"> <span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span><input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div> 
 <div class="form-horizontal">       <div class="form-group">
    <label  for="exampleInputEmail3" class="col-sm-2 control-label">Saturday</label>
    <div class="col-md-2">
								<div class="input-group"><span class="input-group-addon">
										<i class="fa fa-dashboard"></i>
									</span> <input type="email" class="form-control col-sm-2 " id="exampleInputEmail3" placeholder="Open Time" required=""></div></div>
     <div class="col-md-2">
								<div class="input-group">
    <input type="password" class="form-control " id="exampleInputPassword3" placeholder="Close Time" required=""></div></div>

  </div>						 <div class="panel-footer">
		<div class="row">
			<div class="col-sm-8 col-sm-offset-2">
				<button class="btn-primary btn">Submit</button>
				<button class="btn-default btn">Cancel</button>
				<button class="btn-inverse btn">Reset</button>
			</div>
		</div>
	 </div></form>	
	        </div>
	       </div>
	
	<!--//faq-->
		<!---->
<div class="copy">
            <p> &copy; 2016 Minimal. All Rights Reserved | Design by <a href="http://w3layouts.com/" target="_blank">W3layouts</a> </p>	    </div>
		</div>
		</div>
		<div class="clearfix"> </div>
       </div>
     
<!---->
<!--scrolling js-->
	<script src="js/jquery.nicescroll.js"></script>
	<script src="js/scripts.js"></script>
	<!--//scrolling js-->
</body>
</html>

