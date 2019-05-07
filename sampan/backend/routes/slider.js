const router = require('express').Router(),
  sliderController = require('../controllers/slider'),
  multerCloudinary = require('../middleware/multerCloudinary'),
  passport = require('passport'),
  passportJWT = passport.authenticate('jwt', {session : false})

router.post('/create', passportJWT, multerCloudinary.single('image'), sliderController.create)
router.get('/all', sliderController.all)
router.get('/:id/detail', sliderController.detail)
router.put('/:id/update', passportJWT, multerCloudinary.single('image'), sliderController.update)
router.delete('/:id/delete', passportJWT, sliderController.delete)

module.exports = router;
