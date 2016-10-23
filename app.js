//main js file for backend server

var express = require('express');
var path = require('path'); 
var formidable = require('formidable');
var fs = require('fs');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){
 
    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.uploadDir = path.join(__dirname, '/uploads'); //   folder in server , could be use as temp folder before moving file to db
    console.log('upload file path', form.uploadDir);
    // this is where file path name at work
    form.on('file', function(field, file){
        console.log('file name', file.name); 
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    form.on('error', function(err){
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function(){
        res.end('success adn end ');
    });

    form.parse(req); 
});

var server = app.listen(3000, function(){
    console.log('server is listening on port 3000 ... don\'n know why 3000');
})
