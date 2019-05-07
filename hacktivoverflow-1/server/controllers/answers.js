const Answer = require('../models/answer')
const Thread = require('../models/thread')
require('dotenv').config()

module.exports = {
    add: (req, res) => {
        Answer.create({
            text: req.body.text,
            user: req.decoded.id
        })
        .then((data) => {
            Thread.updateOne({
                _id: req.body.threadId
            }, {
                $push: {
                    answers: data._id
                }
            })
            .then((result) => {
                Thread.findOne({
                    _id: req.body.threadId
                })
                .populate('author').exec()
                .then((result2) => {
                    var newJob = req.app.locals.queue.create('notifNewAnswer', {
                        to: result2.author.email,
                        from: 'admin.hof@ndiw.online',
                        subject: `new answer posted on your thread ${result2.title}`,
                        text: `Your Thread ${result2.title} has new answer, let Check and Close Thread if Solved. https://hacktiv.ndiw.online/thread/${result2._id}`,
                        html: `
                            <p>Your Thread ${result2.title} have new answer, let Check and Close Thread if Solved.
                                <form action=https://hacktiv.ndiw.online/thread/${result2._id}>
                                    <input type="submit" value="Go to Thread" />
                                </form>
                            </p>`
                    }).save( function(err){
                       if( !err ) console.log( newJob.id );
                    });
                    res.status(201).json(result)
                }).catch((err) => {
                    console.log(err);
                });                
            })
        }).catch((err) => {
            res.status(500).json(err)          
        });

    },
    update: (req, res) => {
        Answer.updateOne({
            _id: req.params.id
        }, {
            text: req.body.text
        })
        .then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            res.status(500).json(err)          
        });
    },
    upVote: (req, res) => {
        Answer.updateOne({
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
        Answer.updateOne({
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
    }
}
