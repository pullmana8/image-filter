/* import express from 'express'
import chokidar from 'chokidar'
*/

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const chokidar = require('chokidar')
const watcher = chokidar.watch('./app')

const resize = require('./app/resize')

app.use(function (req, res, next) {
    require('./app/index')(req, res, next)
})

watcher.on('ready', function () {
    watcher.on('all', function () {
        console.log('Clearing /dist/ module cache from server')
        Object.keys(require.cache).forEach(function (id) {
            if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
        })
    })
})

app.get('/', (req, res) => {
    const widthString = req.query.width
    const heightString = req.query.height
    const format = req.query.format

    let width, height
    if (widthString) {
        width = parseInt(widthString)
    }

    if(heightString) {
        height = parseInt(heightString)
    }

    res.type(`image/${format || 'png, jpg'}`)

    resize('unsplash.png', format, width, height).pipe(res)
})

app.listen(port, function () {
    console.log('Server is running on PORT', port)
})