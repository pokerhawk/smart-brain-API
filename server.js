const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';
const app = express();
const cors = require('cors');
const db = require('knex');
const knex = db({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'xiaoxiao10',
        database : 'smartbrain'
    }
})

knex.select('*').from('users').then(data=>console.log(data));

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{res.send(database.users);})
app.post('/signin', signin.handleSignin(knex, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt, saltRounds)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})
app.put('/image', (req, res)=> {image.handleImage(req,res, knex)})
app.post('/imageURL', (req, res)=> {image.handleApiCall(req,res)})

app.listen(3000, ()=>{
    console.log('app is running on port 3000')
})