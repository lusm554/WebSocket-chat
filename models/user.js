const mongoose = require('mongoose')

let userSchema = new mongoose.Schema(
    {username: String, password: String},
    { timestamps: { createdAt: 'created_at' } }
)

let userModel = mongoose.model('Users', userSchema)

module.exports = userModel