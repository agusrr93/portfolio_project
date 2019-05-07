const City = require('../models/city');
const Admin = require('../models/admin')

exports.add = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if (err) {
      res.status(422).json({
        success : false,
        message: "You are not authorized",
        data: err.message
      })
    }
    let newCity = new City ({
      name : req.body.name,
      description : req.body.description
    })
    newCity.save()
    .then((newCity)=>{
      res.status(201).json({
        success : true,
        message : "The city is added",
        data : newCity
      })
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : "Fail to add city",
        data : err.message
      })
    })
  })
}

exports.all = (req, res) => {
  City.find({})
  .sort({'updatedAt':-1})
  .then((city)=>{
    res.status(200).json({
      success : true,
      message : "The city's lists are found",
      data : city
    })
  })
  .catch((err)=>{
    res.status(404).json({
      success : false,
      message : "The lists cannot be found",
      data : err.message
    })
  })
}

exports.detail = (req, res) => {
  City.findById(req.params.id)
  .then((city)=>{
    res.status(200).json({
      success : true,
      message : "The city detail is found",
      data : city
    })
  })
  .catch((err)=>{
    res.status(404).json({
      success : false,
      message : "The city's detail cannot be found",
      data : err.message
    })
  })
}

exports.update = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if(err){
      res.status(401).json({
        success : false,
        message : "You are not authorized",
        data : err.message
      })
    }
    City.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
    .then((city)=>{
      res.status(200).json({
        success : true,
        message : "The city's detail is successfully updated",
        data : city
      })
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : "Fail to update the city's detail",
        data : err.message
      })
    })
  })
}

exports.delete = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if(err){
      res.status(401).json({
        success : false,
        message : "You are not authorized",
        data : err.message
      })
    }
    City.findByIdAndDelete(req.params.id)
    .then((city)=>{
      res.status(200).json({
        success : true,
        message : "The city's detail is successfully deleted",
        data : city
      })
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : "Fail to delete the city's detail",
        data : err.message
      })
    })
  })
}
