const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const Job = require('./models/job');
const FakeDb = require('./fake-db');
const path = require('path');

const jobRoutes = require('./routes/jobs'),
      userRoutes = require('./routes/users'),
      bookingRoutes = require('./routes/bookings'),
	  imageUploadRoutes = require('./routes/image-upload'),
	  reviewRoutes = require('./routes/reviews');

mongoose.connect(config.DB_URI).then(() => {

	if(process.env.NODE_ENV !== 'production') {
		const fakeDb = new FakeDb();
		//fakeDb.seedDb();
	}
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1', imageUploadRoutes);

if(process.env.NODE_ENV === 'production') {
	const appPath = path.join(__dirname, '..', 'dist');
	app.use(express.static(appPath));

	app.get('*', function(req, res) {
		res.sendFile(path.resolve(appPath, 'index.html'));
	});	
}



const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
	console.log('Node Server is running');
});