var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    action: [String],
    resource: String
})

module.exports = mongoose.model('role', roleSchema, 'user');