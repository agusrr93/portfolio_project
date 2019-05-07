const chai = require('chai'),
expect = chai.expect

const app = require('../../App'),
chaiHttp = require('chai-http');

chai.use(chaiHttp)
const Event = require('../../models/event'),
Admin = require('../../models/admin'),
User = require('../../models/user')

var jwt = require('jsonwebtoken')

describe('Event Routes', function() {
    beforeEach( function ()  {
        this.timeout(5000)
      })
    
      afterEach( function() {
      })


    it('Should show all event', function(done) {
        this.timeout(5000)
        chai.request(app)
        .get('/api/v1/event/')
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done()    
        })
    })

    context('', function() {
        before(function(done) {
            Admin.create({'local.username': 'Tono', 'local.email': 'tono@mail.com', 'local.password': '123456'})
            .then(() => {
              Admin.findOne({'local.email': 'tono@mail.com'})
              .then(user => {
                  let objAdmin = {
                    iss: "Sampan",
                    sub: user.local.email,
                    username: user.local.username,
                    iat: new Date().getTime(),
                    exp: new Date().setDate(new Date().getDate() + 1),
                    role: "admin" 
                  }
    
                  token = jwt.sign(objAdmin, process.env.JWT_SECRET)
                  adminId = String(objAdmin.id)
              })
            })
            .then(()=> {
                Event.create({
                    "date": "2019-04-07",
                    "eventTitle": "Bersih Kampung",
                    "description": "Bersih Kampung agar sehat"
                })
                .then(event => {
                    eventId = String(event.id)
                })
            })
            .then(()=> {
                User.create({
                'local.firstname': 'Tono', 
                'local.lastname': 'sampan', 
                'local.password': '123456',
                'local.email': 'tono@test.com',
                'local.username': 'tono12',
                'local.phone': 085769169190,
                'local.adress': 'Rusunawa BPJS Kabil Batam'
                })
                .then((user)=> {
                let userObj= {    iss: "Sampan",
                                  sub: user.local.email,
                                  username: user.local.username,
                                  id: user.id,
                                  iat: new Date().getTime(),
                                  exp: new Date().setDate(new Date().getDate() + 1), // Current day + 1
                                  role: "user"
                            }
                
                
                tokenUser = jwt.sign(userObj, process.env.JWT_SECRET)
                userId = String(userObj.id)
            })
            })
            .then(()=> {
            done()
            })
            })
    
            after(function(done){
            Admin.deleteMany({}, () => {})
            .then(()=> {
            Event.deleteMany({}, () => {})
            })
            .then(()=> {
            User.deleteMany({}, ()=> {})
            })
            .then(()=> {
            done()
            })
            })

            it ('Should show success status for create event', function(done) {
                this.timeout(5000)
                chai.request(app)
                .post('/api/v1/event/')
                .set('Authorization', token)
                .send({
                    "date": "2019-04-07",
                    "eventTitle": "Bersih Kampung",
                    "description": "Bersih Kampung agar sehat"
                })
                .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201)
                done() 
                })

            })

            it ('Should show detail event', function(done) {
                this.timeout(5000)
                chai.request(app)
                .get(`/api/v1/event/${eventId}`)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    done() 
                })
            })

            it ('Should update event', function(done) {
                this.timeout(5000)
                chai.request(app)
                .put(`/api/v1/event/${eventId}`)
                .set('Authorization', token)
                .send({
                    "eventTitle": "Kampung Seger"
                })
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    done() 
                })
            })

            it('Should delete event', function(done) {
                this.timeout(5000)
                chai.request(app)
                .delete(`/api/v1/event/${eventId}`)
                .set('Authorization', token)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    done() 
                })
            })

            it('Should show sucess for User join event', function(done) {
                this.skip()
                chai.request(app)
                .put(`/api/v1/event/${eventId}/join`)
                .set('Authorization', tokenUser)
                .end(function(err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201)
                    done() 
                })
            })
        })
    
    
})
