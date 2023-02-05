const express = require('express');

const blogService = require('./blog-service');

const app = express();



let posts = [];

let categories = [];



blogService.initialize()

  .then(function() {

    console.log('Server initialized');

    console.log('Express http server listening on port 8080');

    app.listen(process.env.PORT || 8080)

  })

  .catch(function(err) {

    console.log(err);

  });

  

app.get('/', function(req, res) {

  res.redirect('/about');

});



app.get('/about', function(req, res) {

  res.sendFile(__dirname + '/views/about.html');

});



app.get('/blog', function(req, res) {

  blogService.getPublishedPosts()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



app.get('/posts', function(req, res) {

  blogService.getAllPosts()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



app.get('/categories', function(req, res) {

  blogService.getCategories()

    .then(function(data) {

      res.json(data);

    })

    .catch(function(err) {

      res.json({ message: err });

    });

});



app.get('*', function(req, res) {

  res.send('Page Not Found');

  res.status(404);

});