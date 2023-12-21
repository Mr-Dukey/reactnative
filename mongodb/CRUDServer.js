const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./userSchema');
const body = require('body-parser');
const cors = require('cors');

const setDomain = {
    origin:'http://localhost:3000'
}

app.use(cors(setDomain));

app.use(body.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/MongoCRUD', function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('Connected to MongoDB');
    }
});

app.get('/user', async function (req, res) {
    await User.find()
        .then(function (user) {
            res.send(user)
        })
        .catch(err => res.send(err));
})

app.post('/crtuser', async function (req, res) {

    console.log(req.body);

    await User.create(req.body)
        .then(function (user) {
            res.send(user)
        })
        .catch(err => res.send(err));
})

app.get('/user/:id', async function (req, res) {
    await User.findById(req.params.id)
        .then(function (user) {
            res.send(user)
        })
        .catch(err => res.send(err));
})

app.put('/update/:id', async function (req, res) {
    await User.findByIdAndUpdate(req.params.id, req.body)
        .then(function (user) {
            res.send(user)
        })
        .catch(err => res.send(err));
})

app.delete('/delete/:id', async function (req, res) {
    await User.findByIdAndDelete(req.params.id)
        .then(function () {
            res.send('Profile Deleted')
        })
        .catch(err => res.send(err));
})

app.listen(2600, () => {
    console.log('server Listening to 2500 port');
})