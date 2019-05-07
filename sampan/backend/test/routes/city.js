const app = require('../../App'),
  chai = require('chai'),
  expect = chai.expect,
  jwt = require('jsonwebtoken'),
  City = require('../../models/city'),
  Admin = require('../../models/admin')

// chai.use(chaiHttp)

describe('City Routes', () => {
  beforeEach(function () {
    this.timeout(5000)
  })

  afterEach(() => { })

  context('', () => {
    before((done) => {
      Admin.create({ 'local.username': 'Ani', 'local.email': 'ani@mail.com', 'local.password': '123456' })
        .then(() => {
          Admin.findOne({ 'local.email': 'ani@mail.com' })
            .then(user => {
              let objAdmin = {
                iss: "Sampan",
                sub: user.local.email,
                username: user.local.username,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1),
                role: "admin"
              }

              token = jwt.sign(objAdmin, process.ENV.JWT_SECRET)
              adminId = String(objAdmin._id)
            })
        })
        .then(() => {
          City.create({
            'name': 'City 1',
            'description': 'City One'
          })
            .then((data) => {
              cityId = data._id
            })
        })
        .then(() => {
          done()
        })
    })

    after((done) => {
      City.deleteMany({}, () => { })
        .then(() => {
          Admin.deleteMany({}, () => { })
        })
        .then(() => {
          done()
        })
    })

    it('Should create new city', (done) => {
      chai.request(app)
        .post('/api/v1/city')
        .set('Authorization', token)
        .send({ 'name': 'City 1', 'description': 'City One' })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          done()
        })
    })
  })
})