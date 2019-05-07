const chai = require('chai'),
expect = chai.expect

const app = require('../../App'),
chaiHttp = require('chai-http')

chai.use(chaiHttp)
const User = require('../../models/user')


describe('Public Routes', function() {

    beforeEach( function ()  {
        this.timeout(5000)
      })
    
      afterEach( function() {
      })

    context('', function(){
        this.timeout(5000)
        before((done) => {
      
        User.create({
                'local.firstname': 'Tono', 
                'local.lastname': 'sampan', 
                'local.password': '123456',
                'local.email': 'tono@test.com',
                'local.username': 'tono12',
                'local.phone': 085769169190,
                'local.adress': 'Rusunawa BPJS Kabil Batam'
                })
            .then(() => {
            done()
              })
          })
          
          this.timeout(5000)
          after((done) => {
            
          User.deleteMany({}, () => {
              done()
            })
          })
          
          it('Should show sucess status after signup', function(done) {
            this.timeout(5000)
            chai.request(app)
            .post('/api/v1/public/signup')
            .type('form')
            .send( {
                'firstname': 'Tonoa', 
                'lastname': 'sampan1', 
                'password': '1234561',
                'email': 'tono1@test.com',
                'username': 'tono121',
                'phone': 0857691691901,
                'adress': 'Rusunawa BPJS Kabil Batam',
                'avatar': null
            })
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
          
              done()
            })    
          })

          it('Should show success status after login', function(done) {
            this.timeout(5000)
            chai.request(app)
            .post('/api/v1/public/login')
            .send({
              email : 'tono1@test.com',
              password : '1234561'
            })
            .end(function(err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
          
              done()
            })    
          })

          


    })
})