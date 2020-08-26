/**
 * Send message to the server from common chat
 * @param {Object} msg - object with information about user and message
 * @param {*} ws 
 */
function sendMessageToServer(msg, ws) {
    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)

    m.value = ''
}


function getUser() {  
    const USER = JSON.parse(
        localStorage.getItem('user')
    )
    return USER;
}

export { sendMessageToServer, getUser }