const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const request = require('request');
const cors = require('cors');

const bcrypt = require('bcrypt');
const degree = 10;

const app = express();
const api_url = 'https://jobs.github.com/positions.json';

const mysql = require('mysql');
const { response } = require('express');

const db = mysql.createPool({
    host:'job-hunter-mysql.c3esjbut1xsv.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password:'password',
    database: 'jobhunter',
});
  
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT",],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key: "userId",
    secret: "imagoodwebdeveloper",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    },

}))


app.post('/api/signup', (req, res) => {

    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    const sqlCheck = "SELECT * FROM users WHERE userName = ?"
    const sqlInsert = "INSERT INTO users (userName, userPassword) VALUES (?,?)";

    bcrypt.hash(userPassword, degree, (err, hash)=>{
        db.query(sqlCheck, [userName], (err, result) =>{
            if(err){
                res.send({err: err})
            }
            if(result.length == 0){
                db.query(sqlInsert, [userName, hash], (err, re) => {
                    if(err){
                        res.send({err: err})
                    }
                })
            }
            else{ res.send({message: 'username is already taken, choose another one.'})}
        })    
    })

});

app.post('/api/add', (req, res) => {

    const userName = req.body.userName;
    const position = req.body.position;

    const sqlInsert = "INSERT INTO savedJobs (job_id, userName, company_logo, company, title, description) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sqlInsert, [position.id, userName.userName, position.company_logo, position.company, position.title, position.description], (err, result) =>{
        if(err){
            console.log(err)
            res.send({err: err})
        }
    })
});

app.post('/api/delete', (req, res) => {

    const userName = req.body.userName;
    const position = req.body.position;
    
    const sqlDelete = "DELETE FROM savedJobs WHERE job_id = ? AND userName = ?";

    db.query(sqlDelete, [position.id, userName.userName], (err, result) =>{
        if(err){
            res.send({err: err})
        }
    })
});

app.post('/api/saved', (req, res) => {

    const userName = req.body.userName;
    console.log(req.body)
    const sqlSelect = "SELECT * FROM savedJobs WHERE userName = ?";

    db.query(sqlSelect, [userName], (err, result) =>{
        if(err){
            res.send({err: err})
        }
        res.send(result);
    })
});

app.post('/api/login', (req, res) => {

    const userName = req.body.userName;
    const password = req.body.userPassword;

    const sqlSelect = "SELECT * FROM users WHERE userName = ?";
    db.query(sqlSelect, [userName], (err, result) =>{
        if(err){
            res.send({err: err})
        }
        if(result.length > 0){
            bcrypt.compare(password, result[0].userPassword)
            .then((r)=>{
                if(r){
                    req.session.user = result[0];
                    res.send(req.session.user);
                }
                else{res.send({message:'Invalid username or password'})}
            })
        } else{
            res.send({message:'User does not exist.'})
        }
    })
});

app.get('/api/login', (req, res) => {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }else{
        res.send({loggedIn: false})
    }
});

app.get('/api/logout', (req, res) => {
    if(req.session.user){
        res.clearCookie('userId');
        res.send({loggedIn: false})
    }
});

app.get('/', (req, res) =>{
    res.send('h');
});

app.get('/jobs', (req, res) => {
    request(
        { url: api_url },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
});

app.post('/api/search', (req, res)=>{
    const keyword = req.body.keywords;
    request(
        {url: api_url+'?location='+ keyword},
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error.message });
            }
            res.json(JSON.parse(body));
        }
    )
})
  
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`listening on ${PORT}`));

 