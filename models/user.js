const mongoose = require('mongoose')

let userSchema = new mongoose.Schema(
    { username: String, password: String, external_id: String },
    { timestamps: { createdAt: 'created_at' } }
)

let userModel = mongoose.model('Users', userSchema)

module.exports = userModel