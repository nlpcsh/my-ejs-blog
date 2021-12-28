
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const siteData = require('./data/postsData');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('home', {
        homeInfo: siteData.pages.home,
        posts: siteData.posts
    });
});

app.get('/about', function (req, res) {
    res.render('about', { aboutInfo: siteData.pages.about });
});

app.get('/contact', function (req, res) {
    res.render('contact', { contactInfo: siteData.pages.contact });
});

app.get('/compose', function (req, res) {
    res.render('compose');
});

app.post('/submit', function (req, res) {
    siteData.posts.push({
        title: req.body.postTitle,
        content: req.body.postContent
    });

    res.redirect('/');
});




app.listen(3003, function () {
    console.log('Server started on port 3003');
});
