const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
var passwordhash = require('password-hash');
var multer = require('multer');
var mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
var geodist         = require('geodist');

var User = require('../models/user');
var Agegroup = require('../models/ageGroup');
var Skill = require('../models/skillLevel');
var Sport = require('../models/sport');
var Team = require('../models/Team');
var ScrimmageRequest = require('../models/scrimmagerequest');



var image;


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

router.get('/verifyemail', (req, res) => {
  res.sendFile(path.join(__dirname, '../../verifyemail.html'));
});

router.get('/forgot', (req, res) => {
  res.sendFile(path.join(__dirname, '../../forgotpassword.html'));
});

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log('File', file);
    callback(null, "public/images/team/");
  },
  filename: function (req, file, callback) {
    console.log('filename', file);
    image = Date.now() + "_" + file.originalname;
    console.log('imageExtenstion', image);
    callback(null, image);
  }
});

 var upload_image = multer({ storage: Storage }).fields([{ name: 'team_image'}, { name: 'cover_image' }])


var team_images                 = '/images/team/';
 var profile_image_url          = '/images/profile/';
// var small_group_image_url    = '/images/small_group/';
// var group_post_url           = '/images/group_post/';
// var group_photos_url         = '/images/group_photos/';

const suc = 200;
const er = 400;
const ses = 401;



  /*---------------------------------------
  		  (1)  Signup 
  ----------------------------------------*/

router.post('/signup', function (req, res) {
  var params = req.body;
  var baseUrl = req.protocol + '://' + req.get('host');
  console.log('signup', params);
  var token = crypto.randomBytes(48).toString('hex');
  console.log('token', token);
  if (params.register_type == 'O') {

    User.checkEmailExistSignup(params, function (err, user) {
      if (err) {
        console.log('Check Entry Error', err);
      } else {
        if (user.length === 0) {
          var password = req.body.password;
          var Encrptpassword = passwordhash.generate(password);
          params.password = Encrptpassword;
          params.status = 'A';
          params.token = token;
          params.profile_image = 'user.png';
          console.log('Encrypt password', Encrptpassword);
          User.addNewUser(params, function (err, user) {
            if (err) {
              console.log('Error', err);
            }
            else {
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 465,
                secure: true,
                auth: {
                  user: 'scrimmagematchhost@gmail.com',
                  pass: '3772Bosque'
                }

              });
              //console.log("created ",transporter)
              var mailOptions = {
                from: 'scrimmagematchhost@gmail.com',
                to: params.email,
                subject: 'Url for email Verification',
                html: 'Hi ' + params.first_name + ' Thank you for signing up!. Kindly click on the following link to activate your account.' + baseUrl + '/api/verifyemail/?token=' + token
              };
              //console.log("mailoptions created ",mailOptions)
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("errorrrrrrrr ", error);
                  res.json({
                    status: er,
                    message: "Not a valid email"
                  })
                } else {

                  console.log('Email sent: ' + info.response);
                  res.json({
                    status: suc,
                    message: "Registered successfully!!! Plaese Check your email for verification purpose.",
                    data: user
                  })

                }
              });
            }
          })
        }
        else {
          console.log('Email already exist');
          res.json({
            status: er,
            message: 'Email Already Exist'
          })
        }
      }
    });
  } else {
    console.log('login with social media');
    User.checkEntrySocial(params, function (err, socialid) {
      if (err) {
        console.log('Social Login Error', err);
        res.json({
          status: er,
          message: err
        });
      } else if (socialid.length != 0) {
        console.log('user exist');
        console.log('userid', socialid);
        var id = socialid[0]._id;
        console.log('user_id', id);
        console.log('user login through social login with existing social media id ');
        User.updateSocialSignup(id, socialid, function (err, updateuser) {
          console.log('updateuser', updateuser)
          if (err) {
            res.json({
              status: er,
              message: err
            })
          } else {
            console.log('update sucess', updateuser);
            res.json({
              status: suc,
              message: 'Social Login Sucsessfully',
              data: updateuser
            })
          }
        })

      } else {
        console.log('new social Entry');
        User.checkEmailExistSignup(params, function (err, response) {
          if (err) {
            console.log('Check email Error', err);
          }
          else if (response.length === 0) {
            console.log('new user');
            params.profile_image = 'user.png';
            params.status = 'A';
            User.addNewUser(params, function (err, user) {
              if (err) {
                console.log('Error', err);
              }
              else {
                console.log('Sucess', user);
                res.json({
                  status: suc,
                  message: 'Social Login Sucsessfully',
                  data: user
                })
              }
            })
          }
          else {
            console.log('Email already exist in mannaul signup');
            res.json({
              status: er,
              message: 'Email Already Exist',
            })
          }

        });
      }
    })
  }

});

/*----------------------------(2)-Verified Emai--------------------------------------*/

router.post('/verify_email/:verifytoken', function (req, res) {
  console.log("hiii verify_email")
  var params = req.body;
  console.log('email verify paramssss', params);
  var token = req.params.verifytoken.split(':')[1];
  params.signupToken = token;
  console.log("params ", params)
  console.log("token is " + token);
  User.verifyUser(params, function (err, user) {
    if (err) {
      console.log("error ", err);
      res.json({
        status: er,
        error: err
      })
    } else {
      console.log("succesfullly updated", user)
      res.json({
        status: suc,
        message: "succesfullly updated",
        data: user
      })
    }
  }
  )
});

// /*---------------------------------------------------
//  		               (3) Login 
//    -------------------------------------------------------*/

router.post('/login', function (req, res) {
  console.log('hiii login', req.body);
  var params = req.body;
  var password = req.body.password;

  User.Login(params, function (err, user) {
    if (err) {
      res.json({
        status: er,
        message: "Login failed.",
        data: err
      })
    }
    else if (user != null) {
      console.log("user ", user)
      console.log("user exists and password is ", password, user.password, user.status)
      var check = passwordhash.verify(password, user.password);
      console.log(check)
      if (check == true && user.status == 'A') {
        console.log('Login sucess');
        res.json({
          status: suc,
          message: "Login Successfully",
          data: user
        })
      }
      else {
        console.log("check falseee")
        res.json({
          status: er,
          message: "Password incorecct or Verify your account"
        })
      }
    } else {
      console.log('user not exist');
      res.json({
        status: suc,
        message: 'User Not Exist'
      })
    }
  })
});




/*---------------------------------------
       (4)  Get Age group 
----------------------------------------*/
router.get('/ageGroup', function (req, res) {

  console.log("Get Age Group")
  Agegroup.getAgeGroup(function (err, groups) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', groups);
      res.json({
        status: suc,
        message: 'Records Found',
        data: groups
      })
    }
  })

});

/*---------------------------------------
    (5)  Get Skill Level 
----------------------------------------*/
router.get('/getskill', function (req, res) {

  console.log("Get Skill Level")
  Skill.getSkill(function (err, skill) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', skill);
      res.json({
        status: suc,
        message: 'Records Found',
        data: skill
      })
    }
  })

});




/*---------------------------------------
    (5)  Get Sports 
----------------------------------------*/
router.get('/get_sports', function (req, res) {

  console.log("hii get_sports")
  Sport.getSports(function (err, sports) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', sports);
      res.json({
        status: suc,
        message: 'Records Found',
        data: sports
      })
    }
  })

});


/*----------------------------------------------------
              (7) Forgot Password
----------------------------------------------------*/
router.post('/forgot_password', function (req, res) {
  console.log("hiii forgot_password")
  var baseUrl = req.protocol + '://' + req.get('host');
  var params = req.body;
  console.log('paramssssssss', params, 'baseurlllll', baseUrl);
  var email = params.email;
  var token = crypto.randomBytes(48).toString('hex');
  var paramsS = {
    token: token,
    email: email
  }
  console.log(token, paramsS)
  User.setToken(paramsS, function (err, user) {
    if (user == null) {
      console.log(user)
      console.log(err)
      res.json({
        success: suc,
        message: "email not exist"
      })
    } else {
      console.log(user)
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
          user: 'scrimmagematchhost@gmail.com',
          pass: '3772Bosque'
        }
      });
      console.log("created ", transporter)
      var mailOptions = {
        from: 'scrimmagematchhost@gmail.com',
        to: params.email,
        subject: 'Forgot Password Link',
        text: 'This is the link from where you can update your password ' + baseUrl + '/api/forgot/?token=' + token
      };
      console.log("mailoptions created ", mailOptions)
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("errorrrrrrrr ", error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json({
            status: suc,
            message: "Mail has been sent. Please check and update your password"
          })
        }
      }
      );
    }
  }
  )
}
);


/*----------------------------------------------------Reset Password----------------------------------------------------*/

router.post('/reset_password/:token', function (req, res) {

  console.log("hiii reset_password")
  var params = req.body;

  var password = passwordhash.generate(params.new_password);
  params.password = password
  var token = req.params.token.split(':')[1];
  params.token = token;
  console.log("params ", params)
  console.log("token is " + token);

  User.getPassword(params, function (err, password) {
    console.log("password is ", password)
    var check = passwordhash.verify(params.new_password, password[0].password);
    if (check == true) {
      console.log("New Password should be different from previous one");
      res.json({
        status: false,
        message: "New Password should be different from previous one"
      })
    } else {
      console.log('diffent password');
      console.log('reset password params', params);
      User.resetPassword(params, function (err, user) {
        console.log('ResetPassword Response', user)
        res.json({
          status: true,
          message: "Password Changed"
        })
      })
    }
  })
}
);


/*---------------------------------------------------
 		               (3) Create New Team 
   -------------------------------------------------------*/
router.post('/create_team', function (req, res) {
  upload_image(req, res, function (err) {
    if (err) {
      console.log('file upload Error', err);
      res.json({
        status: er,
        message: err
      })
    } else {
 //     console.log('REq PPPPPPPPPPPPPPPPPPPPP',req);
    console.log('File PPPPPPPPPPPPPPPPPPPPP',req.files);
     console.log('Data PPPPPPPPPPPPPPPPPPPPP',req.body);
      var params = req.body;
      // var imageName = image;
      // console.log('imagepathhhhh',imageName);
      //params.team_image = imageName;
      params.status = 'A';
      params.team_image = req.files.team_image[0].filename;
      params.cover_image = req.files.cover_image[0].filename;
      Team.addNewTeam(params, function (err, addTeam) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('addTeam response', addTeam);
          res.json({
            status: suc,
            message: 'Team Created Successfully'
          })
        }
      })
    }
  })
});



 /*------------------------------------------------------
      (13)  Edit Team
 --------------------------------------------------------*/

  router.post('/edit_team',function(req,res){
      console.log("hiii /admin/edit_group")
    upload_image(req, res, function (err) {
           if (err) {
                  console.log(err);
           } 

           else {
            console.log("files in edit_team is ", req.files)
            console.log("dataaaaaaa in edit_team is ", req.body)

              var params               = req.body; 
              if(req.files) {
                if(req.files.team_image) {
                  params.team_image = req.files.team_image[0].filename;
                }
                else{
                  params.team_image = "";
                }
                  if(req.files.cover_image) {
                  params.cover_image = req.files.cover_image[0].filename;
                }
                else{
                  params.cover_image = "";
                }
              }
              else {
                params.team_image = "";
                params.cover_image = "";
              }

              var id                   = params.team_id;
              params.team_id = "";

              Team.editTeam(id,params,function (err,team){
                if(err){
                    console.log(" error-- ",err);
                }
                else{ 
             
                  res.json({
                             status     : true,
                             message    : "successfully updated team",
                             data       : team
                  })           
               }
            })
            

          
          }
       })
 
   });








/*---------------------------------------------------------
 		    (4) Get Near By Scrimmages
----------------------------------------------------------*/
	router.post('/get_nearby_scrimmages',function(req,res) {
		console.log("hiii get_nearby_scrimmages")

		var params		= req.body;
		var baseUrl 	= req.protocol+ '://' + req.get('host');

        console.log("params ",params)

		Team.getNearByTeams(params,function (err,teams) {
			if(err)
			{
				console.log(" error-- ",err);
				 res.json({
									status : er,
									message : "Something went wrong!",						
									data : err	
							})	
			}

			else {
				 console.log("teams found ",teams )
				 	var result_teams = [];
				       
                for (var i = 0; i < teams.length; i++) {
                  teams[i].team_image       = baseUrl + team_images + teams[i].team_image;
                 teams[i].cover_image       = baseUrl + team_images + teams[i].cover_image;

                  var dist    = geodist({   lat   : params.latitude,    lon   : params.longitude    }, 
                                          {   lat   : teams[i].latitude,  lon   : teams[i].longitude  })
                    console.log("distanceeeee of user "+teams[i].team_name + " is " +dist)
                       if (dist <= 20) {
                         result_teams.push(teams[i]);
                      }
               }



					res.json({
								status 		: suc,
								message 	: "Teams found successfully",
								data 		: result_teams
					   })



			}


		})
	
	});



/*---------------------------------------------------------
        (5) Get My Teams
----------------------------------------------------------*/
  router.post('/get_my_teams',function(req,res) {
    console.log("hiii get_my_teams")

    var params    = req.body;
    var baseUrl   = req.protocol+ '://' + req.get('host');

        console.log("params ",params)

    Team.getMyTeams(params,function (err,teams) {
      if(err)
      {
        console.log(" error-- ",err);
         res.json({
                  status : er,
                  message : "Something went wrong!",           
                  data : err  
              })  
      }

      else {
         console.log("teams found ",teams )
          var result_teams = [];
               for(var i in teams ) {
                 result_teams[i]            = teams[i].toObject();
                 result_teams[i].team_image       = baseUrl + team_images + result_teams[i].team_image;
                 result_teams[i].cover_image       = baseUrl + team_images + result_teams[i].cover_image;
               }

          res.json({
                status    : suc,
                message   : "Teams found successfully",
                data    : result_teams
             })



      }


    })
  
  });
  


/*---------------------------------------------------------
        (6) Get Team Detail
----------------------------------------------------------*/
  router.post('/get_team_detail',function(req,res) {
    console.log("hiii get_team_detail")

    var params    = req.body;
    var baseUrl   = req.protocol+ '://' + req.get('host');

        console.log("params ",params)

    Team.getTeamDetail(params,function (err,teamDetail) {
      if(err)
      {
        console.log(" error-- ",err);
         res.json({
                  status : er,
                  message : "Something went wrong!",           
                  data : err  
              })  
      }

      else {
         console.log("teamDetail found ",teamDetail )
    
                 teamDetail.team_image       = baseUrl + team_images + teamDetail.team_image;
                 teamDetail.cover_image       = baseUrl + team_images + teamDetail.cover_image;
                 teamDetail.user_id.profile_image = baseUrl + profile_image_url + teamDetail.user_id.profile_image;

          res.json({
                status    : suc,
                message   : "Team Detail found successfully",
                data    : teamDetail
             })



      }


    })
  
  });
  


/*---------------------------------------------------------
        (7) Search with filters
----------------------------------------------------------*/
  router.post('/search_with_filters',function(req,res) {
    console.log("hiii search_with_filters")

    var params    = req.body;
    var baseUrl   = req.protocol+ '://' + req.get('host');

        console.log("params ",params)

    Team.serachFilters(params,function (err,teams) {
      if(err)
      {
        console.log(" error-- ",err);
         res.json({
                  status : er,
                  message : "Something went wrong!",           
                  data : err  
              })  
      }

      else {
         console.log("teams found ",teams )
         var final_teams = [];
         if(params.loc_lat != 'undefined') {
           for(var i in teams ) {
               var dist    = geodist({   lat   : params.loc_lat,    lon   : params.loc_lng    }, 
                                          {   lat   : teams[i].latitude,  lon   : teams[i].longitude  })
                    console.log("distanceeeee of user "+teams[i].team_name + " is " +dist)
                       if (dist <= 33) {
                         final_teams.push(teams[i]);
                      }
                }
         }
         else { 
                final_teams = teams;
         }
          var result_teams = []; 
               for(var i in final_teams ) {
                 result_teams[i]            = final_teams[i].toObject();
                 result_teams[i].team_image       = baseUrl + team_images + result_teams[i].team_image;
                 result_teams[i].cover_image       = baseUrl + team_images + result_teams[i].cover_image;
               }

          res.json({
                status    : suc,
                message   : "Teams found successfully",
                data    : result_teams
             })



      }


    })
  
  });
  



/*---------------------------------------------------
                   (8) send request scrimmage 
   -------------------------------------------------------*/
router.post('/send_request_scrimmage', function (req, res) {
     console.log("hiii send_request_scrimmage")

      var params = req.body;
      params.status = 'P';
      params.date_of_match = new Date(params.date_of_match);

      ScrimmageRequest.addNewScrimmageRequest(params, function (err, request) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('request response', request);
          res.json({
            status: suc,
            message: 'Successfully sent request'
          })
        }
      })
  
});





/*---------------------------------------------------------
        (9) Get Upcoming Completed Scrimmages
----------------------------------------------------------*/
  router.post('/get_upcoming_completed_scrimmages',function(req,res) {
    console.log("hiii get_upcoming_completed_scrimmages")

    var params    = req.body;
    var baseUrl   = req.protocol+ '://' + req.get('host');

        console.log("params ",params)

              ScrimmageRequest.getUpcomingScrimmages(params,function (err,upcomingScrimmages) {
                  if(err)
                  {
                    console.log(" error-- ",err);
                     res.json({
                              status : er,
                              message : "Something went wrong!",           
                              data : err  
                          })  
                  }

                  else {
                     console.log("upcomingScrimmages found ",upcomingScrimmages )
                   
                      var result_upcomingScrimmages = []; 
                      var upcomingScrimmages_object = [];
                           for(var i in upcomingScrimmages ) {
                             upcomingScrimmages_object[i]            = upcomingScrimmages[i].toObject();
                             upcomingScrimmages_object[i].team_id.team_image       = baseUrl + team_images + upcomingScrimmages_object[i].team_id.team_image;
                             upcomingScrimmages_object[i].other_team_id.team_image       = baseUrl + team_images + upcomingScrimmages_object[i].other_team_id.team_image;
                                 var dat = upcomingScrimmages_object[i].date_of_match;
                                 upcomingScrimmages_object[i].date_of_match = dat.getDate()  + ' ' + dat.toLocaleString("en-us", { month: "long" }) + ', ' + dat.getFullYear();
                             // result_teams[i].cover_image       = baseUrl + team_images + result_teams[i].cover_image;
                               


                               if(params.user_id == upcomingScrimmages_object[i].user_id) {
                                                   result_upcomingScrimmages.push({  _id             : upcomingScrimmages_object[i]._id,
                                                                                      user_id         : upcomingScrimmages_object[i].user_id,
                                                                                      other_user_id   : upcomingScrimmages_object[i].other_user_id,
                                                                                      team_id         : { _id : upcomingScrimmages_object[i].team_id._id, team_name : upcomingScrimmages_object[i].team_id.team_name},
                                                                                      other_team_id   : upcomingScrimmages_object[i].other_team_id,
                                                                                      date_of_match   : upcomingScrimmages_object[i].date_of_match,
                                                                                      from_time       : upcomingScrimmages_object[i].from_time,
                                                                                      to_time         : upcomingScrimmages_object[i].to_time
                                                                                   }) 
                                                }
                                                else if(params.user_id == upcomingScrimmages_object[i].other_user_id) {
                                                   result_upcomingScrimmages.push({  _id             : upcomingScrimmages_object[i]._id,
                                                                                      user_id         : upcomingScrimmages_object[i].other_user_id,
                                                                                      other_user_id   : upcomingScrimmages_object[i].user_id,
                                                                                      team_id         : { _id : upcomingScrimmages_object[i].other_team_id._id, team_name : upcomingScrimmages_object[i].other_team_id.team_name},
                                                                                      other_team_id   : upcomingScrimmages_object[i].team_id,
                                                                                      date_of_match   : upcomingScrimmages_object[i].date_of_match,
                                                                                      from_time       : upcomingScrimmages_object[i].from_time,
                                                                                      to_time         : upcomingScrimmages_object[i].to_time
                                                                                   }) 
                                                }


                                      
                           }

                             ScrimmageRequest.getCompletedScrimmages(params,function (err,completedScrimmages) {
                                    if(err)
                                    {
                                      console.log(" error-- ",err);
                                       res.json({
                                                status : er,
                                                message : "Something went wrong!",           
                                                data : err  
                                            })  
                                    }

                                    else {
                                       console.log("completedScrimmages found ",completedScrimmages )
                                     
                                        var result_completedScrimmages = []; 
                                        var completedScrimmages_object= [];
                                             for(var i in completedScrimmages ) {
                                                completedScrimmages_object[i]            = completedScrimmages[i].toObject();
                                               completedScrimmages_object[i].team_id.team_image       = baseUrl + team_images + completedScrimmages_object[i].team_id.team_image;
                                               completedScrimmages_object[i].other_team_id.team_image       = baseUrl + team_images + completedScrimmages_object[i].other_team_id.team_image;
                                                 var dat = completedScrimmages_object[i].date_of_match;
                                                 completedScrimmages_object[i].date_of_match = dat.getDate() + ' ' + dat.toLocaleString("en-us", { month: "long" }) + ', ' + dat.getFullYear();
                                          
                                               // result_teams[i].cover_image       = baseUrl + team_images + result_teams[i].cover_image;
                                                if(params.user_id == completedScrimmages_object[i].user_id) {
                                                   result_completedScrimmages.push({  _id             : completedScrimmages_object[i]._id,
                                                                                      user_id         : completedScrimmages_object[i].user_id,
                                                                                      other_user_id   : completedScrimmages_object[i].other_user_id,
                                                                                      team_id         : { _id : completedScrimmages_object[i].team_id._id, team_name : completedScrimmages_object[i].team_id.team_name},
                                                                                      other_team_id   : completedScrimmages_object[i].other_team_id,
                                                                                      date_of_match   : completedScrimmages_object[i].date_of_match,
                                                                                      from_time       : completedScrimmages_object[i].from_time,
                                                                                      to_time         : completedScrimmages_object[i].to_time
                                                                                   }) 
                                                }
                                                else if(params.user_id == completedScrimmages_object[i].other_user_id) {
                                                   result_completedScrimmages.push({  _id             : completedScrimmages_object[i]._id,
                                                                                      user_id         : completedScrimmages_object[i].other_user_id,
                                                                                      other_user_id   : completedScrimmages_object[i].user_id,
                                                                                      team_id         : { _id : completedScrimmages_object[i].other_team_id._id, team_name : completedScrimmages_object[i].other_team_id.team_name},
                                                                                      other_team_id   : completedScrimmages_object[i].team_id,
                                                                                      date_of_match   : completedScrimmages_object[i].date_of_match,
                                                                                      from_time       : completedScrimmages_object[i].from_time,
                                                                                      to_time         : completedScrimmages_object[i].to_time
                                                                                   }) 
                                                }

                                                


                                             }


                                    var sendData = {
                                            upcomingScrimmages : result_upcomingScrimmages,
                                            completedScrimmages : result_completedScrimmages
                                    }


                                        res.json({
                                              status    : suc,
                                              message   : "Scrimmages found successfully",
                                              data    : sendData
                                           })



                                    }


                                })
                  

                  }


              })


  
  });
  





/*---------------------------------------------------------
        (10) Get Pending Scrimmages
----------------------------------------------------------*/
  router.post('/get_pending_scrimmages',function(req,res) {
    console.log("hiii get_pending_scrimmages")

    var params    = req.body;
    var baseUrl   = req.protocol+ '://' + req.get('host');

        console.log("params ",params)

    ScrimmageRequest.getPendingRequests(params,function (err,pendingScrimmages) {
      if(err)
      {
        console.log(" error-- ",err);
        res.json({
                  status : er,
                  message : "Something went wrong!",           
                  data : err  
              })  
      }

      else {
         console.log("pendingScrimmages found ",pendingScrimmages )
       
          var result_pendingScrimmages = []; 
               for(var i in pendingScrimmages ) {
                 result_pendingScrimmages[i]            = pendingScrimmages[i].toObject();
                 result_pendingScrimmages[i].team_id.team_image       = baseUrl + team_images + result_pendingScrimmages[i].team_id.team_image;
                 var dat = result_pendingScrimmages[i].date_of_match;
                 result_pendingScrimmages[i].date_of_match = dat.getDate()  + ' ' +  dat.toLocaleString("en-us", { month: "long" }) + ', ' + dat.getFullYear();
                 // result_teams[i].cover_image       = baseUrl + team_images + result_teams[i].cover_image;
               }

                  res.json({
                              status    : suc,
                              message   : "Scrimmage requests found successfully",
                              data    : result_pendingScrimmages
                           })



      }


    })
  
  });
  




/*---------------------------------------------------
                   (11) Accept Reject scrimmage request
   -------------------------------------------------------*/
router.post('/accept_reject_scrimmage_request', function (req, res) {
     console.log("hiii accept_reject_scrimmage_request")

      var params = req.body;

      ScrimmageRequest.acceptRejectRequest(params, function (err, request) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('request response', request);
          res.json({
            status: suc,
            message: 'Successfully changed status'
          })
        }
      })
  
});


/*---------------------------------------------------
                   (12) Delete My Team 
   -------------------------------------------------------*/
router.post('/delete_my_team', function (req, res) {
     console.log("hiii delete_my_team")

      var params = req.body;

      Team.deleteMyTeam(params, function (err, deletedTeam) {
        if (err) {
          console.log('Error', err);
        } else {
          console.log('Team deleted', deletedTeam);
          res.json({
            status: suc,
            message: 'Team Deleted Successfully'
          })
        }
      })
  
});








// /*---------------------------------------------------------
//  		    (5) Get Detail of particular Group
// ----------------------------------------------------------*/
// 	router.post('/detail_group_with_about',function(req,res){
// 		console.log("hiii detail_group_with_about", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//            User.getProfile(params,function(err,authUser) {
//            	console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {

// 				Group.getGroupDetail(params,function (err,groupDetail) {
// 					if(err){
// 						console.log(" error-- ",err);
// 						 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 					}
// 					else{

// 					 console.log("group found ",groupDetail)
// 						 	var result_group ;

// 						       	 result_group 						= groupDetail.toObject();
// 						       	 result_group.total_members 		= result_group.users.length;
// 					             result_group.group_image 			= baseUrl + group_image_url + result_group.group_image;

// 					             if(result_group.privacy = 'O') {
// 					             	result_group.privacy = 'Public'
// 					             }
// 					             else if(result_group.privacy = 'C') {
// 					             	result_group.privacy = 'Private'
// 					             }
// 					             result_group.join_status 			= false;

// 					                for(var i in result_group.users) {
// 					                  	result_group.users[i].profile_image = baseUrl + profile_image_url + result_group.users[i].profile_image; 
// 					                  	// var authId = String(authUser._id);
// 					                  	// var groupUserId = result_group.users[i]._id;
// 					                  	if(String(authUser._id) == result_group.users[i]._id) {
// 					                  		console.log("matchesddsssssssssssssssssssssssss")
// 					                  		result_group.join_status = true;
// 					                  	}

// 					                }




// 							res.json({
// 										status 		: 1,
// 										message 	: "Group found successfully",
// 										data 		: result_group
// 							   })

// 				    }
// 				})
//      }
//  })

// 	});




// /*----------------------------------------------------
//  		            (6) Add a Group Post
//  ----------------------------------------------------*/
// 	router.post('/add_group_post',function(req,res){
//       console.log("hiii add_group_post")


// 	  upload_group_post(req, res, function (err) {
//            if (err) {
//                   console.log(err);
//            } 

//            else {
//            	       console.log("file in group post is ", req.file)
// 		           var params             = req.body;	
// 		             User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {

// 		       	if(req.file) {
// 		       	   	params.group_post_media = req.file.filename;
// 		       	   	var media = req.file.filename;
// 		       	   	if(params.group_post_media_type == 'V') {
// 		       	   		  var thumbnail = Date.now()+'.jpg';

// 		              ffmpeg('public/images/group_post/'+media).screenshots({
// 		                        count: 1, 
// 		                        folder: 'public/images/group_post/thumbnails/',
// 		                        filename: thumbnail,
// 		                        size: '320x240'
// 		                    }).on('end', function (err,data) {
// 		                    	if(err) {
// 		                    		console.log("erorrrrrrrrrrrrrrrrr ",err)
// 		                    	}
// 		                    	console.log("dataaaa savesssssssssssssssss ",data)

// 					            })
// 					    params.thumbnail   = thumbnail;
// 				   	}
// 				   	else if(params.group_post_media_type == 'P') {
// 				   			params.thumbnail   = "";
// 				   	}


// 		        }
// 		        else {
// 		       	   	 	params.group_post_media = "";
// 		       	   	 	params.thumbnail ="";
// 		       	   	 	params.group_post_media_type = 'N';
// 		       	   }
//                  params.user_id = String(authUser._id);
//                 console.log("params after all ",params)
// 		          GroupPost.addNewGroupPost(params,function (err,groupPost){
// 			          if(err){
// 				            console.log(" error-- ",err);
// 				             res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else{					
// 					       console.log("group post added ",groupPost)	
// 					       	res.json({
// 								status 		: 1,
// 								message 	: "Photo added successfully",
// 								data 		: groupPost
// 					   })	 
// 			         }
// 		          })
// 		      }
// 		  })
// 	        }
//        })


//    });


//  /*----------------------------------------------------
//  		          (7) Add Comment to Group Post
//    ----------------------------------------------------*/
// 	router.post('/add_comment_group_post',function(req,res){
//       console.log("hiii add_comment_group_post")
//        	var params          = req.body;
//        	params.status 		= 'A';
//        	       User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 			CommentGroupPost.addCommentGroupPost(params,function (err,comment) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 			console.log("Comment added ",comment);
// 			res.json({
// 						status		: 1,
// 						message		: "Comment Added"
// 			})
// 		  }
// 		})
// 	}
//   })
//    });



//  /*----------------------------------------------------
//  		          (8) Add Like to Group Post
//    ----------------------------------------------------*/
// 	router.post('/add_like_group_post',function(req,res){

// 		console.log("hiii add_like_group_post")
// 		var params		= req.body;
// 		User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		LikeGroupPost.checkLikeGroupPost(params,function (err,check) {
// 			if(err){
// 				console.log(" error-- ",err);
// 			}
// 			else{
// 			console.log("data find succesfullly ");
// 			if(check.length === 0) {
//                  LikeGroupPost.addLikeGroupPost(params,function (err,likeGroupPost) {
//                       if(err){
// 			            	console.log(" error-- ",err);
// 			            	 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else {
// 			          	console.log("data find succesfullly ",likeGroupPost);
// 			          	res.json({
// 									status		: 1,
// 									message		: "Like Added"
// 								})
// 			          }
//                  })
// 			}

// 			else {

// 				LikeGroupPost.changeLikeStatus(check[0]._id, params.like_status, function (err,likeGroupPost) {
// 					 if(err){
// 			            	console.log(" error-- ",err);
// 			            	 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else {
// 			          	console.log("data updated succesfullly ");
// 			          	res.json({
// 									status		: 1,
// 									message		: "status Changed"
// 								})
// 			          }
// 				})
// 			}
// 		  }
// 		})
// 	}
// })

//    });



// /*---------------------------------------------------------
//  		    (9) Detail of Group Discussion
// ----------------------------------------------------------*/
// 	router.post('/detail_group_discussion',function(req,res){
// 		console.log("hiii detail_group_discussion", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//         User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		GroupPost.getAllGroupPosts(params,function (err,groupPosts) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 				console.log("data ",groupPosts)
// 				var result = [];
// 				var records = [];
// 				var checkArraylength = [];

// 				for(var i in groupPosts) {

// 					 records[i] = groupPosts[i].toObject();
// 					  getComments(records[i]._id, i, callback)
// 					  function callback(i,length,totalLikes,lastComment) {
// 					  	var thumbnail;
// 					  	var media;
// 					  	console.log("hii callback ",i,length,lastComment);
// 					  	if(lastComment) {
// 					  		lastComment.user_id.profile_image = baseUrl + profile_image_url + lastComment.user_id.profile_image;
// 					  	}
// 					  	else {
// 					  		lastComment="";
// 					  	}
// 					  	if(records[i].group_post_media_type == 'V') {
// 					  		thumbnail = baseUrl + group_post_url + 'thumbnails/' + records[i].thumbnail;
// 					  	}
// 					  	else {
// 					  		thumbnail = "";
// 					  	}
// 					  	if(records[i].group_post_media) {
//                            media = baseUrl + group_post_url + records[i].group_post_media;
// 					  	}
// 					  	else {
// 					  		media = "";
// 					  	}
// 					  	result.push({ 		
// 										    _id 						: records[i]._id,
// 										    user_id 					: {_id : records[i].user_id._id , first_name : records[i].user_id.first_name, last_name : records[i].user_id.last_name, profile_image : baseUrl + profile_image_url + records[i].user_id.profile_image},
// 										    // created_date 				: created_date,
// 										    // created_time 				: created_time,
// 										    group_post_media 			: media,
// 										    group_post_status 			: records[i].group_post_status,
// 										    group_post_media_type 		: records[i].group_post_media_type,
// 										    totalComments 				: length,
// 										    lastComment 				: lastComment,
// 										    totalLikes 					: totalLikes,
// 										    thumbnail 					: thumbnail
// 									 })
// 					  	   if(result.length === groupPosts.length) {
// 					   	console.log("result is ", result.length, groupPosts.length)
// 					   		res.json({
// 									status		: 1,
// 									message		: "Discussion get",
// 									data 		: result
// 								})
// 					   }
// 					  }

// 				}

// 		    }

// 		    function getComments(id,i,callback) {
// 		    	CommentGroupPost.getCommentsGroupPost(id,function(err,totalComments) {
// 		    		LikeGroupPost.getLikesGroupPost(id, function(err,totalLikes) {
// 		    			console.log("total likes ", totalLikes)
// 					console.log("total comments ", totalComments)
// 					var length 			= totalComments.length;
// 					var last 			= length-1;
// 					var lastComment 	= totalComments[last];

// 					   callback(i,length,totalLikes.length,lastComment);
// 					  })
// 					})	
// 		    }
// 		})

// 	}
// })

// 	});
// /////////////////////////NEED CONCERN (hours ago pending)/////////////////////////////////////

// /*----------------------------------------------------
//  		            (10) Add a Group Photo
//  ----------------------------------------------------*/
// 	router.post('/add_photo_to_group',function(req,res){
//       console.log("hiii add_photo_to_group")


// 	  upload_group_photo(req, res, function (err) {
//            if (err) {
//                   console.log(err);
//            } 

//            else {
//            	       console.log("file in photo_to_group is ", req.file)
// 		           var params             = req.body;	
// 		           params.group_photo 			= req.file.filename;

//        		 User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		          GroupPhoto.addNewGroupPhoto(params,function (err,groupPhoto){
// 			          if(err){
// 				            console.log(" error-- ",err);
// 				             res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else{					
// 					       console.log("group post added ",groupPhoto)	
// 					       	res.json({
// 								status 		: 1,
// 								message 	: "Group Post added successfully",
// 								data 		: groupPhoto
// 					   })	 
// 			         }
// 		          })
// 		      }
// 		     })

// 	        }
//        })
//    });


// /*---------------------------------------------------------
//  		    (11) Get Group Photos
// ----------------------------------------------------------*/
// 	router.post('/get_group_photos',function(req,res){
// 		console.log("hiii get_group_photos", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//          User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		GroupPhoto.getAllGroupPhotos(params,function (err,groupPhotos) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 				console.log("data ",groupPhotos)

// 				for(var i in groupPhotos) {
// 					groupPhotos[i].group_photo = baseUrl + group_photos_url + groupPhotos[i].group_photo;


// 				}
// 				res.json({
// 									status		: 1,
// 									message		: "Discussion get",
// 									data 		: groupPhotos
// 						})

// 		    }
// 		})
// 	}
// })

// 	});




// /*---------------------------------------------------------
//  		    (12) Detail of Group Discussion
// ----------------------------------------------------------*/
// 	router.post('/get_group_post_detail',function(req,res){
// 		console.log("hiii get_group_post_detail", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//          User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		GroupPost.getGroupPostDetail(params,function (err,groupPostDetail) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 				console.log("groupPostDetail ",groupPostDetail)
// 				var result={};
// 				var record;

// 					 record = groupPostDetail.toObject();
// 					  getComments(record._id, callback)
// 					  function callback(length,totalLikes,allComments) {
// 					  	var thumbnail;
// 					  	var media;

// 					  		for(var i in allComments) {

// 					   			allComments[i].user_id.profile_image = baseUrl + profile_image_url + allComments[i].user_id.profile_image;
// 					        }

// 					  	if(record.group_post_media_type == 'V') {
// 					  		thumbnail = baseUrl + group_post_url + 'thumbnails/' + record.thumbnail;
// 					  	}
// 					  	else {
// 					  		thumbnail = "";
// 					  	}
// 					  	if(record.group_post_media) {
//                            media = baseUrl + group_post_url + record.group_post_media;
// 					  	}
// 					  	else {
// 					  		media = "";
// 					  	}
// 					  	result ={ 		
// 										    _id 						: record._id,
// 										    user_id 					: {_id : record.user_id._id , first_name : record.user_id.first_name, last_name : record.user_id.last_name, profile_image : baseUrl + profile_image_url + record.user_id.profile_image},
// 										    // created_date 				: created_date,
// 										    // created_time 				: created_time,
// 										    group_post_media 			: media,
// 										    group_post_media_type 		: record.group_post_media_type,
// 										    group_post_status 			: record.group_post_status,
// 										    totalComments 				: length,
// 										    allComments 				: allComments,
// 										    totalLikes 					: totalLikes,
// 										    thumbnail 					: thumbnail
// 									 }

// 					   		res.json({
// 									status		: 1,
// 									message		: "Discussion get",
// 									data 		: result
// 								})

// 					  }



// 		    }

// 		    function getComments(id,callback) {
// 		    	CommentGroupPost.getCommentsGroupPost(id,function(err,totalComments) {
// 		    		LikeGroupPost.getLikesGroupPost(id, function(err,totalLikes) {
// 		    			console.log("total likes ", totalLikes)
// 					console.log("total comments ", totalComments)
// 					var length 			= totalComments.length;

// 					   callback(length,totalLikes.length,totalComments);
// 					  })
// 					})	
// 		    }
// 		})
// 	}
// })


// 	});



// /*---------------------------------------------------------
//  		    (13) Get Small Groups
// ----------------------------------------------------------*/
// 	router.post('/get_small_groups',function(req,res) {
// 		console.log("hiii get_small_groups")

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//         console.log("params ",params)
//         	 User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		SmallGroup.getAllSmallGroups(params,function (err,smallGroups) {
// 			if(err)
// 			{
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}

// 			else {
// 				 console.log("smallGroups found ",smallGroups )
// 				 	var result_groups = [];
// 				       for(var i in smallGroups ) {
// 				       	 result_groups[i] 						= smallGroups[i].toObject();
// 				       	 result_groups[i].total_members 		= result_groups[i].users.length;
// 			             result_groups[i].small_group_image 			= baseUrl + small_group_image_url + result_groups[i].small_group_image;
// 			               // for(var j in result_groups[i].admin_users) {
// 			               //   	result_groups[i].admin_users[j].profile_image = baseUrl + profile_image_url + result_groups[i].admin_users[j].profile_image; 
// 			               //  }
// 			               result_groups[i].join_status = false;
// 			                for(var j in result_groups[i].users) {
// 			                  	result_groups[i].users[j].profile_image = baseUrl + profile_image_url + result_groups[i].users[j].profile_image; 
// 			                  	console.log("iddd is ",result_groups[i].users[j]._id)
// 			                  	if(String(authUser._id)  == result_groups[i].users[j]._id) {
// 			                  		console.log("hiii matchhhhhh ",result_groups[i].users[j]._id, params.user_id)
// 			                  		result_groups[i].join_status = true;
// 			                  	}

// 			                }


// 				       }

// 					res.json({
// 								status 		: 1,
// 								message 	: "Groups found successfully",
// 								data 		: result_groups
// 					   })


// 			}


// 		})
// 	}
// })

// 	});




// /*---------------------------------------------------------
//  		    (14) Get Detail of Small Group
// ----------------------------------------------------------*/
// 	router.post('/detail_small_group',function(req,res){
// 		console.log("hiii detail_small_group", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//      User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);    
// 		SmallGroup.getSmallGroupDetail(params,function (err,smallGroupDetail) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{

// 			 console.log("smallGroupDetail found ",smallGroupDetail)
// 				 	var result_group ;

// 				       	 result_group 								= smallGroupDetail.toObject();
// 				       	 result_group.total_members 				= result_group.users.length;
// 			             result_group.small_group_image 			= baseUrl + small_group_image_url + result_group.small_group_image;

// 			             result_group.join_status 			= false;

// 			                for(var i in result_group.users) {
// 			                  	result_group.users[i].profile_image = baseUrl + profile_image_url + result_group.users[i].profile_image; 
// 			                  	if(params.user_id == result_group.users[i]._id) {
// 			                  		result_group.join_status = true;
// 			                  	}

// 			                }




// 					res.json({
// 								status 		: 1,
// 								message 	: "Group found successfully",
// 								data 		: result_group
// 					   })

// 		    }
// 		})
// 	}
// })

// 	});






// /*----------------------------------------------------
//  		            (15) Add a Group Post
//  ----------------------------------------------------*/
// 	router.post('/add_wall_post',function(req,res){
//       console.log("hiii add_wall_post")


// 	  upload_wall_post(req, res, function (err) {
//            if (err) {
//                   console.log(err);
//            } 

//            else {
//            	       console.log("file in group post is ", req.file)
// 		           var params             = req.body;
// 		            User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);    	
// 		       	if(req.file) {
// 		       	   	params.group_post_media = req.file.filename;
// 		       	   	var media = req.file.filename;
// 		       	   	if(params.wall_post_media_type == 'V') {
// 		       	   		  var thumbnail = Date.now()+'.jpg';

// 		              ffmpeg('public/images/wall_post/'+media).screenshots({
// 		                        count: 1, 
// 		                        folder: 'public/images/wall_post/thumbnails/',
// 		                        filename: thumbnail,
// 		                        size: '320x240'
// 		                    }).on('end', function (err,data) {
// 		                    	if(err) {
// 		                    		console.log("erorrrrrrrrrrrrrrrrr ",err)
// 		                    	}
// 		                    	console.log("dataaaa savesssssssssssssssss ",data)

// 					            })
// 					    params.thumbnail   = thumbnail;
// 				   	}
// 				   	else if(params.wall_post_media_type == 'P') {
// 				   			params.thumbnail   = "";
// 				   	}


// 		        }
// 		        else {
// 		       	   	 	params.wall_post_media = "";
// 		       	   	 	params.thumbnail ="";
// 		       	   	 	params.wall_post_media_type = 'N';
// 		       	   }

//                 console.log("params after all ",params)
// 		          WallPost.addNewWallPost(params,function (err,wallPost){
// 			          if(err){
// 				            console.log(" error-- ",err);
// 				             res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else{					
// 					       console.log("group post added ",wallPost)	
// 					       	res.json({
// 								status 		: 1,
// 								message 	: "Photo added successfully",
// 								data 		: wallPost
// 					   })	 
// 			         }
// 		          })
// 		      }
// 		  })
// 	        }
//        })


//    });


//  /*----------------------------------------------------
//  		          (16) Add Comment to Wall Post
//    ----------------------------------------------------*/
// 	router.post('/add_comment_wall_post',function(req,res){
//       console.log("hiii add_comment_group_post")
//        	var params          = req.body;
//        	params.status 		= 'A';
//        	       User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 			CommentWallPost.addCommentWallPost(params,function (err,comment) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 			console.log("Comment added ",comment);
// 			res.json({
// 						status		: 1,
// 						message		: "Comment Added"
// 			})
// 		  }
// 		})
// 	}
//   })
//    });



//  /*----------------------------------------------------
//  		          (17) Add Like to Wall Post
//    ----------------------------------------------------*/
// 	router.post('/add_like_wall_post',function(req,res){

// 		console.log("hiii add_like_wall_post")
// 		var params		= req.body;
// 		User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		LikeWallPost.checkLikeWallPost(params,function (err,check) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 			console.log("data find succesfullly ");
// 			if(check.length === 0) {
//                  LikeWallPost.addLikeWallPost(params,function (err,likeGroupPost) {
//                       if(err){
// 			            	console.log(" error-- ",err);
// 			          }
// 			          else {
// 			          	console.log("data find succesfullly ",likeGroupPost);
// 			          	res.json({
// 									status		: 1,
// 									message		: "Like Added"
// 								})
// 			          }
//                  })
// 			}

// 			else {

// 				LikeWallPost.changeLikeStatus(check[0]._id, params.like_status, function (err,likeGroupPost) {
// 					 if(err){
// 			            	console.log(" error-- ",err);
// 			            	 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			          }
// 			          else {
// 			          	console.log("data updated succesfullly ");
// 			          	res.json({
// 									status		: 1,
// 									message		: "status Changed"
// 								})
// 			          }
// 				})
// 			}
// 		  }
// 		})
// 	}
// })

//    });




// /*---------------------------------------------------------
//  		    (18) Get Wall Posts
// ----------------------------------------------------------*/
// 	router.post('/get_wall_posts',function(req,res){
// 		console.log("hiii get_wall_posts", req.body)

// 		var params		= req.body;
// 		var baseUrl 	= req.protocol+ '://' + req.get('host');

//         User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id);
// 		WallPost.getAllWallPosts(params,function (err,wallPosts) {
// 			if(err){
// 				console.log(" error-- ",err);
// 				 res.json({
// 									status : 0,
// 									message : "Something wents wrong!",						
// 									data : err	
// 							})	
// 			}
// 			else{
// 				console.log("data ",wallPosts)
// 				var result = [];
// 				var records = [];
// 				var checkArraylength = [];

// 				for(var i in wallPosts) {

// 					 records[i] = wallPosts[i].toObject();
// 					  getComments(records[i]._id, i, callback)
// 					  function callback(i,length,totalLikes,lastComment) {
// 					  	var thumbnail;
// 					  	var media;
// 					  	console.log("hii callback ",i,length,lastComment);
// 					  	if(lastComment) {
// 					  		lastComment.user_id.profile_image = baseUrl + profile_image_url + lastComment.user_id.profile_image;
// 					  	}
// 					  	else {
// 					  		lastComment="";
// 					  	}
// 					  	if(records[i].group_post_media_type == 'V') {
// 					  		thumbnail = baseUrl + group_post_url + 'thumbnails/' + records[i].thumbnail;
// 					  	}
// 					  	else {
// 					  		thumbnail = "";
// 					  	}
// 					  	if(records[i].group_post_media) {
//                            media = baseUrl + group_post_url + records[i].group_post_media;
// 					  	}
// 					  	else {
// 					  		media = "";
// 					  	}
// 					  	result.push({ 		
// 										    _id 						: records[i]._id,
// 										    user_id 					: {_id : records[i].user_id._id , first_name : records[i].user_id.first_name, last_name : records[i].user_id.last_name, profile_image : baseUrl + profile_image_url + records[i].user_id.profile_image},
// 										    // created_date 				: created_date,
// 										    // created_time 				: created_time,
// 										    wall_post_media 			: media,
// 										    wall_post_status 			: records[i].wall_post_status,
// 										    wall_post_media_type 		: records[i].wall_post_media_type,
// 										    totalComments 				: length,
// 										    lastComment 				: lastComment,
// 										    totalLikes 					: totalLikes,
// 										    thumbnail 					: thumbnail
// 									 })
// 					  	   if(result.length === wallPosts.length) {
// 					   	console.log("result is ", result.length, wallPosts.length)
// 					   		res.json({
// 									status		: 1,
// 									message		: "Wall posts get succesfullly",
// 									data 		: result
// 								})
// 					   }
// 					  }

// 				}

// 		    }

// 		    function getComments(id,i,callback) {
// 		    	CommentWallPost.getCommentsWallPost(id,function(err,totalComments) {
// 		    		LikeWallPost.getLikesWallPost(id, function(err,totalLikes) {
// 		    			console.log("total likes ", totalLikes)
// 					console.log("total comments ", totalComments)
// 					var length 			= totalComments.length;
// 					var last 			= length-1;
// 					var lastComment 	= totalComments[last];

// 					   callback(i,length,totalLikes.length,lastComment);
// 					  })
// 					})	
// 		    }
// 		})

// 	}
// })

// 	});
// /////////////////////////NEED CONCERN (hours ago pending)/////////////////////////////////////



// /*----------------------------------------------------
//  		          (19)   Logout  
//    ----------------------------------------------------*/

// router.post('/logout',function(req,res){
//        console.log("hiii logout")

//        var params = req.body;
//         User.getProfile(params,function(err,authUser) {
//            				console.log('auth user ',authUser)
// 		          	if(authUser === null) {
// 		          			 res.json({
// 					               status		: 2,
// 			    	               message		: "It seems like you have logged in from another device. Please Sign in again."

// 				        	})	
// 		          	}
// 		      else {
// 		      	params.user_id = String(authUser._id)
//        User.logoutUser(params, function(err, user) {
//        	if(err) {
//        		console.log("error ",err)
//        		 res.json({
// 											       status					: false,
// 											       err 		 				: err
// 								            })
//        	}

//           res.json({
// 					       status					: true,
// 					       message					: "Successfully logout!",
// 					       data 					: user
// 		            })

//        })

//     }
// })


//    });


module.exports = router;