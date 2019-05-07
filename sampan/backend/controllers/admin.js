const Admin = require("../models/admin"),
  User = require("../models/user"),
  Transaction = require('../models/transaction'),
  Item = require('../models/item'),
  Training = require("../models/trainingcode"),
  City = require("../models/city"),
  Event = require("../models/event"),
  bcrypt = require("bcrypt"),
  JWT = require("jsonwebtoken"),
  JWT_SECRET = process.env.JWT_SECRET

signTokenAdmin = user => {
  return JWT.sign(
    {
      iss: "Sampan",
      sub: user.local.email,
      username: user.local.username,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1),
      role: "admin"
    },
    JWT_SECRET
  );
};

// (POST) Signup
exports.signUp = async (req, res, next) => {
  let newAdmin = new Admin({
    method: "local",
    local: {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
  });
  await newAdmin
    .save()
    .then(data => {
      res.status(200).json({
        success: true,
        message: "Admin succesfully created!",
        data: data
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message || "Error creating admin"
      });
    });
};

// (POST) Signin
exports.signIn = (req, res) => {
  if (req.user == "Wrong Password") {
    return res.status(400).json({
      success: false,
      message: "Wrong Password"
    });
  } else if (req.user == "Wrong Email") {
    return res.status(400).json({
      success: false,
      message: "Wrong Email"
    });
  }
  const token = signTokenAdmin(req.user);
  return res.status(200).json({
    success: true,
    token: token
  });
};

// (PUT) Verify User
exports.userVerify = (req, res) => {

  User.findByIdAndUpdate(req.body.userId, { $set: { verify: req.body.verify, updateAt: Date.now() } }, { new: true })
    .then(result => {
      return res.status(201).json({
        success: true,
        message: 'Success to verify User',
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

// (GET) Show User Have a TrainingId
exports.showUserTraId = (req, res) => {
  User.find({ 'local.trainingId': { $ne: null } })
    .sort({ 'updatedAt': -1 })
    .then(result => {
      return res.status(200).json({
        success: true,
        message: 'This is User Have a Training Id',
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


exports.Dashboard = (req, res) => {

  let promise = []
  promise.push(User.estimatedDocumentCount())

  let verify = { verify: true }
  promise.push(User.countDocuments(verify))

  let notPaid = { transactionJourney: "not paid" }
  promise.push(Transaction.countDocuments(notPaid))

  let onProcess = { transactionJourney: "on process" }
  promise.push(Transaction.countDocuments(onProcess))

  let paid = { transactionJourney: "paid" }
  promise.push(Transaction.countDocuments(paid))

  let shipping = { transactionJourney: "shipping" }
  promise.push(Transaction.countDocuments(shipping))

  let done = { transactionJourney: "done" }
  promise.push(Transaction.countDocuments(done))

  promise.push(User.find()
    .sort({ 'updatedAt': -1 })
    .limit(5))

  promise.push(Item.find()
    .sort({ 'updatedAt': -1 })
    .limit(5))


  promise.push(Training.find()
    .sort({ 'updatedAt': -1 })
    .limit(5))

  promise.push(City.estimatedDocumentCount())

  promise.push(Event.find({ 'deletedAt': { $ne: null } })
    .sort({ 'updatedAt': -1 })
    .limit(5))

  promise.push(Event.find({ 'deletedAt': null })
    .sort({ 'updatedAt': -1 })
    .limit(5))

  promise.push(Item.estimatedDocumentCount())

  promise.push(Training.estimatedDocumentCount())

  promise.push(Event.estimatedDocumentCount())

  promise.push(User.find({ verify: false, 'local.trainingId': { $ne: null } })
    .sort({ 'updatedAt': -1 }))

  let pending = { transactionJourney: "pending", photo: { $ne: null } }
  promise.push(Transaction.countDocuments(pending))

  promise.push(Transaction.find({ transactionJourney: 'pending', photo: { $ne: null } })
    .populate('userId')
    .sort({ 'updatedAt': -1 }))

  let cancelled = { transactionJourney: "cancelled"}
  promise.push(Transaction.countDocuments(cancelled))

  Promise.all(promise)
    .then((data) => {
      res.status(200).json({
        sucess: true,
        data: {
          Total: [{
            name: "City",
            total: data[10]
          },
          {
            name: "User",
            total: data[0]
          },
          {
            name: "Event",
            total: data[15]
          },
          {
            name: "Training",
            total: data[14]
          },
          {
            name: "Item",
            total: data[13]
          },
          {
            name: "Seller",
            total: data[1]
          }
          ],
          Transaction: [{
            name: "Not Paid",
            total: data[2]
          },
          {
            name: "Pending",
            total: data[17]
          },
          {
            name: "On Process",
            total: data[3]
          },
          {
            name: "Paid",
            total: data[4]
          },
          {
            name: "Shipping",
            total: data[5]
          },
          {
            name: "Done",
            total: data[6]
          },
          {
            name: "Cancelled",
            total: data[19]
          }],
          "Last Events":
            data[11]
          ,
          "Next Events":
            data[12]
          ,
          "Last Users": data[7],
          "Last Items": data[8],
          "Last Trainings": data[9],
          "User Unverified": data[16],
          "Pending Transactions": data[18]
        }
      })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        err: err.message || "Cannot show dashboard data"
      })
    })
}
