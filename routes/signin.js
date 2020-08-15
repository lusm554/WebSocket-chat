const Router = require('express').Router()
const path = require('path')

Router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'signin.html'))
})

module.exports = Router