var User = require('../models/user');
var Role = require('../models/role');

module.exports.list = () => {
    return User
        .find()
        .exec()
}

module.exports.get = (username) => {
    return User.findById(username).exec()
}

module.exports.update_token = (username, token) => {
    return User.updateOne({_id: username}, {$set: {token: token}}).exec()
}

module.exports.create = (username, password) => {
    var new_user = User({
        _id: username,
        password: password
    })

    return new_user.save()
}

module.exports.add_role = (username, role) => {
    new_role = new Role(role)

    user = User.findById(username).exec((err, user) => {
        user.role.push(new_role)
        user.save()
    })
}
