const mongoose = require('mongoose')

let messageSchema = new mongoose.Schema(
    { message: String },
    { timestamps: { createdAt: 'created_at' } }
)
let MessageModel = mongoose.model('ChatHistory', messageSchema)
module.exports = MessageModel