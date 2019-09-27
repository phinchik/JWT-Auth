const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
const UserModel = require('./data_repository/Models/User_model.js')
// import UserModel from './data_repository/Models/User_model'

// format of token
//Authorization: Bearer <access_token>
const url = `mongodb://phinchik:Phinchik02@ds257838.mlab.com:57838/phinchik`

mongoose.connect(url, { useNewUrlParser: true }, () => {
    console.log("connected to mlab!!!")
})
app.use(bodyParser.json())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));


const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    if (bearerHeader !== undefined) {
        //split space
        const bearer = bearerHeader.split(" ")
        //get token from array
        const bearerToken = bearer[1]
        //set the token
        req.token = bearerToken
        //call next
        next()

    } else {
        res.sendStatus(403)
    }
}

app.get('/api', (req, res) => {
    res.json({
        message: "@@@here"
    })
})

app.get('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post 1",
                authData
            })
        }
    })

})

app.post('/api/login', (req, res) => {
    const value = JSON.parse(req.body.body)
    UserModel.find({ email: value.email }, (err, data) => {
        if (err) {
            res.send(err)
        } else if (data.length < 1) {
            res.send({ error: "Account does not exist" })
        } else {
            const user = {
                email: data[0].email,
                password: data[0].password
            }
            jwt.sign({ user }, 'secretKey', (err, token) => {
                res.send(token)
            })
        }
    })
})

app.post('/api/signUp', (req, res) => {
    const value = JSON.parse(req.body.body)
    UserModel.find({ email: value.email }, (err, data) => {
        if (err) {
            res.send(err)
        } else if (data.length > 0) {
            res.send({ error: 'Email is already Taken' })
        } else {
            UserModel.create({
                email: value.email,
                password: value.password
            }).then(data => {
                if (data) {
                    const user = {
                        email: data.email,
                        password: data.password
                    }
                    jwt.sign({ user }, 'secretKey', (err, token) => {
                        res.send(token)
                    })
                }
            })
        }
    })

})





app.listen(8080, () => {
    console.log('listening to port 8080')
})

