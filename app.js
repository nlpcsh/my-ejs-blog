
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const siteData = require('./data/postsData');
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        homeInfo: siteData.pages.home,
        posts: siteData.posts
    });
});

app.get('/about', (req, res) => {
    res.render('about', { aboutInfo: siteData.pages.about });
});

app.get('/contact', (req, res) => {
    res.render('contact', { contactInfo: siteData.pages.contact });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/submit', (req, res) => {
    siteData.posts.push({
        title: req.body.postTitle,
        content: req.body.postContent
    });

    res.redirect('/');
});

app.get('/posts/:postName', (req, res) => {
    const postName = _.lowerCase(req.params.postName);
    const result = { };

    siteData.posts.some((post) => {
        const title = _.lowerCase(post.title);
        if (title == postName) {
            result.title = postName;
            result.content = post.content;

            res.render('post', result);

            return true;
        }
    });
});


app.listen(3003, () => {
    console.log('Server started on port 3003');
});
