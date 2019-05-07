const router = require('express').Router(),
  transactionController = require('../controllers/transaction'),
  passport = require('passport'),
  passportJWT = passport.authenticate('jwt', { session: false }),
  upload = require('../middleware/multerCloudinary'),
  isAuthorized = require('../middleware/authorized')

router
  .route('/')
  .post(passportJWT, transactionController.checkout)
  .put(passportJWT, upload.single('photo'), isAuthorized.buyerAuthorized, transactionController.updateTransactionJourney)

router.post('/checkout', passportJWT, transactionController.confirmOrder)
router.put('/cancel', passportJWT, isAuthorized.sellerAuthorized, transactionController.cancel)
router.put('/process', passportJWT, isAuthorized.sellerAuthorized, transactionController.onProcess)
router.put('/shipping', passportJWT, isAuthorized.sellerAuthorized, transactionController.shipping)

module.exports = router;
