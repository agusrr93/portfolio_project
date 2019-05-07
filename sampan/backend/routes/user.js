const router = require('express').Router(),
  uploadAvatar = require('../middleware/multerCloudinary'),
  userControllers = require('../controllers/user'),
  transactionController = require('../controllers/transaction'),
  passport = require('passport'),
  passportConf = require('../middleware/passport'),
  passportJWT = passport.authenticate('jwt', { session: false }),
  isAuthorized = require('../middleware/authorized')


router.put('/', passportJWT, uploadAvatar.single('avatar'), userControllers.update)
router.delete('/', passportJWT, userControllers.delete)
router.get('/', passportJWT, userControllers.showProfil)
router.get('/all', userControllers.showAll)

router.put('/code', passportJWT, userControllers.updateCode)
router.get('/mitra', userControllers.showMitra)
router.get('/showorder', passportJWT, transactionController.showOrder)
router.get('/showorderuser', passportJWT, transactionController.showOrderUser)
router.put('/done', passportJWT, isAuthorized.buyerAuthorized, transactionController.done)
router.get('/:transactionId', passportJWT, transactionController.mitraShowDetailOrder)

module.exports = router
