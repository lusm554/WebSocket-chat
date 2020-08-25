const mongoose = require('mongoose')

let roomSchema = new mongoose.Schema(
    { roomName: String, room_id: String, users: [String] },
    { timestamps: { createdAt: 'created_at' } }
)
let roomModel = mongoose.model('Rooms', roomSchema)
module.exports = roomModel