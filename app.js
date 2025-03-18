const express = require('express');
const morgan = require('morgan');
const path = require('path');
const blogRoutes = require('./routes/blogRoutes');
const {connectDB} = require('./dbhandler/handler');

// express app
const app = express();

// connect to mongodb & listen for requests

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static(path.join(__dirname, 'public')));
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
app.use("/auth", authroutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

const PORT = process.env.PORT || 3500;
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
      console.log('hi, this worked! :)');
    });

  } catch (err) {
    console.log('connect failed, error:', err);
    prosses.exit(1);
  };