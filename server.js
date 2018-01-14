'use strict';
const express = require('express')
const cors = require('cors')
const fs = require('fs');
const pg = require('pg');

const app = express()

const PORT = process.env.PORT || 3000
//const conString = 'postgres://localhost:5432/kilovolt';
//const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app'
// const conString = 'postgres://localhost:5432/books_app';
const DATABASE_URL = 'https://cg-mh-booklist.herokuapp.com'
const client = new pg.Client(DATABASE_URL)
client.connect()
//const __API_URL__ = https://cg-mh-booklist.herokuapp.com

app.use(cors())

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

app.post('/api/v1/books', express.json(), express.urlencoded({extended:true}), (req, res) => {

    client.query(`
        INSERT INTO books
            (title, author, image_url, isbn, description)
            VALUES($1, $2, $3, $4, $5);
    `,[
        req.body.title,
        req.body.author,
        req.body.image_url,
        req.body.isbn,
        req.body.description

    ]).then(() => res.send('inserted successfully'))
    .catch(err => console.error(err))
})

app.put('/api/v1/books/:id', express.json(), express.urlencoded({extended:true}), (req, res) => {
    
    client.query(`
        UPDATE books 
        SET title=$1, author=$2, image_url=$3, isbn=$4, description=$5
        WHERE book_id=$6
    `,[
        req.body.title,
        req.body.author,
        req.body.image_url,
        req.body.isbn,
        req.body.description,
        req.params.id
    ]).then(result => res.send(result))
    .catch(err => console.error(err))
})

app.delete('/api/v1/books/:id', (req, res) => {
    client.query(`
        DELETE FROM books WHERE book_id=${req.params.id};
    `).then(result => res.send(result))
    .catch(err => console.error(err))
})





// app.get('/test', (req, res) => res.send('hello world'))

app.listen(PORT, () => console.log('listening on port ', PORT))