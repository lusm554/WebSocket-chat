function sendMessageToServer(msg, ws) {
    let jsonMsg = JSON.stringify(msg)
    ws.send(jsonMsg)

    m.value = ''
}

export { sendMessageToServer }