const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios')
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()
const {OAuth2Client} = require('google-auth-library');
    
module.exports = {
    register: (req, res) => {         
        User.findOne({
            email: req.body.email
        })
        .then((result) => {
            if(result){
                res.status(400).json({message: 'Email already exist'})
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    img: req.body.img,
                    password: req.body.password
                })
                .then((result) => {
                    jwt.sign({
                        id: result._id
                    }, process.env.JWT, (err, verifCode) => {
                        if(err){
                            console.log(err);
                        } else {
                            var newJob = req.app.locals.queue.create('verificationEmail', {
                                to: result.email,
                                from: 'admin.hof@ndiw.online',
                                subject: `Verification Hacktif OverFlow`,
                                text: `Hello ${result.name}, welcome to Hacktiv OverFlow, we are happy have a new familly. Don't make us waiting, click button verification and join on Thread, Thanks You, best regard - admin.`,
                                html: `
                                    <p>Hello ${result.name}, welcome to Hacktiv OverFlow, we are happy have a new familly. Don't make us waiting, click button verification and join on Thread, Thanks You, best regard - admin.
                                        <form action=https://hacktiv.ndiw.online/verification/${verifCode}>
                                            <input type="submit" value="Verification" />
                                        </form>
                                    </p>`
                            }).priority('high').save( function(err){
                               if( !err ) console.log( newJob.id );
                            });
                            res.status(201).json({msg: 'Register Success, please check email to verification', data: result})
                        }
                    })
                })
                .catch((err) => {
                    res.status(500).json(err)
                });
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    login: (req, res) => {
        User.findOne({
            email: req.body.email,
            isGoogle: 0
        })
        .then((result) => {
            if(!result){
                res.status(400).json({msg: 'User not found!'})
            }
            let valid = bcrypt.compareSync(req.body.password, result.password)
            if (valid){                
                if(!result.isVerification){
                    res.status(400).json({msg: 'Please verification your account, check your email'})
                } else {
                    jwt.sign({
                        id: result._id,
                        name: result.name,
                        email: result.email
                    }, process.env.JWT, (err, token) => {
                        if(err){
                            res.status(400).json({msg : 'JWT error'})
                        } else {
                            res.status( 200 ).json({msg: 'Login Success', token: token})
                        }
                    })
                }
            } else {
                res.status(403).json({msg : "Wrong Password", err : err});
            }
        })  
        .catch((err) => {            
            res.status(500).json({msg: 'Login Failed', err: err})
        });
    },
    update: (req, res) => {
        User.updateOne({
            _id : req.params.id
        },{ $set: {
            name : req.body.name,
            email : req.body.email,
        }})
        .then(result=>{
            res.status(200).json({
            msg : `success updating user`,
            result : result
            })
        })
        .catch(err=>{
            res.status(500).json({
            msg : "failed updating user",
            err : err
            });
        });
    },
    getUser: (req, res) => {
        res.status(200).json(req.decoded)
    },
    loginGoogle: (req, res) => {        
        axios({
            method: 'GET',
            url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${req.body.token}`
        })
        .then((result) => {            
            User.findOne({
                email: result.data.email
            })
            .then((user) => {                
                if(!user){
                    User.create({
                        name: result.data.name,
                        email: result.data.email,
                        img: result.data.picture,
                        password: process.env.PW_GOOGLE,
                        isGoogle: 1,
                        isVerification: true
                    })
                    .then((newUser) => {
                        jwt.sign({
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email
                        }, process.env.JWT, (err, token) => {
                            if(err){
                        res.status( 400 ).json({
                            msg : 'JWT error'
                        })
                            } else {
                                res.status( 200 ).json({
                                    msg : 'Login Success',
                                    token : token
                                })
                            }}) 
                        })
                    .catch((err) => {
                        res.status(500).json({err})
                    });
                } else {
                    jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }, process.env.JWT, (err, token) => {
                        if(err){
                            res.status( 400 ).json({
                                msg : 'JWT error'
                            })
                        } else {
                            res.status( 200 ).json({
                                msg : 'Login Success',
                                token : token
                            })
                        }
                    })   
                }
            })
        }).catch((err) => {
            res.status(500).json({msg: 'login gagal', err: err})
        });
    },
    verification: (req, res) => {
        let decoded = jwt.verify(req.params.id, process.env.JWT)
        if(decoded){
            User.updateOne({
                _id: decoded.id
            }, {
                isVerification: true
            })
            .then((result) => {
                res.status(200).json({msg: 'Verification Success'})
            }).catch((err) => {
                res.status(500).json(err)
            });
        } else {
            console.log('not found');
        }
    }

}