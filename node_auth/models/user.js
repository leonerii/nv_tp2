var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema({
    action: [String],
    resource: String
})

var userSchema = new mongoose.Schema({
    _id: String,
    password: String,
    token: String,
    roles: [roleSchema],
    admin: Boolean
});

module.exports = mongoose.model('user', userSchema);