const express = require('express')
const morgan = require('morgan')

const port = 8000

const app = express()

const {getUser, postNewUser} = require('./handlers')

app
    .use(function(req, res, next) {
        res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
        );
        res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    })
    .use(morgan('tiny'))
    .use(express.static('./server/assets'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    .get('/api/user/:userId', getUser)

    .post('/api/newUser', postNewUser)

app.listen(port, () => {console.log('Server running at port 8000')})