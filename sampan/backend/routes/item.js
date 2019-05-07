const router = require('express').Router(),
  itemController = require('../controllers/item'),
  multerCloudinary = require('../middleware/multerCloudinary'),
  passport = require('passport'),
  passportConf = require('../middleware/passport'),
  passportSignIn = passport.authenticate('local', { session: false }),
  passportJWT = passport.authenticate('jwt', { session: false }),
  isAuthorized = require('../middleware/authorized'),
  verifyUser = require('../middleware/verifyUser')

router
  .post('/create', passportJWT, verifyUser.userVerify, multerCloudinary.array('photos', 6), itemController.create)
  .get('/:id/detail', itemController.detail)
  .get('/all', itemController.all)
  .get('/allSold', itemController.allSold)
  .get('/allNewest', itemController.allNewest)
  .put('/:id/update', passportJWT, isAuthorized.isAuthorized, multerCloudinary.array('photos', 6), itemController.update)
  .delete('/:id/delete', passportJWT, isAuthorized.isAuthorized, itemController.delete)
  .get('/find', itemController.find)

module.exports = router;
