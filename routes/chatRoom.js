const Router = require('express').Router()
const { nanoid } = require('nanoid')
const path = require('path')
const roomModel = require('../models/room')

Router.post('/create', (req, res) => {
    const room_id = nanoid(), roomObj = { room_id, ...req.body } 

    new roomModel(roomObj).save((err, doc) => {
        if(err) {
            res.status(500).send('Internal Server Error')
            throw err;
        }

        res.json(roomObj)
    })
})

Router.get('/', async (req, res) => {
    let room_id = req.query.id  

    const isRoomExist = ( await roomModel.find({ room_id })).length !== 0

    if(isRoomExist) { 
        process.env.NODE_ENV === 'production' ? 
            res.sendFile(path.join(__dirname, '..', 'build', 'chatGroup.html')) :
            res.sendFile(path.join(__dirname, '..', 'public', 'chatGroup.html'))
    }
    else {
        res.status(401).send('Unauthorized')
    }
})

Router.post('/', async (req, res) => {
    let { room_id } = req.body

    let room = ( await roomModel.find({ room_id }))[0]
    const isRoomExist = !!room

    if(isRoomExist) {
        res.json( room )
    }
    else {
        res.status(401).send('Unauthorized')
    }
})

Router.post('/join', async (req, res) => {
    let { user_id, room_id } = req.body
    let room = ( await roomModel.find({ room_id }))[0]

    if(room === undefined) {
        return res.status(401).send('Unauthorized')
    }
    else if ( alreadyHaveUser(user_id, room) ) {
        return res.json( room )
    }

    room.users.push(user_id) 
    roomModel.updateOne({ room_id }, { users: room.users }, (err, doc) => {
        if(err) {
            res.status(500).send('Internal Server Error')
            throw err;
        }
        res.json( room )
    })
})

function alreadyHaveUser(user_id, room) {
    return room.users.includes(user_id)
}

Router.delete('/delete', (req, res) => {
    let room_id = req.body.room_id

    roomModel.deleteOne({ room_id }, (err) => {
        if(err) {
            return res.status(401).send('Unauthorized')
        }
        res.sendStatus(200)
    })
})

module.exports = Router