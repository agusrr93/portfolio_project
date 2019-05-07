const chai = require('chai'),
expect = chai.expect

const app = require('../../App'),
chaiHttp = require('chai-http'),
jwt = require('jsonwebtoken'),
trainingCode = require('../../models/trainingcode')

chai.use(chaiHttp)




describe('training code Routes', function() {
    beforeEach( function ()  {
        this.timeout(5000)
      })
    
    afterEach( function() {
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
            trainingCode.create({
                "code": "01001",
                "description": "Pelatihan Pemanfaatan Limbah Ban Bekas untuk Membuat Kursi dan Tong Sampah"
            })
            .then(data => {
                trainingId = data._id
            })
            })
            .then(()=> {
                done()
            })

        })
        
        after(function(done){
            Admin.deleteMany({}, () => {})
        .then(()=> {
            trainingCode.deleteMany({}, ()=> {})
        })
        .then(()=> {
            done()
        })
        })

        it('Should show all training code', function(done) {
        chai.request(app)
        .get('/api/v1/trainingcode')
        .set('Authorization', token)
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done() 
            })    
        })

        it('Should create training code', function(done) {
        chai.request(app)
        .post('/api/v1/trainingcode')
        .set('Authorization', token)
        .send({
            "code": "01002",
            "description": "Pelatihan Pemanfaatan Limbah Ban Bekas untuk Membuat Kursi dan Tong Sampah"
        })
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done() 
            })        
        })

        it('Should Update training code', function(done) {
        chai.request(app)
        .put(`/api/v1/trainingcode/${trainingId}`)
        .set('Authorization', token)
        .send({
            "code": "01003",
            "description": "Pelatihan Pemanfaatan Limbah Ban Bekas untuk Membuat Kursi dan Tong Sampah"
        })
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done() 
            })            
        })

        it('Should delete training code', function(done) {
        chai.request(app)
        .delete(`/api/v1/trainingcode/${trainingId}`)
        .set('Authorization', token)
        .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201)
            done() 
            })
        })
    })
})