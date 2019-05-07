require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Thread = require('../models/thread')
const Answer = require('../models/answer')
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');

module.exports = {
    isLogin: function(req, res, next){                        
        let token = req.headers.token                
        if(token){
            let decoded = jwt.verify(req.headers.token, process.env.JWT)
            if(decoded){
                User.findOne({
                    email: decoded.email,
                    isVerification: true
                })
                .then((result) => {
                    if(result){
                        req.decoded = decoded
                        next()
                    }
                }).catch((err) => {
                    res.send(500).json(err)
                });
            } else {
                res.status(400).json({
                    msg: 'Wrong Token!'
                })
            }
        } else {
            res.status(400).json({msg: 'need Token to access'})
        }
    },
    isSelf: function(req, res, next){
        Thread.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if(String(result.author) === req.decoded.id){
                next()
            } else {
                res.status(400).json({msg: "access denied !!", err: err})
            }
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    isSelfComment: function(req, res, next){
        Answer.findOne({
            _id: req.params.id
        })
        .then((result) => {
            if(String(result.user) === req.decoded.id){
                next()
            } else {
                res.status(400).json({msg: 'akses ditolak !!', err: err})
            }
        }).catch((err) => {
            res.status(500).json(err)            
        });
    },
    isUpVoted: function(req, res, next) {
        Thread.findOne({
            _id: req.params.id
        })
        .then((result) => {
            let status = true
            let userVote = result.upVotes
            userVote.forEach(data => {
                if (String(data) === req.decoded.id) {
                    status = false
                }
            });
            if(status){
                next()
            } else {
                res.status(400).json({msg: 'user was voted!'})
            }         
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    isDownVoted: function(req, res, next) {
        Thread.findOne({
            _id: req.params.id
        })
        .then((result) => {
            let status = true
            let userVote = result.downVotes
            userVote.forEach(data => {
                if (String(data) === req.decoded.id) {
                    status = false
                }
            });
            if(status){
                next()
            } else {
                res.status(400).json({msg: 'user was voted!'})
            }         
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    isAnswerUpVote: function(req, res, next){
        Answer.findOne({
            _id: req.params.id
        })
        .then((result) => {
            let status = true
            let userVote = result.upVotes
            userVote.forEach(data => {
                if (String(data) === req.decoded.id) {
                    status = false
                }
            });
            if(status){
                // console.log('lolos');
                next()
            } else {
                res.status(400).json({msg: 'user was voted!'})
            }         
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    isAnswerDownVote: function(req, res, next){
        Answer.findOne({
            _id: req.params.id
        })
        .then((result) => {
            let status = true
            let userVote = result.downVotes
            userVote.forEach(data => {
                if (String(data) === req.decoded.id) {
                    status = false
                }
            });
            if(status){
                next()
            } else {
                res.status(400).json({msg: 'user was voted!'})
            }         
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    googleCheck: function(req, res, next){
        // console.log('masuk login g');
        let CLIENT_ID = process.env.CLIENT_ID_GOOGLE
        // console.log(CLIENT_ID);
        let client = new OAuth2Client(CLIENT_ID);
        let ticket = new Promise(function(resolve, reject){
            client.verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID
               }, function(err, data){
                    if(!err){
                        const payload = data.getPayload();
                        const userid = payload['sub'];
                        resolve(userid) 
                        // console.log(userid);                       
                    } else {
                        reject(err)
                    }
                });
        })
        .then(result => {
            next()
        })
        .catch((err) => {
            res.status(400).json({msg: 'wrong token!', err: err})
        });



    }
}