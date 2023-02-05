const express = require('express');

const blogService = require('./blog-service');

const app = express();



// declare global array variables

let posts = [];

let categories = [];



// read data files and initialize the global arrays

blogService.initialize()

  .then(function() {

    console.log('Server initialized');

    console.log('Express http server listening on port 8080');

    app.listen(process.env.PORT || 8080)

  })

  .catch(function(err) {

    console.log(err);

  });

  

// set up the / route to redirect to /about

app.get('/', function(req, res) {

  res.redirect('/about');

});



// set up the /about route to return the about.html page

app.get('/about', function(req, res) {

  res.sendFile(__dirname + '/views/about.html');

});



// set up the /blog route to return all published blog posts

app.get('/blog', function(req, res) {

  blogService.getPublishedPosts()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



// set up the /posts route to return all blog posts

app.get('/posts', function(req, res) {

  blogService.getAllPosts()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



// set up the /categories route to return all categories

app.get('/categories', function(req, res) {

  blogService.getCategories()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



// set up the 'no matching route' to return a custom message

app.get('*', function(req, res) {

  res.send('Page Not Found');

  res.status(404);

});