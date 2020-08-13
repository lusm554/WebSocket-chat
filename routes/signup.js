const Router = require('express').Router()

Router.get('/signup', (req, res) => {
    res.send('sign up here 😧')
})

module.exports = Router