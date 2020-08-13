const Router = require('express').Router()

Router.get('/signin', (req, res) => {
    res.send('sign in here 🥱')
})

module.exports = Router