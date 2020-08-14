const Router = require('express').Router()
const path = require('path')
const mongoose = require('mongoose')
const userModel = require('../models/user')

Router.get('/signup', (req, res) => {
    const PATH_SIGNUP = path.join(__dirname, '..', 'public', 'signup.html')

    res.sendFile(PATH_SIGNUP)
})

Router.post('/signup', validateUser, (req, res) => {
    // if the user is verified
    // we redirect on the chat page
    res.redirect('/chat')
})

//performs user verification 
async function validateUser(req, res, next) {
    const { username, password} = req.body

    if(!username || !password) {
        return res.sendStatus(401)
    }

    const isUserExist = ( await userModel.find({ username, password }) ).length !== 0
    if(isUserExist) {
        return res.sendStatus(403)
    }

    // add user to DB
    new userModel({ username, password }).save((err, doc) => {
        if(err) {
            res.sendStatus(500)
            throw err;
        }

        console.log(doc)
    })

    next()
}

module.exports = Router