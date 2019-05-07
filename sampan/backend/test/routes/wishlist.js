const chai = require('chai'),
expect = chai.expect

const app = require('../../App'),
chaiHttp = require('chai-http'),
jwt = require('jsonwebtoken')

chai.use(chaiHttp)

describe('Wishlist routes', function() {
    before(function(done){
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
    }).then(()=> {
        done()
    })
    })

    after(function(done) {
        User.deleteMany({}, ()=> {})
        .then(()=> {
            done()
            })
        })
    
    it('Should show wishlist', function(done) {
    this.timeout(5000)
    chai.request(app)
    .get('/api/v1/wishlist')
    .set('Authorization', tokenUser)    
    .end(function(err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(200);

    done()   
    })
    })

    it('Should create wishlist', function(done) {
    this.timeout(5000)
    chai.request(app)
    .post('/api/v1/wishlist/')
    .set('Authorization', tokenUser)
    .send({
        'itemId': '5ca21e7a89c5250517065903'
    })
    .end(function(err, res) {
    expect(err).to.be.null;
    expect(res).to.have.status(201);

    done()    
    })
    })
})