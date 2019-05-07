const User = require("../models/user"),
  Training = require("../models/trainingcode"),
  Transaction = require("../models/transaction"),
  bcrypt = require("bcrypt"),
  JWT = require("jsonwebtoken"),
  JWT_SECRET = process.env.JWT_SECRET,
  jwtDecode = require("jwt-decode")

// Morgan per userId
exports.getName = (token) => {
  let user = jwtDecode(token)
  return user.sub
}

signTokenLocal = user => {
  return JWT.sign(
    {
      iss: "Sampan",
      sub: user.local.email,
      username: user.local.username,
      id: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1), // Current day + 1
      role: "user"
    },
    JWT_SECRET
  );
};
signTokenAuth = user => {
  // Google Auth and Facebook Token
  return JWT.sign(
    {
      iss: "Sampan",
      sub: user.emails[0].value,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    },
    JWT_SECRET
  );
};

// (POST) Signup
exports.signup = async (req, res, next) => {
  let newUser = new User({
    method: "local",
    local: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      email: req.body.email,
      avatar: req.file ? req.file.url : null,
      username: req.body.username,
      phone: req.body.phone,
      address: req.body.address
    }
  });
  await newUser
    .save()
    .then(result => {
      return res.status(201).json({
        success: true,
        data: result
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message || "Register failed!"
      });
    });
};

// (POST) Login
exports.login = (req, res) => {
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
  const token = signTokenLocal(req.user);
  return res.status(200).json({
    success: true,
    token: token
  });
};

// Google Oauth
exports.googleOauth = async (req, res, next) => {
  console.log("user from google oauth", req.user);
  const token = signTokenAuth(req.user);
  res.status(200).json({
    success: true,
    token: token
  });
};

// (PUT) Update Data User
exports.update = async (req, res) => {

  const newUser = {};
  req.body.username ? (newUser["local.username"] = req.body.username) : null;
  req.body.password ? (newUser["local.password"] = req.body.password) : null;
  req.body.firstname ? (newUser["local.firstname"] = req.body.firstname) : null;
  req.body.lastname ? (newUser["local.lastname"] = req.body.lastname) : null;
  req.body.email ? (newUser["local.email"] = req.body.email) : null;
  req.body.avatar ? (newUser["local.avatar"] = req.body.avatar) : null;
  req.body.phone ? (newUser["local.phone"] = req.body.phone) : null;
  req.body.address ? (newUser["local.address"] = req.body.address) : null;
  req.body.deletedAt ? (newUser["local.deletedAt"] = req.body.deletedAt) : null;

  const trainingFound = req.body.trainingId && await Training.findOne({ code: req.body.trainingId });
  if (trainingFound) {
    const { _id } = trainingFound;
    newUser['local.trainingId'] = _id;
  }

  User.findOneAndUpdate(
    { "local.email": req.user.local.email },
    {
      $set: newUser
    },
    { new: true },
    (err, userInfo) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message || "Updating failed!"
        });
      } else {
        if (!req.body.password) {
          return res.status(200).json({
            success: true,
            data: userInfo
          });
        }
        bcrypt
          .hash(req.body.password, 10)
          .then(hash => {
            req.body.password = hash;
            userInfo.save(err => {
              if (err) {
                return res.status(400).json({
                  success: false,
                  message: err.message || "Updating password failed!"
                });
              }
              return res.status(201).json({
                success: true,
                message:
                  "The corresponding user's information is successfully updated",
                data: userInfo
              });
            });
          })
          .catch(err => {
            return res.status(400).json({
              success: false,
              message: err.message || "Updating user's information failed!"
            });
          });
      }
    }
  );
};

// (DELETE) Delete User
exports.delete = (req, res) => {
  User.findOneAndDelete({ "local.email": req.user.local.email })
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Your Account has been Deleted!"
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: true,
        message: err.message || "Deleting failed!"
      });
    });
};

// (GET) Show Profil
exports.showProfil = (req, res) => {
  User.findOne({ "local.email": req.user.local.email })
    .populate('local.review')
    .select("-local.password")
    .then(doc => {
      return res.status(200).json({
        success: true,
        message: "Show user Profile",
        profile: doc
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message || "Error showing profile!"
      });
    });
};

// (GET) All user
exports.showAll = (req, res) => {
  User.find()
    .populate('local.review')
    .sort({ 'updatedAt': -1 })
    .then(data => {
      return res.status(200).json({
        success: true,
        data: data
      })
        .catch(err => {
          return res.status(400).json({
            success: false,
            message: err.message || "Cannot show all user!"
          })
        })
    })
}

// (PUT) Update Code Training
exports.updateCode = (req, res) => {
  // let email = { "local.email": req.user.local.email }

  Training.findOne({ code: req.body.code })
    .then(data => {
      User.findByIdAndUpdate(req.user.id, { $set: {'local.trainingId': data._id} }, { new: true })
        .then(result => {
          res.status(201).json({
            success: true,
            message: "Code success to input",
            data: result
          })
        })
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      })
    })

//   User.findOneAndUpdate(email, { $set: { verify: true, updateAt: Date.now() } }, { new: true })
//     .populate('local.trainingId')
//     .then(dude => {
//       if (dude.local.trainingId.code == req.body.code && dude.local.trainingId.code !== null) {
//         return res.status(201).json({
//           success: true,
//           message: "Welecome to the club dude!!! yeahh!!",
//           data: dude
//         })
//       }

//       else {
//         return res.status(401).json({
//           success: false,
//           message: "Come joint us with training dude!! make trash great again"
//         })
//       }
//     })

//     .catch(err => {
//       return res.status(401).json({
//         success: false,
//         message: err.message
//       })
//     })
}

// (GET) Show All Mitra
exports.showMitra = (req, res) => {
  let verify = { verify: true }

  User.find(verify)
    .sort({ 'updatedAt': -1 })
    .then(data => {
      return res.status(200).json({
        success: true,
        data: data
      })
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message || "Cannot show all user!"
      })
    })
}

