const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee')
    .then(() => console.log('Your Connection is established'))
    .catch((err) => console.log(err))