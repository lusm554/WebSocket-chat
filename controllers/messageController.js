const MessageModel = require('../models/chatHistory')
/**
 * @param {string} message - JSON object from received message
 */
async function saveMessage(message) {
    let messageModel = new MessageModel({ message })
    try {
        return await messageModel.save()        
    } catch (error) {
        console.log(error)
    }
}

async function getPreviousMsgs() {
    return await MessageModel.find()
}
module.exports = { saveMessage, getPreviousMsgs }