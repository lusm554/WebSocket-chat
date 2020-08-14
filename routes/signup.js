const Router = require('express').Router()
const path = require('path')

Router.get('/signup', (req, res) => {
    const PATH_SIGNUP = path.join(__dirname, '..', 'public', 'signup.html')

    res.sendFile(PATH_SIGNUP)
})

Router.post('/signup', (req, res) => {
    const { username, password} = req.body
    console.log(username, password)

    res.send('1')
})

module.exports = Router