const MessageModel = require('../models/chatHistory')

/**
 * @param {string} message - JSON object from received message
 */
async function saveMessage(message) {
    let response;

    await new MessageModel({ message }).save((err, document) => {
        if(err) {
            console.log(err)
            return;
        }

        response = document
    })
    return response
}

module.exports = saveMessage