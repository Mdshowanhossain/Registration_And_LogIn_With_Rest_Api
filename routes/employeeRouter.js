const express = require('express');
const bcrypt = require('bcryptjs');
const employeeRegister = require('../models/employeeSchema');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/', (req, res) => {
    res.render('registration')
})

router.post('/register', async (req, res) => {

    try {
        const password = req.body.password;
        const cPassword = req.body.cPassword;

        if (password === cPassword) {
            const postData = new employeeRegister({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: password,
                cPassword: cPassword,
                mobile: req.body.mobile,
                age: req.body.age
            })
            const saveData = await postData.save();
            res.status(201).redirect('/login');
        }
        else {
            res.status(500).send('Password are not Matching')
        }
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log('before', password)


        const employeeEmail = await employeeRegister.findOne({ email: email })

        const matchPassword = await bcrypt.compare(password, employeeEmail.password)

        // console.log(matchPassword)

        if (matchPassword) {
            res.status(200).render('Home')
        }
        else {
            res.status(400).send('Password are not Matching')
        }
    }
    catch (err) {
        res.status(400).send('Invalid Email')
    }
})

module.exports = router;