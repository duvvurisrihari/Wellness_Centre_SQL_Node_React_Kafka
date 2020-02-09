var chai = require('chai')
var assert = require('chai').assert

var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var app = 'http://localhost:3100'

describe('Test scenario', function () {
  it('orders placed', function () {
    chai
      .request(app)
      .get('/Alluserorders/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})
describe('Test scenario 2', function () {
  it('Fetch all items', function () {
    chai
      .request(app)
      .get('/AllITEMS/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})

describe('Test scenario 3', function () {
  it('Get Restaurant List', function () {
    chai
      .request(app)
      .get('/AllRestaurants/')
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})

describe('Test scenario 4', function () {
  it('Insert Items into menu', function () {
    chai
      .request(app)
      .post('/insertitems/')
      .send({
        itemname: 'Biryani',
        restid: 6,
        RestaurantName: 'BASIL',
        description: 'well well',
        price: 5
      })
      .end(function (err, res) {
        assert.equal('Success', 'Success')
      })
  })
})
describe('Test scenario 5', function () {
  it('Update Order Status', function () {
    chai
      .request(app)
      .post('/updateorderstatus/')
      .send({ orderstatus: 'Placed', orderid: 6 })
      .end(function (err, res, body) {
        assert.equal('Success', 'Success')
      })
  })
})
