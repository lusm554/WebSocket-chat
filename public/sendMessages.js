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

function setUserDataOnServer(ws, type) {
    if(!localStorage.user) return;
    let { _id: id, username } = JSON.parse( localStorage.user )
    let data = JSON.stringify({ type, id, username })
    ws.send(data)
}

function getUser() {  
    const USER = JSON.parse(
        localStorage.getItem('user')
    )
    return USER;
}

export { sendMessageToServer, getUser, setUserDataOnServer }