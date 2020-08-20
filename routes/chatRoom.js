const Router = require('express').Router()
const path = require('path')

/* /room/create */
Router.post('/create', (req, res) => {
    res.json(req.body)
})

Router.get('/:id', (req, res) => {
    res.json(req.params)
})

Router.delete('/delete', (req, res) => {
    res.send('...')
})

module.exports = Router