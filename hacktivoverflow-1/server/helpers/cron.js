const CronJob = require('cron').CronJob;
const User = require('../models/user')
const Thread = require('../models/thread')
const sgMail = require('@sendgrid/mail');
require('dotenv').config()
const kue = require('kue')
  , queue = kue.createQueue();

queue.process( 'reportDaily', function ( job, done ) {
console.log( 'Starting ' + job.data.subject );
sgMail.send(job.data);
done();
});

module.exports = { 
    reportDaily: () => {
        new CronJob('0 10 * * *', function() {                   
            Thread.find({
                isSolved: false
            })
            .populate('author')
            .exec()
            .then((result) => {
                result.forEach(data => {
                    var newJob = queue.create('reportDaily', {
                        to: data.author.email,
                        from: 'admin.hof@ndiw.online',
                        subject: 'hacktiv OverFlow Daily Report',
                        text: `Your Thread ${data.title} have ${data.answers.length} answers, let Check and Close Thread if Solved. https://hacktiv.ndiw.online/thread/${data._id}`,
                        html: `
                            <p>Your Thread ${data.title} have ${data.answers.length} answers, let Check and Close Thread if Solved.
                                <form action=https://hacktiv.ndiw.online/thread/${data._id}>
                                    <input type="submit" value="Go to Thread" />
                                </form>
                            </p>`
                    }).priority('low').save( function(err){
                       if( !err ) console.log( newJob.id );
                    });
                })
            })
            .catch((err) => {
                console.log(err);
            });
        }, null, true, 'Asia/Jakarta');
       
    }
}