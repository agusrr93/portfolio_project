const router = require('express').Router(),
  reviewControllers = require('../controllers/reviewItem')
  passport = require('passport')
  passportJWT = passport.authenticate('jwt', {session: false})
  reviewAuth = require('../middleware/authorized').reviewAuthorized

router
  .route('/')
  .post(passportJWT, reviewAuth, reviewControllers.create)


  module.exports = router;