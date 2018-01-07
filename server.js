const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

// const __API_URL__ = https://cg-mh-booklist.herokuapp.com

app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => console.log('listening on port ', PORT))