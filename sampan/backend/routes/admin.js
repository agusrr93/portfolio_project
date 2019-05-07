const router = require("express").Router(),
  adminController = require("../controllers/admin"),
  transactionController = require("../controllers/transaction"),
  categoryController = require("../controllers/category"),
  sliderController = require("../controllers/slider"),
  userControllers = require('../controllers/user'),
  multerCloudinary = require('../middleware/multerCloudinary'),
  passport = require("passport"),
  passportConf = require("../middleware/passport"),
  passportAdmin = passport.authenticate("admin", { session: false }),
  passportJWT = passport.authenticate('jwt', { session: false }),
  { validateBody, schemas } = require('../helpers/routeHelpers')

/* Router Profile Admin */
router
  .post('/signup', adminController.signUp) /* Admin Signup (Registration) */
  .post('/signin', validateBody(schemas.authSchema), passportAdmin, adminController.signIn) /* Admin Login */
  .get('/transaction', passportJWT, transactionController.adminTransaction) /* Show Transaction */
  .get('/detailtransaction', passportJWT, transactionController.showTransId) /* Show Detail Transaction */
  .get('/usertraining', passportJWT, adminController.showUserTraId) /* Show User have TrainingId */
  .put('/verifyuser', passportJWT, adminController.userVerify) /* Update Status Verify User */
  .put('/transactionpaid', passportJWT, transactionController.adminPaid) /* Update Status Journey 'paid' (Verify Payment) */
  .get('/dashboard', passportJWT, adminController.Dashboard) /* Show Dashboard Admin */

module.exports = router
