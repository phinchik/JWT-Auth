const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

// format of token
//Authorization: Bearer <access_token>

app.use(cors())

const verifyToken = (req, res, next) => {
    //Get auth header value
    const bearerHeader = req.headers['authorization']
    if(bearerHeader !== undefined ){
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
    if(err){
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
   const user = {
       id: 1,
       username: req.username,
       email: req.password
   }
   jwt.sign({user}, 'secretKey', (err, token) => {
    res.send(token)
   })
})


app.listen(8080, () => {
    console.log('listening to port 8080')
})