const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const PORT = process.env.PORT || 3500;
  try {
    mongoose.connect('mongodb://10.12.10.111');
    console.log('connected to db')

    
    then.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
      console.log('hi, this worked! :)');
    });
  } catch (err) {
    console.log('task failed, error:', err);
    prosses.exit(1);
  };

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});