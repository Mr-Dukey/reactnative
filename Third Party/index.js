const express = require('express');
const app = express();

app.get('/user',function(req,res){
    res.send('<h1>This is Express Framework</h1>')
})

app.get('/home', function(req,res){
    res.sendFile('Home.html',{root:__dirname})
})

console.log(__dirname);
console.log(__filename);


app.listen(2000, ()=>console.log('Server Started'))

/*
    npm install express
    npm install -g nodemon

    __dirname => returns current directory of the working file
    __filename => returns current working file name
*/