const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const authenticationMiddleware = require('./middleware');
var mysqlConfig = require('../config.json');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
// var connection = mysql.createConnection({
// 	host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	'port' : 3306,
// 	'database' : 'movie_theatre'
// });

var pool  = mysql.createPool({
	connectionLimit : 1000,
	queueLimit: 0,
	waitForConnections: true,
	host     : mysqlConfig.mysql.host,
	user     : mysqlConfig.mysql.user,
	password : mysqlConfig.mysql.password,
	port     : mysqlConfig.mysql.port,
	database : mysqlConfig.mysql.database,
	debug    : mysqlConfig.mysql.debug,
	socketPath : mysqlConfig.mysql.socketPath
});
// const user = {
//   username: 'root',
//   password: 'root',
//   id: 1
// }

function findUser (username, callback) {
  console.log('username',username);
  if (username === user.username) {
    return callback(null, user)
  }
  return callback(null)
}

passport.serializeUser(function (user, cb) {
	console.log("in serialize" , user.adminUserEmail);
  cb(null, user);
})

passport.deserializeUser(function (user, done) {
	console.log("in deserialize");
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  // findUser(username, cb)  
  // findUser(username, function(err, username) {
  //   if(err){
  //     console.log('Error');
  //   }else{
  //     console.log('Success ================');
  //
  //   }
  //   cb(err, username);
  // })
	// var q = 'SELECT * FROM admin_user WHERE adminUserEmail='+adminUserEmail;
	console.log(user);
	var query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
	var table = ['admin_user', user.adminUserEmail];
	query = mysql.format(query, table);
	console.log(query);
	pool.getConnection(function (err, connection) {
		if(err){
			done(null);
		}else{
			connection.query(query,function(err,rows){
				if(err){
					done(null,{
						'Message': 'Something went wrong',
							'Status': 'Fail',
							'Error':'1'
					});
				}else {
					console.log('rows.length',rows.length);
					if (rows.length > 0) {
							return done(null, rows[0]);
					} else if(rows.length == 0){
						return done(null, {
							'Message': 'No User '+user.adminUserEmail+' Found 66',
							'Status': 'Fail',
							'Error':'1'
						});
					}else {
							return done(null, {
								'Message': 'User not authenticated',
								'Status': 'Fail',
								'Error':'1'
							});
							// create the loginMessage and save it to session as flashdata
						}
					}
				// done(err, rows[0]);
			});
			console.log('Connection releaaed --------------------------------------------------------------------------------');
			connection.release();
		}
	});
});

function initPassport () {
  passport.use(new LocalStrategy({
	  usernameField : 'adminUserEmail',
	  passwordField : 'password',
	  passReqToCallback : true // allows us to pass back the entire request to the callback
  },
    function(req,adminUserEmail, password, done) {
		console.log("i am in iinit");
		var query = 'SELECT * FROM ?? WHERE adminUserEmail = ?';
		var table = ['admin_user', (adminUserEmail).toLowerCase()];
		query = mysql.format(query, table);
		pool.getConnection(function (err, connection) {
			if(err){
				return done(null, false);
			}else{
				connection.query(query, function (err, rows) {
					if (err) {
						console.log('Here line 61 Error', err);
						return done(err);
					} else {
						if (rows.length > 0) {
							matchPassword = rows[0].adminUserPassword;
							var isMatch = bcrypt.compareSync(password, matchPassword);
							if (isMatch) {
								console.log("Everything matched");
								return done(null, rows[0]);
							} else {
								// return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
								// return done(null, false);
								return done(null, {
									'Message': 'Wrong Password',
									'Status': 'Fail',
									'Error':'1'
								});
								// create the loginMessage and save it to session as flashdata
							}
						} else {
							// return done(null, false, req.flash('loginMessage', 'No user found.'));
							// return done(null, false);
							return done(null, {
								'Message': 'No User Found',
								'Status': 'Fail',
								'Error':'1'
							});
						}
					}
					// findUser(username, function (err, user) {
					//   if (err) {
					//     return done(err)
					//   }
					//   if (!user) {
					//     return done(null, false)
					//   }
					//   if (password !== user.password  ) {
					//     return done(null, false)
					//   }
					//   return done(null, user)
					// })
				});
			}
			connection.release();
		});
	}
  ));
  console.log('I came upto here');
  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
