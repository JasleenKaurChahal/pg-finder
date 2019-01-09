var express=require('express');
var routes=require('routes');
var http=require('http');
var url=require('url');
var path=require('path');
var bodyParser=require('body-parser');
var app=express();
app.use(bodyParser.json());//to support JSON encoded bodies
app.use(bodyParser.urlencoded({extended:true}));
app.set('port',process.env.PORT||4300);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.json());
var mongoose=require('mongoose');
var url="mongodb://localhost:27017/mydb1";
//app.use(express.urlencoded());
//app.use(express.methodOverride());
app.use(express.static(path.join(__dirname,'public')));

app.use(express.static(path.join(__dirname,"css1")));
app.use(express.static(path.join(__dirname,'imges1')));

app.use(express.static(path.join(__dirname,'.sass-cache1')));
app.use(express.static(path.join(__dirname,'js1')));

app.use(express.static(path.join(__dirname,'fonts1')));

app.use(express.static(path.join(__dirname,'scss1')));
app.use(express.static(path.join(__dirname,'vendor1')));
app.get('/',function(req,res)
{
  res.render('login');
})
app.get('/add_admin',function(req,res)
{
  res.render('add_admin');
})

http.createServer(app).listen(app.get('port'),function(){
console.log('Express Server listening on Port '+app.get('port'));
});
app.post('/signup',function(req,res,next){
mongoose.connect(url,function(err,db){
  db.collection('customers').insertOne({
    name:req.body.name,
    email:req.body.email,
    password:req.body.pass,
    re_pass:req.body.re_pass,
    agree_term:req.body.agree-term
  });
  console.log("hit ");
});

res.redirect("/");
next();

});
app.post('/signin',function(req,res,next){
  mongoose.connect(url,function(err,db){
    db.collection('customers').findOne({name:req.body.your_name,password:req.body.your_pass,remember_me:req.body.remember_me},function(errs,person){
      if(errs)throw errs;
      if(person){
        res.render("admin",{data:person});
      }else{
        res.redirect("/");

      }
    });
  });
});