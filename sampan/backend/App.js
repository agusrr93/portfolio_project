require("dotenv").config();

const
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan'),
  cron = require('node-cron'),
  public = require('./routes/public'),
  user = require('./routes/user'),
  itemRouter = require('./routes/item'),
  category = require('./routes/category'),
  cart = require('./routes/cart'),
  admin = require("./routes/admin"),
  transaction = require('./routes/transaction'),
  trainingcode = require('./routes/trainingcode'),
  city = require('./routes/city'),
  slider = require('./routes/slider'),
  wishlist = require("./routes/wishlist"),
  reviewItem = require('./routes/reviewItem'),
  reviewUser = require('./routes/reviewUser'),
  event = require('./routes/event'),
  deletedCron = require('./controllers/event').deletedCron,
  fs = require('fs'),
  path = require('path'),
  getName = require('./controllers/user').getName

const app = express();

morgan.token('id', function getId(req) {
  if (req.id == 'public') {
    return 'public'
  } else {
    let name = getName(req.id)

    return name
  }
})

let accessLogStream = fs.createWriteStream(path.join(__dirname, './docs/accesslog'), { flags: 'a' })

// Midllewares
app
  .use(morgan('dev'))
  .use(assignId)
  .use(morgan(':id :method :url :response-time', { stream: accessLogStream }))
  // .use('/docs', express.static(__dirname + '/docs'))
  // .use(express.static('docs/'))
  .use(express.json())
  .use(cors())
  .use(bodyParser.urlencoded({ extended: false }))
  // Routes
  .get("/", (req, res) => {
    res.send("Welcome to sampan API!");
  })
  // .use((err, req, res, next) => {
  //   console.log("Tesss");
  //   return res.status(400).json({
  //     err
  //   });
  // })
  .use("/api/v1/public", public)
  .use("/api/v1/user", user)
  .use("/api/v1/item", itemRouter)
  .use("/api/v1/category", category)
  .use("/api/v1/cart", cart)
  .use("/api/v1/admin", admin)
  .use('/api/v1/transaction', transaction)
  .use('/api/v1/trainingcode', trainingcode)
  .use('/api/v1/city', city)
  .use("/api/v1/wishlist", wishlist)
  .use('/api/v1/reviewItem', reviewItem)
  .use('/api/v1/reviewUser', reviewUser)
  .use("/api/v1/event", event)
  .use("/api/v1/slider", slider)
  // error handler
  .use((err, req, res, next) => {
    console.log(err)
    res.locals.message = err.message
    res.locals.error = err
    res.status(err.status || 500)
    res.json({ status: 'error', err })
  })
  // Start the server
  .listen(process.env.PORT, () => {
    cron.schedule('* 1 * * *', () => {
      deletedCron()
    })
    console.log(`Online at Port ${process.env.PORT}`)
  })

function assignId(req, res, next) {
  if (req.headers.authorization) {
    req.id = `${req.headers.authorization}`
  } else {
    req.id = 'public'
  }
  next()
}
// MongoDB setting
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === "test") {
  mongoose.connect(process.env.MONGO_DB_TEST, { useNewUrlParser: true })
}
else {
  mongoose
    .connect(process.env.E_MONGO_DB, { useNewUrlParser: true })
    .then(() => console.log(`MongoDB Connected`))
    .catch((err) => console.log(err));
}

// deprecation set
mongoose
  .set("useNewUrlParser", true)
  .set("useFindAndModify", false)
  .set("useCreateIndex", true)
  // .set("debug", true);

module.exports = app;
