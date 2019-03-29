var express = require('express');
var router = express.Router();
var passwordhash      = require('password-hash');
var nodemailer        = require('nodemailer'); 
var crypto            =require('crypto');
var path              =require('path');
var multer            = require('multer');
//var sortBy          = require('sort-by');


var Agegroup                  = require('../models/ageGroup');
var Skill                     = require('../models/skillLevel');
var Sport                     = require('../models/sport');
var Gender                    = require('../models/gender');
var AdminProfile              = require('../models/adminprofile');
var User                      = require('../models/user');
var ScrimmageRequest          = require('../models/scrimmagerequest');
var ReportedUser              = require('../models/reporteduser');
var Transaction               = require('../models/transaction')
var ComplaintSuggestion       = require('../models/complaintsuggestion');
var Privacy                   = require('../models/privacy');
var Term                      = require('../models/term');



var storage_privacy = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log('File', file);
    callback(null, "public/pdfs/privacy/");
  },
  filename: function (req, file, callback) {
    console.log('filename', file);
    image = Date.now() + "_" + file.originalname;
    console.log('imageExtenstion', image);
    callback(null, image);
  }
});


var storage_terms = multer.diskStorage({
  destination: function (req, file, callback) {
    console.log('File', file);
    callback(null, "public/pdfs/terms/");
  },
  filename: function (req, file, callback) {
    console.log('filename', file);
    image = Date.now() + "_" + file.originalname;
    console.log('imageExtenstion', image);
    callback(null, image);
  }
});




var upload_privacy          = multer({ storage: storage_privacy }).single('privacy_pdf')
var upload_terms            = multer({ storage: storage_terms }).single('terms_pdf')




var adminprofile_image_url    = '/images/admin/profile/';
var profile_image_url         = '/images/profile/';
var team_images               = '/images/team/';
var privacy_url               = '/pdfs/privacy/';
var terms_url                 = '/pdfs/terms/';



router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../admin.html'));
});



router.post('/login', function (req, res) {
 console.log("hii login",req.body);
  var params = req.body;
  var baseUrl = req.protocol + '://' + req.get('host');

      AdminProfile.adminLogin(params, function (err, admin) {
          if (err) {
        res.json({
            status : false,
            message : "Login failed.",            
            data : err  
        })  
      }     
      if(admin.length === 0){
          res.json({
            status : false,
            message : "Login failed email mismatch"             
          })  
        }
        else {              
        var check = passwordhash.verify(params.password, admin[0].password);
        if(check == true)
        {
          
          admin[0].profile_image = baseUrl + adminprofile_image_url + admin[0].profile_image;

          res.json({
            status : true,
            message : "login successfully",
            data : admin[0]
          })  
        }
        else{
          res.json({
              status : false,
              message : "Login failed password mismatch."
          })    
      }
    }
   
  })
     
});






router.get('/get_registered_users', function (req, res) {
 console.log("hiii get_registered_users");
  var baseUrl   = req.protocol+ '://' + req.get('host');
   User.getRegisteredUsers(function(err, registerUsers) {
      if(err) {
        console.log(err) 
        res.json({
                    status      : false,
                    message     : err
          })    
      }
   var resultRegistered= [];
    for(var i in registerUsers) {
      resultRegistered[i] = registerUsers[i].toObject();
    resultRegistered[i].profile_image = baseUrl + profile_image_url + resultRegistered[i].profile_image;
    var serial  = parseInt(i) +1;
     resultRegistered[i].serial_no = serial;
  }
   

                 res.json({
                    status      : true,
                    message     : "Total Registered Users found successfully",
                    data        : resultRegistered
            }) 

      
     
   }) 
     
});





router.get('/get_active_users', function (req, res) {
 console.log("hiii get_active_users");
  var baseUrl   = req.protocol+ '://' + req.get('host');
  
       User.getActiveUsers(function(err,activeUsers) {
       
               var resultActive= [];
                  for(var i in activeUsers) {
                    resultActive[i] = activeUsers[i].toObject();
                  resultActive[i].profile_image = baseUrl + profile_image_url + resultActive[i].profile_image;
                  var serial  = parseInt(i) +1;
                   resultActive[i].serial_no = serial;
                }
                //  console.log("hiiii resultActive ",resultActive)

                 res.json({
                    status      : true,
                    message     : "Active Users found successfully",
                    data        : resultActive
            }) 

       })
  
     
});



router.post('/get_user_detail', function (req, res) {
 console.log("hiiii get_user_detail ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
       User.getUserDetail(params,function(err,userDetail) {

                  var userDetailResult = userDetail.toObject();
                  userDetail.profile_image = baseUrl + profile_image_url + userDetail.profile_image;
               
                //  console.log("hiiii resultActive ",resultActive)

                 res.json({
                    status      : true,
                    message     : "User Detail found successfully",
                    data        : userDetail
            }) 

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
                              status : false,
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
                                                status : false,
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
                                              status    : true,
                                              message   : "Scrimmages found successfully",
                                              data    : sendData
                                           })



                                    }


                                })
                  

                  }


              })


  
  });
  



router.get('/get_reported_users', function (req, res) {
 console.log("hiiii get_reported_users ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
       ReportedUser.getAllReportedUsers(function(err,reportedUsers) {

                  var resultReported= [];
                    for(var i in reportedUsers) {
                      resultReported[i] = reportedUsers[i].toObject();
                    resultReported[i].user_id.profile_image = baseUrl + profile_image_url + resultReported[i].user_id.profile_image;
                    resultReported[i].other_user_id.profile_image = baseUrl + profile_image_url + resultReported[i].other_user_id.profile_image;
                    var serial  = parseInt(i) +1;
                     resultReported[i].serial_no = serial;
                  }

                 res.json({
                    status      : true,
                    message     : "Reported Users found successfully",
                    data        : resultReported
            }) 

       })
  
});





router.post('/suspend_user', function (req, res) {
 console.log("hiiii suspend_user ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
       User.updateUserStatus(params,function(err,userDetail) {

                 res.json({
                    status      : true,
                    message     : "User Detail updated successfully",
                    data        : userDetail
            }) 

       })
  
});



router.get('/get_pyament_history', function (req, res) {
 console.log("hiiii get_pyament_history ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
       Transaction.getAllTransactions(function(err,payments) {

          var resultPayments = [];
          for(var i in payments) {
            resultPayments[i] = payments[i].toObject();
             resultPayments[i].user_id.profile_image = baseUrl + profile_image_url + resultPayments[i].user_id.profile_image;
          }
                 res.json({
                    status      : true,
                    message     : "Payment history found successfully",
                    data        : resultPayments
            }) 

       })
  
});



router.get('/get_complaints_suggestions', function (req, res) {
 console.log("hiiii get_complaints_suggestions ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
       ComplaintSuggestion.getAllComplaintSuggestion(function(err,suggestions) {
         var resultSuggestions = [];
          for(var i in suggestions) {
            resultSuggestions[i] = suggestions[i].toObject();
             resultSuggestions[i].user_id.profile_image = baseUrl + profile_image_url + resultSuggestions[i].user_id.profile_image;
          }
          
                 res.json({
                    status      : true,
                    message     : "Suggestions found successfully",
                    data        : resultSuggestions
            }) 

       })
  
});




router.post('/add_sport', function (req, res) {
 console.log("hiiii add_sport ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
    params.status = 'A';
       Sport.addSport(params,function(err,sport) {
          console.log("hiiii sport")
                 res.json({
                    status      : true,
                    message     : "Sport added successfully",
                    data        : sport
            }) 

       })
  
});





router.get('/get_sports', function (req, res) {
  console.log("hii get_sports")
  Sport.getSports(function (err, sports) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', sports);

          var resultsports= [];
            for(var i in sports) {
              resultsports[i] = sports[i].toObject();
               var serial  = parseInt(i) +1;
             resultsports[i].serial_no = serial;
          }
      res.json({
        status: true,
        message: 'Records Found',
        data: resultsports
      })
    }
  })

});



router.post('/add_skill', function (req, res) {
 console.log("hiiii add_skill ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
    params.status = 'A';
       Skill.addSkill(params,function(err,skill) {

                 res.json({
                    status      : true,
                    message     : "Skill added successfully",
                    data        : skill
            }) 

       })
  
});






router.get('/get_skills', function (req, res) {

  console.log("Get Skill Level")
  Skill.getSkill(function (err, skills) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', skills);
        var resultskills = [];
            for(var i in skills) {
              resultskills[i] = skills[i].toObject();
               var serial  = parseInt(i) +1;
             resultskills[i].serial_no = serial;
          }
      res.json({
        status: true,
        message: 'Records Found',
        data: resultskills
      })
    }
  })

});



router.post('/add_age_group', function (req, res) {
 console.log("hiiii add_age_group ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
    params.status = 'A';
       Agegroup.addAgeGroup(params,function(err,ageGroup) {

                 res.json({
                    status      : true,
                    message     : "Age Group added successfully",
                    data        : ageGroup
            }) 

       })
  
});



router.get('/get_age_groups', function (req, res) {
  console.log("Get Age Group")
  Agegroup.getAgeGroup(function (err, groups) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', groups);
        var resultgroups = [];
            for(var i in groups) {
              resultgroups[i] = groups[i].toObject();
               var serial  = parseInt(i) +1;
             resultgroups[i].serial_no = serial;
          }
      res.json({
        status: true,
        message: 'Records Found',
        data: resultgroups
      })
    }
  })

});






  router.post('/delete_list',function(req,res){
      console.log("hiii /admin/delete_list")
   
            console.log("dataaaaaaa in delete_list is ", req.body)
              var params               = req.body; 
              
              if(params.type === 'SP') {
                       Sport.deleteSport(params.type_id,function (err,deletedSport){
                            if(err){
                                console.log(" error-- ",err);
                            }
                            else{ 
                              res.json({
                                         status     : true,
                                         message    : "Sport deleted successfully",
                                         data       : deletedSport
                              })           
                           }
                        })
              }

              else if(params.type === 'SK') {
                       Skill.deleteSkill(params.type_id,function (err,deletedSkill){
                            if(err){
                                console.log(" error-- ",err);
                            }
                            else{ 
                         console.log("hiii deletedSkill ",deletedSkill)
                              res.json({
                                         status     : true,
                                         message    : "Skill deleted successfully",
                                         data       : deletedSkill
                              })           
                           }
                        })
              }
              else if(params.type === 'AG') {
                       Agegroup.deleteAgeGroup(params.type_id,function (err,deletedAgeGroup){
                            if(err){
                                console.log(" error-- ",err);
                            }
                            else{ 
                         
                              res.json({
                                         status     : true,
                                         message    : "Age group deleted successfully",
                                         data       : deletedAgeGroup
                              })           
                           }
                        })
              }
               else if(params.type === 'GN') {
                       Gender.deleteGender(params.type_id,function (err,deletedGender){
                            if(err){
                                console.log(" error-- ",err);
                            }
                            else{ 
                         
                              res.json({
                                         status     : true,
                                         message    : "Gender deleted successfully",
                                         data       : deletedGender
                              })           
                           }
                        })
              }
           

       
   });




/*----------------------------------------------------
              (38)send_promo_code
   ----------------------------------------------------*/


router.post('/send_promo_code',function(req,res){
      console.log("hiii send_promo_code")
var params = req.body;
console.log("params ",params)
 var baseUrl  = req.protocol+ '://' + req.get('host');
  
  User.updatePromoCode(params,function(err, user) {
    if (err) {
      res.send({ error: err });
    }
    console.log("userrr",user)
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
                to: user.email,
                subject: 'Url for email Verification',
                html: 'Hi ' + user.first_name + ' You got a promo code ' + params.promo_code
              };
              //console.log("mailoptions created ",mailOptions)
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log("errorrrrrrrr ", error);
                  res.json({
                    status: false,
                    message: "Not a valid email"
                  })
                } else {
                    user.profile_image = baseUrl + profile_image_url + user.profile_image;
                  console.log('Email sent: ' + info.response);
                  res.json({
                    status: true,
                    message: "Promo Code sent to user.",
                    data: user
                  })

                }
              });

      
      });


   });




router.post('/add_gender', function (req, res) {
 console.log("hiiii add_gender ");
  var baseUrl   = req.protocol+ '://' + req.get('host');
    var params = req.body;
    params.status = 'A';
       Gender.addGender(params,function(err,gender) {

                 res.json({
                    status      : true,
                    message     : "Gender added successfully",
                    data        : gender
            }) 

       })
  
});



router.get('/get_genders', function (req, res) {
  console.log("Get get_genders")
  Gender.getGenders(function (err, genders) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('response', genders);
        var resultgenders = [];
            for(var i in genders) {
              resultgenders[i] = genders[i].toObject();
               var serial  = parseInt(i) +1;
             resultgenders[i].serial_no = serial;
          }
      res.json({
        status: true,
        message: 'Genders Found',
        data: resultgenders
      })
    }
  })

});



 /*---------------------------------------
      (15)  update_privacy 
 ----------------------------------------*/
  router.post('/update_privacy',function(req,res){
      console.log("hiii update_privacy")
       var baseUrl   = req.protocol+ '://' + req.get('host');

    upload_privacy(req, res, function (err) {

           if (err) {
                  console.log(err);
                 // res.statusCode = er;
                   res.json({
            status    : false,
            message   : "Something went wrong!",            
            data    : err 
        })  
           } 

           else {
            console.log("files in update_privacy is ", req.file)
            console.log("dataaaaaaa in update_privacy is ", req.body)
            
              var params               = req.body;  
             
              params.privacy_pdf = req.file.filename;
             
              Privacy.updatePrivacy(params,function (err,privacy){
                if(err){
                    console.log(" error-- ",err);
                    res.statusCode = er;
                     res.json({
                  status : 0,
                  message : "Something went wrong!",            
                  data : err  
              })  
                }
                else{ 
                  console.log("hiiiii privacy ",privacy)
                  privacy.privacy_pdf = baseUrl + privacy_url + privacy.privacy_pdf;
                  
                  res.json({
                         status   : true,
                         message  : "successfully updated privacy",
                         data     : privacy
                  })           
               }
              })
             
          }
       })
 
   });


    
  router.get('/get_privacy', function (req, res) {
    console.log("hiiii get_Privacy")
     var baseUrl = req.protocol + '://' + req.get('host');
    Privacy.getPrivacy(function (err, privacy) {
      if (err) {
        console.log('Error', err);
      } 
      else {
        console.log("hiiiii privacy ",privacy)
           privacy.privacy_pdf = baseUrl + privacy_url + privacy.privacy_pdf;
                    
                    res.json({
                           status   : true,
                           message  : "successfully found privacy",
                           data     : privacy
                    })  
      }
    })

  });











 /*---------------------------------------
      (15)  update_terms 
 ----------------------------------------*/
  router.post('/update_terms',function(req,res){
      console.log("hiii update_terms")
       var baseUrl   = req.protocol+ '://' + req.get('host');

    upload_terms(req, res, function (err) {

           if (err) {
                  console.log(err);
                  res.statusCode = er;
                   res.json({
                          status    : 0,
                          message   : "Something went wrong!",            
                          data    : err 
                      })  
           } 

           else {
            console.log("files in update_terms is ", req.file)
            console.log("dataaaaaaa in update_terms is ", req.body)
            
              var params               = req.body;  
             
              params.terms_pdf = req.file.filename;
             
              Term.updateTerms(params,function (err,terms){
                if(err){
                    console.log(" error-- ",err);
                    res.statusCode = er;
                     res.json({
                                  status : 0,
                                  message : "Something went wrong!",            
                                  data : err  
                              })  
                }
                else{ 
                  console.log("hiiiii terms ",terms)
                  terms.terms_pdf = baseUrl + terms_url + terms.terms_pdf;
                  
                  res.json({
                         status   : true,
                         message  : "successfully updated terms",
                         data     : terms
                  })           
               }
              })
             
          }
       })
 
   });


    
  router.get('/get_terms', function (req, res) {
    console.log("hiiii get_terms")
     var baseUrl = req.protocol + '://' + req.get('host');
    Term.getTerms(function (err, terms) {
      if (err) {
        console.log('Error', err);
      } 
      else {
        console.log("hiiiii terms ",terms)
           terms.terms_pdf = baseUrl + terms_url + terms.terms_pdf;
                    
                    res.json({
                           status   : true,
                           message  : "successfully found privacy",
                           data     : terms
                    })  
      }
    })

  });



module.exports = router