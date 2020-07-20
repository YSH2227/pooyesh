const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/images', express.static('images'));
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "data"
  });
  
db.connect((err) => {
    if (err) 
    {
        throw err;
    }
    console.log("Connected to db");
});
global.db = db;

let isSignedIn = false;
let registerLinkContent = "ثبت نام / ورود";
let nameCapitalized;
let doesMessageExist = false;
let wrongInfo = false


const GetMoviesPage = (req, res) => {
    let query = "SELECT * FROM `movies` ORDER BY id ASC"; // query database to get all the users

        // execute query
    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }
        res.render('movies-page.ejs', {
            movies: result
        });
    });
}

const GetMoviePage = (req, res) => {
    let movieId = req.params.id;

    let query = "SELECT * FROM `movies` WHERE id = '" + movieId + "' ";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('movie.ejs', {
            movie: result[0]
        });
    });
}

app.post('/user', (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let usernameQuery = "SELECT * FROM `info` WHERE username = '" + username + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (result.length > 0) {
            message = 'نام کاربری موجود نمیباشد';
            doesMessageExist = true;
            res.render('user.ejs', {
                isMessage : doesMessageExist,
                wrongInfo: wrongInfo,
                message
            });
        } else {

        doesMessageExist = false;

        // send the user's details to the database
        let query = "INSERT INTO `info` (username, password, email) VALUES ('" +
            username + "', '" + password + "', '" + email +  "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            isSignedIn = true;
            registerLinkContent = username;
            nameCapitalized = registerLinkContent.charAt(0).toUpperCase() + registerLinkContent.slice(1)
            res.redirect('/');
        });
        }
    });
    
});

app.post('/login', (req, res) => {
    let currentUsername = req.body.username;
    let currentPassword = req.body.password;
    User.findOne({username: currentUsername, password: currentPassword}, function(err, user){
        if(user ===null){
            wrongInfo = true;
            res.redirect('user')
        } else if (user.username === currentUsername && user.password === currentPassword) {
            registerLinkContent = user.username;
            isSignedIn = true;
            nameCapitalized = registerLinkContent.charAt(0).toUpperCase() + registerLinkContent.slice(1)
            res.redirect('/');
        } else {
            console.log(err, user.username, user.password)
        }
    })
})

app.get('/', (req, res) => {
    res.render('index', {isSignedIn: isSignedIn, registerLinkContent: nameCapitalized})
});

app.get('/user', (req, res) => {
    res.render('user', {wrongInfo: wrongInfo, isMessage: doesMessageExist, message : ""})
})

app.get('/movies-page', GetMoviesPage)

app.get('/movie/:id', GetMoviePage)

app.get('/movie', GetMoviePage)

app.listen(3000, () => {
    console.log('server is running')
})
