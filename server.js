'use strict';
const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const fs = require('fs');
const pg = require('pg');
// const __API_URL__ = https://cg-mh-booklist.herokuapp.com
const conString = 'postgres://localhost:5432/books_app';



app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => console.log('listening on port ', PORT))