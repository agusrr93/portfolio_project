var express = require('express');
const cors = require('cors')
require('dotenv').config()

//DB mongoose
const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect(process.env.DB, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('> DB Connected')
});

// kue
const kue = require('kue')
  , queue = kue.createQueue();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

queue.process( 'notifNewAnswer', function ( job, done ) {
  console.log( 'Starting ' + job.data.subject );
  sgMail.send(job.data);
  done();
});
// queue.process( 'reportDaily', function ( job, done ) {
//   console.log( 'Starting ' + job.data.subject );
//   sgMail.send(job.data);
//   done();
// });
queue.process( 'verificationEmail', function ( job, done ) {
  console.log( 'Starting ' + job.data.subject );
  sgMail.send(job.data);
  done();
});
  
var app = express();

app.locals.queue = queue;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var threadsRouter = require('./routes/threads')
var answersRouter = require('./routes/answers')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/threads', threadsRouter);
app.use('/answers', answersRouter)
app.use('/kue-ui', kue.app)

module.exports = app;
