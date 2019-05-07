const router = require('express').Router(),
  cartController = require('../controllers/cart'),
  passport = require('passport'),
  passportJWT = passport.authenticate('jwt', { session: false })

router
  .route('/')
  .get(passportJWT, cartController.showCart) /* Show Item in Cart */
  .post(passportJWT, cartController.addCart) /* Add Item to Cart */
  .delete(passportJWT, cartController.deleteCart) /* Delete Item in Cart */

module.exports = router;
