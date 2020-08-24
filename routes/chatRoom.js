const Router = require('express').Router()
const { nanoid } = require('nanoid')
// room storage 
let rooms = new Map()

Router.post('/create', (req, res) => {
    const room_id = nanoid(), roomObj = { room_id, ...req.body } 
    rooms.set(room_id, roomObj)

    res.json(roomObj)
})

Router.get('/:id', (req, res) => {
    let room_id = req.params.id

    if(rooms.has(room_id)) {
        res.json(rooms.get(room_id))
    }
    else {
        res.status(401).send('Unauthorized')
    }
})

Router.post('/join', (req, res) => {
    let { user_id, room_id } = req.body
    let room = rooms.get(room_id)

    if(room === undefined) {
        return res.status(401).send('Unauthorized')
    }
    else if ( alreadyHaveUser(user_id, room_id) ) {
        return res.status(400).send('BAD REQUEST')
    }
    room.users.push(user_id)

    res.json({ room })
})

function alreadyHaveUser(user_id, room_id) {
    let room = rooms.get(room_id)
    return room.users.includes(user_id)
}

Router.delete('/delete', (req, res) => {
    let room_id = req.body.room_id

    let isRoomDeleted = rooms.delete(room_id)
    if(isRoomDeleted) {
        res.sendStatus(200)
    }
    else {
        res.status(401).send('Unauthorized')
    }
})

module.exports = Router