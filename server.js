'use strict';
const express = require('express')
const cors = require('cors')
const fs = require('fs');
const pg = require('pg');

const app = express()
app.use(cors())

const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app'
// const __API_URL__ = https://cg-mh-booklist.herokuapp.com
const conString = 'postgres://localhost:5432/books_app';

const client = new pg.Client(DATABASE_URL)
client.connect()

app.get('/api/v1/books', (req, res) => {

    client.query(`
        SELECT book_id, title, author, image_url FROM books;
    `).then(result => res.send(result.rows))
        .catch(err => console.error(err))
} )

app.get('/api/v1/books/:id', (req, res) => {
    client.query(`
        SELECT * FROM books WHERE book_id=${req.params.id};
    `).then(result => res.send(result.rows[0]))
        .catch(err => console.error(err))

})



app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => console.log('listening on port ', PORT))