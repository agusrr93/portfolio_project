const router = require('express').Router(),
  categoryController = require('../controllers/category'),
  multerCloudinary = require('../middleware/multerCloudinary'),
  passport = require('passport'),
  passportConf = require('../middleware/passport'),
  passportJWT = passport.authenticate('jwt', { session: false })

router
  .post('/', passportJWT, multerCloudinary.single('image'), categoryController.create) /* Create new Category */
  .put('/:id/update', passportJWT, multerCloudinary.single('image'), categoryController.update) /* Update Category */
  .delete('/:id/delete', passportJWT, categoryController.delete) /* Delete Category */
  .get('/', categoryController.all) /* Show All Category */
  .get('/:id/detail', categoryController.detail) /* Show Detail Category */
  .get('/:id/backgroundDetail', passportJWT, categoryController.backgroundDetail) /* Show Detail Background Detail Category */
  .get('/search', categoryController.textSearch) /* Search Category */

module.exports = router
