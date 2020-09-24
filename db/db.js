const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('database connected');
});

mongoose.connection.on('error', error => {
    console.log('error', error);
});