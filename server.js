const express = require('express');
const app = express();
require('./db/connection');
const EmployRouter = require('./routes/employeeRouter');

const PORT = process.env.PORT || 7000

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', EmployRouter);

app.listen(PORT, () => {
    console.log(`Server is running now At ${PORT}`)
})