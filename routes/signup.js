const Router = require('express').Router()

Router.get('/signup', (req, res) => {
    res.send('sign up here 😧')
})

Router.post('/signup', (req, res) => {

})

module.exports = Router