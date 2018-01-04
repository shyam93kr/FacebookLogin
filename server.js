var express = require("express");
var app = express();
var cookieParser = require('cookie-parser')

app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded());


var userIdentification =
    {
        username: 'a',
        password: 'a'
    };
var userDetails = {
    age: 24,
    address: 'manpur gaya',
    state: 'maa chudaye'
};



app.get('/', function(req, res){
    console.log(req.cookies['username']);
    if(userIdentification.username == req.cookies['username'] && userIdentification.password == req.cookies['password'])
    {
         res.redirect('/userHomepage')
    }
    else
    {
        res.sendFile('index.html',{root:'./'});
    }



});

app.post('/login', function(req, res){
    console.log('in here 1');
    console.log(req.body.username, userIdentification.username, userIdentification.password, req.body.password);
    if(req.body.username === userIdentification.username && req.body.password == userIdentification.password)
    {

        console.log('in here 2');
        res.cookie('password', userIdentification.password, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access

        });
        res.cookie('username', userIdentification.username, {
            maxAge: 86400 * 1000, // 24 hours
            httpOnly: true, // http only, prevents JavaScript cookie access
             // cookie must be sent over https / ssl
        });
        console.log('hello');
        return res.redirect('/UserHomepage');

    }

    else{


        return res.redirect('/errorPage');
    }

});

app.get('/UserHomepage', function(req, res){
    if(userIdentification.username == req.cookies['username'] && userIdentification.password == req.cookies['password'])
    {
        res.sendfile('userHomepage.html', {root: './'})
    }
    else
    {
        res.sendFile('index.html',{root:'./'});
    }
});

app.get('/errorPage', function(req, res){
    res.cookie('username', userIdentification.username, {
        maxAge: 0
    });
    res.cookie('password', userIdentification.password, {
        maxAge: 0
    });
    res.sendFile('errorPage.html',{root:'./'});
});

app.get('/logout', function(req,res){
    res.cookie('username', userIdentification.username, {
        maxAge: 0
    });
    res.cookie('password', userIdentification.password, {
        maxAge: 0
    });
    res.sendFile('logOutPage.html',{root:'./'});
})

app.listen(4000, function(){
    console.log("server is up and running on port no. 4000");

});