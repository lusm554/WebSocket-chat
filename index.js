const app = require('express')();
const ws = require('ws')
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(8080)