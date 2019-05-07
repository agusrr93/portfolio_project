const Category= require('../models/category')
const Admin = require('../models/admin')
const cloudinary = require('cloudinary')

exports.create = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
  console.log('is saved successfully', req.body)
  let newCategory = new Category({
    name : req.body.name,
    description : req.body.description,
    image : req.file? req.file.url: null,
    darkBackground : req.body.darkBackground
  })
  newCategory.save()
  .then((savedCategory)=>{
    res.status(201).json({
      success : true,
      message : "The category is created successfully",
      data : savedCategory
    })
  })
  .catch((err)=>{
    res.status(422).json({
      success : false,
      message : "Fail to create new category",
      data : err.message
    })
  })
  })
}

exports.all = (req, res) => {
  Category.find()
  .sort({'updatedAt':-1})
  .then(Category => {
    res.status(200).json({
      success: true,
      message: "The categories are found",
      data: Category
    });
  })
  .catch((err) => {
    res.status(422).json({
      success: false,
      message: err.message
    });
  });
};

exports.backgroundDetail = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    if(err){
      res.status(401).json({
        success : false,
        message : "Not authorized!"
      })
    }
    Category.findById({_id:req.params.id})
    .exec()
    .then((category)=>{
      if (category){
        if(category.darkBackground){
          res.status(200).json({
            success : true,
            message : "The category has dark background, hence the writing should have contrasting color",
            data : true
          })
        } else {
          res.status(200).json({
            success : true,
            message : "The category doesn't have dark background, hence the writing should be dark",
            data : false
          })
        }
      }
      else {
        res.status(400).json({
          success : false,
          message : "The category cannot be found",
          data : err.message
        })
      }
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : "The category is not found"
      })
    })
  })
}

exports.detail = (req, res) => {
  Category.findById(req.params.id)
  .then(Category => {
    res.status(200).json({
      success: true,
      message: "The category with the description is found",
      data: Category
    });
  })
  .catch((err) => {
    res.status(422).json({
      success: false,
      message: err.message
    });
  });
};

exports.update = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1})
  .then((admin)=>{
    Category.findByIdAndUpdate({ _id: req.params.id, adminId: req.user.id }, {
      name : req.body.name,
      description : req.body.description,
      image : req.file? req.file.url : null,
      darkBackground : req.body.darkBackground }, { new: true })
    .then((category)=>{
      res.status(200).json({
        success : true,
        message : "The category is successfully updated",
        data : category
      })
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : "The category is not successfully updated!"
      })
    })
  })
  .catch((err)=>{
    res.status(404).json({
      success : false,
      message : "You are not authorized!"
    })
  })
}

exports.delete = (req, res) => {
  Admin.find({'local.email': req.user.local.email}, {_id:1}, (err)=>{
    Category.findByIdAndDelete(req.params.id)
    .exec()
    .then((deletedCategory)=>{
      if(deletedCategory){
        cloudinary.uploader.destroy(`Category/${req.params.id}`)
        return res.status(200).json({
          success : true,
          message : "The category is successfully deleted",
          data : deletedCategory
        })
      }
      return res.status(422).json({
        success : false,
        message : "The category is deleted, but the images are not",
        data : err.message
      })
    })
    .catch((err)=>{
      res.status(422).json({
        success : false,
        message : err.message
      })
    })
  })
}

exports.textSearch = (req, res) =>{
  Category.find({$text: {$search: searchString}})
  .skip(20)
  .limit(10)
  .exec()
  .then((docs)=>{
    res.status(200).json({
      success : true,
      message : "Categories are found",
      data : docs
    })
  })
  .catch((err)=>{
    res.status(422).json({
      success : false,
      message : err.message
    })
  })
}
