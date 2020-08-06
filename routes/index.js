const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  console.log(req.user.name)
  if (req.user.email === "admin@admin.com") {
    res.render('admin')
  } else {
    res.render('dashboard', {
      user: req.user
    })
  }
})

module.exports = router;
