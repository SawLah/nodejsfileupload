//main js file for backend server

var express = require('express');
var path = require('path'); 
var formidable = require('formidable');
var fs = require('fs');

//require for gridfs mongo
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1/gridfs');
var conn = mongoose.connection; 
var Grid = require('gridfs-stream');

var app = express();

Grid.mongo = mongoose.mongo;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/upload', function(req, res){
 
    var count = 0; //to be deleted

    var form = new formidable.IncomingForm();

    form.multiples = true;
    //folder in server , could be use as temp folder before moving file to db
    form.uploadDir = path.join(__dirname, '/uploads'); //   /Users/LarLerdoe/Documents/Work_Dev/RESTfulAPI MEAN/fileuploader_mic/uploads
    
    console.log('upload file path', form.uploadDir);
    // this is where file path name at work
    form.on('file', function(field, file){
        
        console.log('logging field', field); console.log(count++); console.log('file name', file.name);  console.log('what is file in?', file);
        var uploadedfile = path.join(form.uploadDir, file.name);

        fs.rename(file.path, uploadedfile);

        console.log('uploadedfile ', uploadedfile);
       
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
