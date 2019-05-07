const router = require('express').Router(),
  trainingControllers = require('../controllers/trainingcode'),
  passport = require("passport"),
  passportConf = require("../middleware/passport"),
  passportAdmin = passport.authenticate("local", { session: false }),
  passportJWT = passport.authenticate('jwt', {session : false})

router
  .route('/')
  .get(passportJWT, trainingControllers.showCode)
  .post(passportJWT, trainingControllers.createCode)

router.put('/:trainingId', passportJWT, trainingControllers.updateCode)
router.delete('/:trainingId', passportJWT, trainingControllers.deleteCode)

module.exports = router;
