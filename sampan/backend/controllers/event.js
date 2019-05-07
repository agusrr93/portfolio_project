const Event = require("../models/event"),
  moment = require("moment");

//  (GET) Show All Event
exports.showEvent = (req, res) => {
  Event.find()
    .sort({ updatedAt: -1 })
    .populate("participation")
    .then(docs => {
      let result = [];
      docs.forEach((data, index) => {
        result.push(data);
        if (data.participation.length > 0) {
          data.participation.forEach((dude, indeks) => {
            let info = {
              id: dude._id,
              firstname: dude.local.firstname,
              lastname: dude.local.lastname
            };

            result[index].participation[indeks] = info;
          });
        }
      });
      res.status(201).json({
        success: true,
        message: "This is Event dude",
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

// (GET) Show Detail Event
exports.showDetailEvent = (req, res) => {
  let id = req.params.eventId;

  Event.findById(id)
    .then(result => {
      res.status(201).json({
        success: true,
        message: "This Detail Event",
        data: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

//  (POST) Create New Event
exports.createEvent = (req, res) => {
  const event = new Event({
    date: moment(req.body.date).format('DD/MM/YYYY'),
    eventTitle: req.body.eventTitle,
    description: req.body.description,
    cityId: req.body.cityId,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });
  event
    .save()
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Event Created",
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

//  (PUT) Update Event
exports.updateEvent = (req, res) => {
  let id = req.params.eventId;

  Event.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Event Updated",
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

// (PUT) User Join Event
exports.joinEvent = async (req, res) => {
  let id = req.params.eventId;
  let person = req.user.id;
  let data_event = await Event.findOne({ _id: id });
  let allPartisipant = data_event.participation;
  let isUserExist = allPartisipant.indexOf(person);

  if (isUserExist === -1) {
    Event.findByIdAndUpdate(
      id,
      { $push: { participation: person } },
      { new: true }
    )
      .then(result => {
        res.status(201).json({
          success: true,
          message: "Thank you for joining this event",
          data: result
        });
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          message: err.message
        });
      });
  } else {
    res.status(400).json({
      success: false,
      message: "You have already registered for this event"
    });
  }
};

//  (DELETE) Delete Event
exports.deleteEvent = (req, res) => {
  let id = req.params.eventId;

  Event.findByIdAndDelete(id, { $set: req.body })
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Event Deleted",
        data: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

exports.deletedCron = (req, res) => {
  Event.find()
    .then(data => {
      data.forEach(mydata => {
        let dateNow = moment(Date.now()).format("L");
        if (mydata.date < dateNow) {
          mydata.deletedAt = Date.now();
          mydata.save();
        }
      });
    })
    .catch(err => {
      res.status(401).json({
        success: false,
        message: err.message
      });
    });
};
