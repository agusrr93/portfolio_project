const router = require('express').Router(),
  eventControllers = require('../controllers/event'),
  passport = require("passport"),
  passportJWT = passport.authenticate('jwt', {session : false})

router.route('/')
  .get(eventControllers.showEvent)
  .post(passportJWT, eventControllers.createEvent)

router.route('/:eventId')
  .get(eventControllers.showDetailEvent)
  .put(passportJWT, eventControllers.updateEvent)
  .delete(passportJWT, eventControllers.deleteEvent)

router.route('/:eventId/join')
  .put(passportJWT, eventControllers.joinEvent)
  
  module.exports = router;