const express = require('express'), app = express()
const http = require('http')
const WebSocket = require('ws')
const path = require('path')
const config = require('config')

const PORT = config.get('port')

// connect mongoDB
const mongoose = require('mongoose')
mongoose.connect(config.get('mongoID') , {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) throw err;
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

app.use('/chat', express.static(path.join(__dirname, '/public')))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// sign in 
app.use('/auth', require('./routes/signin'))

// sign up
app.use('/auth', require('./routes/signup'))

app.get('/', (req, res) => {
    res.send('main_page_here')
})

wss.on('connection', function connection(ws, req) {

    // receive data from client
    ws.on('message', function incoming(message) {
        let data = JSON.parse(message)

        sendMessages(ws, message)
    })
})

wss.on('close', function close() {
    console.log('connection closed')
})

function sendMessages(ws, message) {
    wss.clients.forEach(client => {
        client.send(message);
    })
}

server.listen(PORT)