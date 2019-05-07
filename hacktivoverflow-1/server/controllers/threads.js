const Thread = require('../models/thread')
const Answer = require('../models/answer')
    
module.exports = {
    add: (req, res) => {
        Thread.create({
            title: req.body.title,
            question: req.body.question,
            author: req.decoded.id
        })
        .then((result) => {
            res.status(201).json({msg: 'add Thread success', result: result})
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    find: (req, res) => {                
        Thread.findOne({
            _id: req.params.id
        })
        .populate('author')
        .populate({
            path :'answers',
            model :'Answer',
            populate :{
                path : 'user',
                model : 'User'}})
        .exec()
        .then((result) => {
            Thread.updateOne({
                _id: req.params.id
            }, {
                views: result.views += 1
            })
            .then((result2) => {
                res.status(200).json(result)
            })
        }).catch((err) => {            
            res.status(500).json(err)
        });
    },
    getAll: (req, res) => {
        Thread.find()
        .populate('author').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    del: (req, res) => {
        Thread.findOne({
            _id: req.params.id
        })
        .then((result) => {
            result.answers.forEach(data => {
                Answer.deleteOne({
                    _id: data
                })
                .then((result) => {})
            });
            Thread.deleteOne({
                _id: req.params.id
            })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            });
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    edit: (req, res) => {
        Thread.updateOne({
            _id: req.params.id
        }, {
            title: req.body.title,
            question: req.body.text
        })
        .then((result) => {            
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)
        });
    },
    search: (req, res) => {
        var regexQuery = {
            title: new RegExp(req.params.q, 'i')
        }
        Thread.find(regexQuery)
        .populate('author').exec()
        .then((result) => {
            res.status(200).json({result})
        }).catch((err) => {
            res.status(500).json({err})
        }) 
    },
    myThreads: (req, res) => {
        Thread.find({
            author: req.decoded.id
        })
        .populate('author').exec()
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    upVote: (req, res) => {
        Thread.updateOne({
            _id: req.params.id
        }, {
            $push: {
                upVotes: req.decoded.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    downVote: (req, res) => {
        Thread.updateOne({
            _id: req.params.id
        }, {
            $push: {
                downVotes: req.decoded.id
            }
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json({err})
        });
    },
    solve: (req, res) => {
        Thread.updateOne({
            _id: req.params.id
        }, {
            isSolved: true
        })
        .then((result) => {
            res.status(200).json({msg: 'Thread Closed', data: result})
        }).catch((err) => {
            res.status(500).json({err})

        });
    }
    

}
