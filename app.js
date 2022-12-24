const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

const app = express();

// CONNECT DB
mongoose.connect('mongodb://localhost/cleanblog-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
});

app.get('/post/edit_post/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit_post', {
    post,
  });
});

app.put('/post/:id', async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  res.redirect(`/post/${req.params.id}`);
});

app.delete('/post/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);

  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});
