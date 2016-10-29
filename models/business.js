var mongoose = require("mongoose");
var mongoosastic = require('mongoosastic');

var businessSchema = mongoose.Schema({
  name: "string",
  category: "string",
  email: "string",
  address: "string",
  city: "string",
  province: "string",
  postal_code: "string",
  location: "string"
});

businessSchema.plugin(mongoosastic, {index: 'customers3', type: 'customer'});

module.exports = mongoose.model('Business', businessSchema);