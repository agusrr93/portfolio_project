const Slider = require('../models/slider')
const Admin = require('../models/admin')

exports.create = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if (err){
      res.status(422).json({
        message: "Admin is not authorized to create slider",
        data: err.message
      })
    } else{
      const newSlider = new Slider({
        adminId: req.user.id,
        image: req.file? req.file.url: null,
        title: req.body.title,
        description : req.body.description
      })
      newSlider.save()
      .then((savedSlider)=>{
        res.status(201).json({
          success : true,
          message : "The image slider is successfully created",
          data : savedSlider
        })
      })
      .catch((err)=>{
        res.status(422).json({
          success : false,
          message : err.message
        })
      })
    }
  })
}

exports.all = (req, res) => {
  Slider.find({})
  .sort({ updatedAt: -1 })
  .then((result)=>{
    res.status(200).json({
      success : true,
      message : "The image sliders are found",
      data : result
    })
  })
  .catch((err)=>{
    res.status(422).json({
      success : false,
      message : err.message
    })
  })
}

exports.detail = (req,res) => {
  Slider.findById(req.params.id)
  .then((result)=>{
    res.status(200).json({
      success : true,
      message : "Image slider's detail is found",
      data : result
    })
  })
  .catch((err)=>{
    res.status(422).json({
      success : false,
      message : err.message
    })
  })
}

exports.update = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if(err){
      res.status(401).json({
        success : false,
        message : "Not authorized!"
      })
    }
    Slider.findByIdAndUpdate({ _id: req.params.id, adminId: req.user.id }, {
      image : req.file? req.file.url : null,
      title : req.body.title,
      description : req.body.description
    }, { new: true })
    .then((result)=>{
      res.status(200).json({
        success : true,
        message : "The slider is successfully updated",
        data : result
      })
    })
    .catch((err)=>{
      res.status(200).json({
        success : false,
        message : err.message
      })
    })
  })
}

exports.delete = (req, res) => {
  Admin.find({ 'local.email': req.user.local.email }, {_id:1}, (err)=>{
    if(err){
      res.status(401).json({
        success : false,
        message : "Not authorized!",
        data : err.message
      })
    }
    Slider.findByIdAndDelete(req.params.id)
    .exec()
    .then((slider) => {
      res.status(200).json({
        success: true,
        message: "The slider is deleted",
        data : slider
      })
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        message: "The slider is not found in our database. Please try another ID"
      })
    })
  })
}
