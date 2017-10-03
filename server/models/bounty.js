let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schema = new Schema({
  userId: {type: String, required: true, unique: true, dropDups: true},
  initializationTime: {type: Number, required: true},
  price: {type: String, required: true},
  fulfillmentTime: {type: String, required: true},
  methodOfPayment: {type: String, required: true},
  plowRoute: {type: Array, required: true, unique: true, dropDups: true},
})

module.exports = mongoose.model('Bounty', schema)