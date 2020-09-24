const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('./db/db');

const {requireAuth } = require('./controllers/auth');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());
// app.use( (req, res, next) => {
//     console.log('headers',req.headers);
//     console.log('cookies',req.cookies.t)
//     next();
// })

const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/survey');

app.use('/api/auth', authRoutes);
app.use('/api/survey', surveyRoutes);


// app.use('/api/todos/',function(req, res){
//     return res.json({ msg: 'Success'});
// })
app.listen(process.env.port, () => {
    console.log('server running');
})