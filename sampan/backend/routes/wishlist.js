const router = require('express').Router(),
  passport = require('passport'),
  passportJWT = passport.authenticate('jwt', {session: false}),
  wishListController = require('../controllers/wishlist')
  

router
  .route('/')
  .get(passportJWT, wishListController.get)
  .post(passportJWT, wishListController.post)

module.exports = router 