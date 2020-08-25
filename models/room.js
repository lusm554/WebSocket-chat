const mongoose = require('mongoose')

let roomSchema = new mongoose.Schema(
    { name: String, room_id: String, users: [String] },
    { timestamps: { createdAt: 'created_at' } }
)
let roomModel = mongoose.model('Users', roomSchema)
module.exports = roomModel