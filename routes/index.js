const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');
const Response = require('../models/Response')
// const buzzerTimer = require('../models/buzzerTimer')

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user.email === "admin@admin.com") {
    res.render('admin')
  } else {
    Response.find({}, (err, documents) => {
      // documents.length = 5;
      if (err) throw err;
      else {
        documents = documents.sort(function(a, b) {
          return parseFloat(a.timeStamp) - parseFloat(b.timeStamp);
        });
        if (documents.length > 1) {
          // console.log(documents.length)
          for (var i = 0; i < documents.length; i++) {
            if (i === 0) {
              continue;
            } else {
              documents[i].timeStamp = (Number(documents[i].timeStamp) - Number(documents[0].timeStamp))/1000

              // console.log(Number(documents[i].timeStamp) - Number(documents[0].timeStamp))
            }
            // console.log(i)
            if (i == documents.length - 1) {
              documents[0].timeStamp = 0;
              res.render('dashboard', {
                user: req.user,
                responses: documents
              })
            }
          }
        } else {
          // console.log(':(')
          res.render('dashboard', {
            user: req.user,
            responses: documents
          })
        }
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

module.exports = router;
