const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const pageController = require('./controllers/pageControllers');
const postController = require('./controllers/postControllers');

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

app.get('/', pageController.getIndexPage);
app.get('/post/:id', pageController.getPostPage);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPostPage);
app.get('/post/edit_post/:id', pageController.getEditPage);

app.post('/posts', postController.createPost);
app.put('/post/:id', postController.updatePost);
app.delete('/post/:id', postController.deletePost);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda baslatildi.`);
});
