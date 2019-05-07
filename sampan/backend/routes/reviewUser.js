const router = require('express').Router(),
  reviewUserControllers = require('../controllers/reviewUser')
  passport = require('passport')
  passportJWT = passport.authenticate('jwt', {session: false})

router
  .route('/')
  .post(passportJWT, reviewUserControllers.create)

  module.exports = router;