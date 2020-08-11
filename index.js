const express = require('express')
const app = express()
const http = require('http')
const WebSocket = require('ws')
const path = require('path')

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use(express.static(path.join(__dirname, '/public')))

wss.on('connection', function connection(ws, req) {
    ws.on('message', function incoming(message) {
        // let data = JSON.parse(message)

        ws.send(message)
    })

    console.log(req.socket.remoteAddress)
})


wss.on('close', function close() {
    console.log('connection closed')
})

server.listen(8080)