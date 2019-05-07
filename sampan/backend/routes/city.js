const router = require('express').Router(),
  cityController = require('../controllers/city'),
  passport = require('passport'),
  passportConf = require('../middleware/passport'),
  passportJWT = passport.authenticate('jwt', { session: false })

router
  .post('/', passportJWT, cityController.add)
  .put('/:id', passportJWT, cityController.update)
  .delete('/:id', passportJWT, cityController.delete)
  .get('/', cityController.all)
  .get('/:id', cityController.detail)

module.exports = router
