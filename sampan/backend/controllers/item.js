const Item = require("../models/item")
const User = require("../models/user")
const Category = require("../models/category")
const Event = require("../models/event")
const City = require("../models/city")

exports.create = (req, res) => {
  User.find({ 'local.email': req.user.local.email }, { _id: 1 }, (err) => {
    if (err) {
      res.status(422).json({
        message: "User is not authorized to create item",
        data: err.message
      })
    }

    if (req.files) {
      var imageArray = [];
      for (let i = 0; i < req.files.length; i++) {
        imageArray.push(req.files[i].url)
      }
    }

    const newItem = new Item({
      userId: req.user.id,
      categoryId: req.body.categoryId,
      // commentId: req.body.commentId,
      name: req.body.name,
      stock: req.body.stock,
      tags: req.body.tags,
      bought: req.body.bought,
      price: req.body.price,
      description: req.body.description,
      photos: imageArray ? imageArray : []
    });

    newItem.save()
      .then((savedItem) => {
        console.log(req.files)
        res.status(201).json({
          success: true,
          message: "The item is created successfully",
          data: savedItem
        })
      })
      .catch((err) => {
        res.status(422).json({
          success: true,
          message: err.message
        })
      })
  })
}

exports.detail = (req, res) => {
  Item.findById(req.params.id)
    .populate('Category')
    .populate('review')
    .populate('userId')
    .then((item) => {
      res.status(200).json({
        success: true,
        message: "The item with the description is found",
        data: item
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: err.message
      });
    });
};

exports.all = (req, res) => {
  Item.find({ stock: { $ne: 0 } })
    .limit(20)
    .populate('categoryId')
    .populate('review')
    .sort({ 'bought': -1, 'updatedAt': -1 })
    .then(item => {
      res.status(200).json({
        success: true,
        message: "All items are found",
        data: item
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: err.message
      });
    })
}

exports.allSold = (req, res) => {
  Item.paginate({}, {
    page: req.body.page,
    limit: 20,
    populate: ['categoryId', 'review'],
    sort: { 'bought': -1 }
  })

    // .populate('category')
    .then(item => {
      res.status(200).json({
        success: true,
        message: "All items are found",
        data: item
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: err.message
      });
    })
}

exports.allNewest = (req, res) => {
  Item.paginate({}, {
    page: req.body.page,
    limit: 20,
    populate: ['categoryId', 'review'],
    sort: { 'updatedAt': -1 },
  })

    // .populate('category')
    .then(item => {
      res.status(200).json({
        success: true,
        message: "All items are found",
        data: item
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: err.message
      });
    })
}

exports.update = (req, res) => {
  User.find({ 'local.email': req.user.local.email })
    .then((user) => {
      if (req.files) {
        var filenameArray = [];
        for (let i = 0; i < req.files.length; i++) {
          filenameArray.push(req.files[i].url);
        }
      }

      var item = {}
      req.body.name ? item["name"] = req.body.name : null;
      req.body.stock ? item["stock"] = req.body.stock : null;
      req.body.tags ? item["tags"] = req.body.tags : null;
      req.body.bought ? item["bought"] = req.body.bought : null;
      req.body.price ? item["price"] = req.body.price : null;
      req.body.description ? item["description"] = req.body.description : null;
      req.files ? item["photos"] = filenameArray : null;

      Item.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, { $set: item }, { new: true })
        .then((item) => {
          res.status(201).json({
            success: true,
            message: "The item is successfully updated",
            data: item
          })
        })
        .catch((err) => {
          res.status(422).json({
            success: false,
            message: "Cannot update the item",
            data: err.message
          })
        })
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        message: "We cannot find the ID of the user",
        data: err.message
      })
    })
}

exports.delete = (req, res) => {
  User.find({ 'local.email': req.user.local.email })
    .then((user) => {
      Item.findByIdAndDelete(req.params.id)
        .exec()
        .then((item) => {
          res.status(200).json({
            success: true,
            message: "The item is deleted",
            data: item
          })
        })
        .catch((err) => {
          res.status(401).json({
            success: false,
            message: "The item is not found in our database. Please try another ID"
          })
        })
        .catch((err) => {
          res.status(422).json({
            success: false,
            message: err.message
          })
        })
    })
}

exports.find = (req, res, next) => {
  let search = new RegExp(req.query.search, 'i')
  Promise.all([
    // Item.find({$text: {$search: req.params.search}})
    Item.find({
      $or: [
        { name: search },
        { tags: search },
        { category: search },
        { description: search }
      ]
    })
      .exec(),
    // Category.find({$text: {$search: req.params.search}})
    Category.find({
      $or: [
        { name: search },
        { description: search }
      ]
    })
      .exec(),
    // Event.find({$text: {$search: req.params.search}})
    Event.find({
      $or: [
        { eventTitle: search },
        { description: search }
      ]
    })
      .exec(),
    // City.find({$text: {$search: req.params.search}})
    City.find({
      $or: [
        { name: search },
        { description: search }
      ]
    })
      .exec()
  ])
    .then((result) => {
      console.log(req.query.search)
      console.log(result[0])
      console.log(result[1])
      console.log(result[2])
      console.log(result[3])
      var data = {}
      var count = 0
      if (!result[0].length < 1) {
        data.item = result[0].map(function (item) {
          return {
            _id: item._id,
            name: item.name
          }
        })

        count += result[0].length
      }

      if (!result[1].length < 1) {
        data.category = result[1].map(function (category) {
          return {
            _id: category._id,
            name: category.name
          }
        })
        count += result[1].length
      }

      if (!result[2].length < 1) {
        data.event = result[2].map(function (event) {
          return {
            _id: event._id,
            name: event.eventTitle
          };
        })
        count += result[2].length
      }

      if (!result[3].length < 1) {
        data.city = result[3].map(function (city) {
          return {
            _id: city._id,
            name: city.name
          };
        })
        count += result[3].length
      }

      return res.json({
        success: true,
        message: count > 0 ? 'Found' : 'Not Found',
        data: data,
        count: count
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(422).json({
        success: false,
        message: err.message
      })
    })
}

