
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const siteData = require('./data/postsData');
const _ = require('lodash');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true });

const postSchema = {
    title: String,
    content: String
};

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('home', {
            homeInfo: siteData.pages.home,
            posts: posts
        });
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
    const post = new Post({
        title: req.body.postTitle,
        content: req.body.postContent
    });

    post.save(function (err) {
        if (!err) {
            res.redirect('/');
        }
    });
});

app.get('/posts/:postId', (req, res) => {
    const requestedPostId = req.params.postId;

    Post.findOne({ _id: requestedPostId }, (err, post) => {
        res.render('post', {
            title: post.title,
            content: post.content
        });
    });
});


app.listen(3003, () => {
    console.log('Server started on port 3003');
});
