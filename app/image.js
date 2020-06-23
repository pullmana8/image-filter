const bodyParser = require('body-parser')
const express = require('express')

    (async () => {
        const app = express()

        const port = process.env.PORT || 8000

        app.use(bodyParser.json())

        app.get('/filteredimage', async (req, res) => {
            let { image_url } = req.query

            if (!image_url) {
                return res.status(400).send(`Invalid url or no url`)
            }
        })
    })