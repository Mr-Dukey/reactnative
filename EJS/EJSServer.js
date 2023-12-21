const express = require('express');
const app = express();
const body = require('body-parser')

app.set('view engine','ejs');

app.use(body.urlencoded({extended:true}));

const a = []

app.get('/home',function(req,res){
    res.render('Home',{arr:a});
})

app.post('/home',function(req,res){
    a.push(req.body.inp);
    res.redirect('/home');
})
app.listen(2500, ()=>{console.log('EJS Server is running');})