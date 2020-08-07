const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Response = require('../models/Response')
const buzzerTimer = require('../models/BuzzerTimer');
const BuzzerTimer = require('../models/BuzzerTimer');
const { response } = require('express');
const e = require('express');

// Welcome Page

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.email === "admin@admin.com") {
    Response.find({}, (err, documents) => {
      // documents.length = 5;
      if (err) throw err;
      else {
        documents = documents.sort(function(a, b) {
          return parseFloat(a.timeStamp) - parseFloat(b.timeStamp);
        });
        BuzzerTimer.find({}, (err, doc) => {
          if (doc[0]) {
            time = Number(doc[0].time);          
            if (documents.length > 1) {
              // console.log(documents.length)
              for (var i = 0; i < documents.length; i++) {
                // console.log((Number(documents[i].timeStamp) - time)/1000)
                documents[i].timeStamp = (Number(documents[i].timeStamp) - time)/1000  
                  // console.log(Number(documents[i].timeStamp) - Number(documents[0].timeStamp))
                
                // console.log(i)
                if (i == documents.length - 1) {
                  // documents[0].timeStamp = (Number(documents[i].timeStamp) - time)/1000  
                  res.render('admin', {
                    user: req.user,
                    responses: documents
                  })
                }
              }
            } else if (documents.length > 0) {
              // console.log(':(')
              // documents[0].timeStamp = (Number(documents[0].timeStamp) - time)/1000
              documents[0].timeStamp = ((Number(documents[0].timeStamp) - Number(time)) /1000)
              res.render('admin', {
                user: req.user,
                responses: documents
              })
            } else {
              res.render('admin', {
                user: req.user,
                responses: documents
              })
            }
          } else {
            res.render('admin', {
              user: req.user,
              responses: documents
            })
          }       
        })
      }
    })
  } else {
    Response.find({}, (err, documents) => {
      // documents.length = 5;
      if (err) throw err;
      else {
        documents = documents.sort(function(a, b) {
          return parseFloat(a.timeStamp) - parseFloat(b.timeStamp);
        });
        BuzzerTimer.find({}, (err, doc) => {
          if (doc[0]) {
            // console.log(doc[0].time)
            time = Number(doc[0].time);
            timeEnd = Number(doc[0].timeEnd)
            // console.log(timeEnd)
            if (documents.length > 1) {
              // console.log(documents.length)
              for (var i = 0; i < documents.length; i++) {
                // console.log((Number(documents[i].timeStamp) - time)/1000)
                documents[i].timeStamp = (Number(documents[i].timeStamp) - time)/1000
    
                  // console.log(Number(documents[i].timeStamp) - Number(documents[0].timeStamp))
              
                // console.log(i)
                
                if (i == documents.length - 1) {
                  res.render('dashboard', {
                    user: req.user,
                    responses: documents,
                    time: time,
                    end: timeEnd
                  })
                }
              }
            } else if (documents.length > 0) {
              // console.log(':(')
              // documents[0].timeStamp = (Number(documents[0].timeStamp) - time)/1000
              documents[0].timeStamp = ((Number(documents[0].timeStamp) - Number(time)) /1000)
              res.render('dashboard', {
                user: req.user,
                responses: documents,
                time: time,
                end: timeEnd
              })
            } else {
              res.render('dashboard', {
                user: req.user,
                responses: documents,
                time: time,
                end: timeEnd
              })
            }
          } else {
            res.render('dashboard', {
              user: req.user,
              responses: documents,
              time: 20000000000000000000000000000000000000000000,
              end: 2000000000000000000000000000000000000000000000
            })
          }
        })
      }
    })
  }
})

router.post('/buzz', ensureAuthenticated, (req, res) => {
  let useremail = req.user.email;
  let timestamp = req.body.time;

  Response.findOne({user: req.user.email}, (err, body) => {
    if (err) throw err;
    if (body) {
      res.redirect('/dashboard')
    } else {
      // console.log('hmmmmm')
      const response = new Response({
        user: useremail,
        timeStamp: timestamp,
        name: req.user.name,
        schoolAndLoc: req.user.schoolAndLoc
      })
      response.save()
    }
  })
})

router.post('/activateBuzzer', ensureAuthenticated, (req, res) => {
  if (req.user.email == 'admin@admin.com') {
    Response.remove({}, function(err) { 
      if (err) throw err
      console.log('collection removed') 
    }).then(() => {
      buzzerTimer.deleteMany({}).then(() => {
        Response.deleteMany({})
        var timestamp = Number(req.body.time) + 10000;
        // timeStamp = Number(timeStamp);
        
        /*
        =======================================================================================

        CHANGE THE VALUES BELOW TO CHANGE THE TIME AND TIME END FOR THE BUZZER

        =======================================================================================
        */

        const buzzer = new buzzerTimer({
          time: timestamp,
          timeEnd: Number(req.body.time) + 20000
        });
        buzzer.save()
        .then(() => {
          res.redirect(req.get('referer'));
          console.log(req.body.time)
        })
      })
    })
  }
})

router.get('/deactivateBuzzer', ensureAuthenticated, (req, res) => {
  Response.remove({}, function(err) { 
    if (err) throw err
    console.log('collection removed') 
  }).then(() => {
    if (req.user.email === "admin@admin.com") {
      BuzzerTimer.deleteMany({}).then(() => {
        res.redirect(req.get('referer'));
      })
    }
  })  
})

module.exports = router;
