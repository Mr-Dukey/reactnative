const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./userSchema');
const File = require('./FileSchema');
const body = require('body-parser');
const multer = require('multer');

app.use(body.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/SampleTestShell', function (error) {

// mongoose.connect('mongodb+srv://root:root@cluster0.xhtmdrh.mongodb.net/?retryWrites=true&w=majority', function (error) {
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

    await User.create({
        Name: req.body.Name,
        Phone: req.body.Phone
    })
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
    }
})

const Store = multer({ storage: storage });


app.post('/file', Store.single('file'), function (req, res) {
    File.create({
        FileName: req.file.originalname,
        path: req.file.path
    })
        .then(function (user) {
            res.send(user)
        })
        .catch(error => res.send(error));
})

app.get('/getfile', function (req, res) {
    File.find()
        .then(function (user) {
            res.send(user)
        })
        .catch(error => res.send(error));
})

app.listen(2500, () => {
    console.log('server Listening to 2500 port');
})