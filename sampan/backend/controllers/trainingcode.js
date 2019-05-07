const Training = require("../models/trainingcode")

//  (GET) Show All Training Code
exports.showCode = (req, res) => {
  Training.find()
    .sort({'updatedAt':-1})
    .then(result => {
      return res.status(201).json({
        success: true,
        message: "This is your training code dude",
        data: result
      })
    })
    .catch(err => {
      return res.status(401).json({
        success: false,
        message: err.message
      })
    })
}

//  (POST) Create New Training Code
exports.createCode = (req, res) => {
  const training = new Training({
    code: req.body.code,
    description: req.body.description
  })
  training.save()
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Training Code Created",
        data: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })
}

//  (PUT) Update Training Code
exports.updateCode = (req, res) => {
  let id = req.params.trainingId

  Training.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Training Code Updated",
        data: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })
}

//  (DELETE) Delete Training Code
exports.deleteCode = (req, res) => {
  let id = req.params.trainingId

  Training.findByIdAndDelete(id, { $set: req.body })
    .then(result => {
      res.status(201).json({
        success: true,
        message: "Training Code Deleted",
        data: result
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })
}