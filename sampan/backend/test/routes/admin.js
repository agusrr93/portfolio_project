const chai = require('chai'),
expect = chai.expect

const app = require('../../App'),
chaiHttp = require('chai-http');

chai.use(chaiHttp)
const Admin = require('../../models/admin')

describe('Admin Routes', function() { 
  
  beforeEach( function ()  {
    this.timeout(5000)
  })

  afterEach( function() {
  })
  
  context('', function() {
    this.timeout(5000)
    before((done) => {
      
      Admin.create({'local.username': 'Tono', 'local.email': 'tono@mail.com', 'local.password': '123456'})
        .then(() => {
          done()
        })
    })
    
    this.timeout(5000)
    after((done) => {
      
      Admin.deleteMany({}, () => {
        done()
      })
    })

    it('Should show success after signup', function(done) {
      this.timeout(5000)
      chai.request(app)
      .post('/api/v1/admin/signup')
      // .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        username: "idrus",
        email: 'idrus@test.com',
        password: 'idrus123'
      })
      .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          
          done()
      })
  })
  it('Should show success after signin', function(done) {
    this.timeout(5000)
    chai.request(app)
    .post('/api/v1/admin/signin')
    // .set('Content-Type', 'application/json')
    .send({
      "email":"idrus@test.com",
      "password":"idrus123"
    })
    .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done()
    })
})
  it('Should show training Id User', function(done) {
    this.timeout(5000)
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJpZHJ1c0B0ZXN0LmNvbSIsImlhdCI6MTU1NjAxMTc1NDYzOSwiZXhwIjoxNTU2MDk4MTU0NjQwLCJyb2xlIjoiYWRtaW4ifQ.lU9a1ja7SgwsphUEJSQ-66cz12WxCSxOW-ujZg_ycOI"
    chai.request(app)
    .get('/api/v1/admin/usertraining')
    .set('Authorization', token)
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200)
      done()
    })
  })

  it('Should show detail transaction', function(done) {
    this.timeout(5000)
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJpZHJ1c0B0ZXN0LmNvbSIsImlhdCI6MTU1NjAxMTc1NDYzOSwiZXhwIjoxNTU2MDk4MTU0NjQwLCJyb2xlIjoiYWRtaW4ifQ.lU9a1ja7SgwsphUEJSQ-66cz12WxCSxOW-ujZg_ycOI"
    chai.request(app)
    .get('/api/v1/admin/detailtransaction')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .set('Authorization', token)
    .send({transactionId: '5cbd3af7d6c51e0fe9aa7312'})
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(201);
      done()
    })
  })

  it('Should check all transaction', function(done) {
    this.timeout(5000)
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJpZHJ1c0B0ZXN0LmNvbSIsImlhdCI6MTU1NjAxMTc1NDYzOSwiZXhwIjoxNTU2MDk4MTU0NjQwLCJyb2xlIjoiYWRtaW4ifQ.lU9a1ja7SgwsphUEJSQ-66cz12WxCSxOW-ujZg_ycOI"
    chai.request(app)
    .get('/api/v1/admin/transaction')
    .set('Authorization', token)
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done()
    })
  })
  
  it('Should show dashboard data', function(done) {
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTYW1wYW4iLCJzdWIiOiJpZHJ1c0B0ZXN0LmNvbSIsImlhdCI6MTU1NjAxMTc1NDYzOSwiZXhwIjoxNTU2MDk4MTU0NjQwLCJyb2xlIjoiYWRtaW4ifQ.lU9a1ja7SgwsphUEJSQ-66cz12WxCSxOW-ujZg_ycOI"
    chai.request(app)
    .get('/api/v1/admin/dashboard')
    .set('Authorization', token)
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
      done()
    })
  })

  })
  
       
        })        
          
      