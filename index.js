const express = require('express'), app = express()
const http = require('http')
const WebSocket = require('ws')
const path = require('path')
const config = require('config')

const PORT = config.get('port')

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.static(path.join(__dirname, '/public')))

wss.on('connection', function connection(ws, req) {

    // receive data from client
    ws.on('message', function incoming(message) {
        let data = JSON.parse(message)

        switch(data.type) {
            case 'login': 
                validateUser(ws, data);
                break;
            case 'message':
                sendMessages(ws, message)
                break;
        }
    })

    // console.log(req.socket.remoteAddress)
})


wss.on('close', function close() {
    console.log('connection closed')
})

function validateUser(ws, data) {
    //make something important
    data.status = 'success'
    ws.send(JSON.stringify(data))
}

function sendMessages(ws, message) {
    wss.clients.forEach(client => {
        client.send(message);
    })
}

server.listen(PORT)