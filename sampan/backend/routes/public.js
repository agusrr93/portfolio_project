const router = require('express').Router(),
  multer = require('../middleware/multerCloudinary'),
  userControllers = require('../controllers/user'),
  itemController = require('../controllers/item'),
  passport = require('passport'),
  passportSignIn = passport.authenticate('local', { session: false }),
  passportGoogleOauth = passport.authenticate('googleToken', { session: false }),
  {validateBody, schemas} = require('../helpers/routeHelpers')

router.post('/signup', multer.single('avatar'), userControllers.signup)
router.post('/login', validateBody(schemas.authSchema), passportSignIn, userControllers.login)
router.post('/google/oauth', passportGoogleOauth, userControllers.googleOauth)

module.exports = router;
