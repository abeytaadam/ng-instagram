// require express
var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose');

// config bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// server static files
app.use(express.static(__dirname + '/public'));

// set view engine
app.set('view engine', 'hbs');

// connect mongoDB
mongoose.connect('mongodb://localhost/ng_instagram');

// require photo model
var Photo = require('./models/photo');

app.get('/api/photos', function(req, res) {
	Photo.find( function (error, favPhotos) {
		console.log(req);
		if (error) {
			console.log('error');
		} else {
			res.json({photos: favPhotos});
		}
	});
});

app.post('/api/photos', function(req, res) {
	// create new photo with form data 'req.body'
	
	var savePhoto = new Photo(req.body);
	savePhoto.save();

	console.log(savePhoto);
	// save photo
});
//catch all route
app.get('*', function(req, res) {
	res.render('index');
});
//listen port 3000
app.listen(3000, function() {
	console.log('server started');
});

