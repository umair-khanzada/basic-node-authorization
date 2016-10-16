/**
 * Created by Owais on 10/16/2016.
 */

var express    =    require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app        =    express();
var users = [{name: "umair", email: "umair@gmail.com", password: "123"}];
var isLogin = function (req, res, next) {
    if(Number(new Date()) > req.cookies.token || !req.cookies.token) res.redirect('/login');
    else next();
};

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/',function(req, res){
    res.render('index.html')
});
app.get('/about', isLogin, function(req, res){
    res.render('about.html')
});
app.get('/contact', isLogin, function(req, res){
    res.render('contact.html')
});
app.get('/login',function(req, res){
    res.render('login.html')
});
app.get('/logout',function(req, res){
    res.clearCookie('token');
    res.render('login.html')
});
app.post('/login',function(req, res){
    var user = users.filter(function(obj){
        return req.body.email === obj.email && req.body.password === obj.password;
    });
    if(user.length){
        var token = new Date().setTime(new Date().getTime() + (2 * 60 * 1000));
        res.cookie('token', token, {httpOnly: true });
        res.send({token: token});
    }
    else res.status(404).send('Incorrect email and password combination.');
});

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server     =    app.listen(4000, function(){
    console.log("We have started our server on port 4000");
});
