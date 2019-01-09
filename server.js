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

app.use(express.static(path.join(__dirname,"css")));
app.use(express.static(path.join(__dirname,'img')));

app.use(express.static(path.join(__dirname,'js')));

app.use(express.static(path.join(__dirname,'fonts')));

app.use(express.static(path.join(__dirname,'icon-fonts')));
app.use(express.static(path.join(__dirname,"css1")));
app.use(express.static(path.join(__dirname,'imges1')));

app.use(express.static(path.join(__dirname,'.sass-cache1')));
app.use(express.static(path.join(__dirname,'js1')));

app.use(express.static(path.join(__dirname,'fonts1')));

app.use(express.static(path.join(__dirname,'scss1')));
app.use(express.static(path.join(__dirname,'vendor1')));

app.get('/',function(req,res)
{
  res.render('index');
})
app.get('/about',function(req,res)
{
  res.render('about');
})

app.get('/contact',function(req,res)
{
  res.render('contact');
})
app.get('/categories',function(req,res)
{
  res.render('categories');
})

app.get('/blog',function(req,res)
{
  res.render('blog');
})

app.get('/single-list',function(req,res)
{
  res.render('single-list');
})
app.get('/register',function(req,res)
{
  res.render('register');
})
app.get('/register2',function(req,res)
{
  res.render('register2');
})
app.get('/user_register',function(req,res)
{
  res.render('user_register');
})
app.get('/login',function(req,res)
{
  res.render('login');
})
app.get('/admin',function(req,res)
{
  res.render('admin');
})
app.get('/add_admin',function(req,res)
{
  res.render('add_admin');
})
app.get('/add_state',function(req,res)
{
  res.render('add_state');
})
app.get('/add_pg',function(req,res)
{
  res.render('add_pg');
})
app.get('/view_users',function(req,res)
{
  res.render('view_users');
})
app.get('/view_pg',function(req,res)
{
  res.render('view_pg');
})
app.get('/user_section',function(req,res)
{
  res.render('user_section');
})
app.get('/view_state',function(req,res)
{
  res.render('view_state');
})
app.get('/user_booking',function(req,res)
{
  res.render('user_booking');
})
app.get('/view_request',function(req,res)
{
  res.render('view_request');
})

app.get('/search_results',function(req,res)
{
  res.render('search_results');
})
app.get('/view',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("customers").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('show',{data:result});

  });
});
})
app.get('/view1',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("add_state").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('view_state',{data:result});

  });
});
})
app.get('/view2',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("pg_collection").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('view_pg',{data:result});

  });
});
})
app.get('/view3',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("customers").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('view_users',{data:result});

  });
});
})
app.get('/view5',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("user_req").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('view_request',{data:result});

  });
});
})
app.get('/view4',function(req,res)
{
  mongoose.connect(url,function(err,db){
  db.collection("pg_collection").find().toArray(function(err,result)
  {
    if(err)throw err;
    res.render('user_section',{data:result});

  });
});
})

app.post('/search',function(req,res){
  console.log(req.body.pin);
  console.log(req.body.city);
   console.log(req.body.state);
 mongoose.connect(url,function(err,db){
  db.collection('add_state').find({state:req.body.state,city:req.body.city}).toArray(function(errs,person){
    if(errs)throw errs;   
     res.render("search_results",{data:person});
    });
  });  
  }); 
app.get('/edit1/:userId', function (req, res) {
    id=req.params.userId;
   var mongoose=require('mongoose');
   var url="mongodb://localhost:27017/mydb1";
    mongoose.connect(url, function(err, db) {
      db.collection('add_state').findOne({state:id}, function (errs, person) {
        if (errs) throw errs;
        if(person){
          res.render('editUser',{data:person});
        }else{
          res.redirect('/admin');
          db.close();

        }
      });
    });	
  })
app.get('/delete1/:userId',function(req,res){
   id=req.params.userId;
   var mongoose=require('mongoose');

   console.log(id);
   var url="mongodb://localhost:27017/mydb1";
   mongoose.connect(url,function(err,db){
     if(err) throw err;
     var myquery={state:id};
     db.collection("add_state").deleteOne(myquery,function(err,obj){
       if(err) throw err;
       console.log("1 document deleted");
       res.redirect('/view1');
     });
   });
})
app.get('/delete2/:userId',function(req,res){
  id=req.params.userId;
  var mongoose=require('mongoose');
  var url="mongodb://localhost:27017/mydb1";
  mongoose.connect(url,function(err,db){
    if(err) throw err;
    var myquery={pin:id};
    db.collection("pg_collection").deleteOne(myquery,function(err,obj){
      if(err) throw err;
      console.log("1 document deleted");
      res.redirect('/view2');

      db.close();
    });
  });
})
app.get('/delete3/:userId',function(req,res){
  id=req.params.userId;
  console.log(id);
  var mongoose=require('mongoose');
  var url="mongodb://localhost:27017/mydb1";
  mongoose.connect(url,function(err,db){
    if(err) throw err;
    var myquery={email:id};
    db.collection("customers").deleteOne(myquery,function(err,obj){
      if(err) throw err;
      console.log("1 document deleted");
      res.redirect('/view3');

    });
  });
})
app.get('/delete4/:userId',function(req,res){
  id=req.params.userId;
  var mongoose=require('mongoose');
  var url="mongodb://localhost:27017/mydb1";
  mongoose.connect(url,function(err,db){
    if(err) throw err;
    var myquery={pin:id};
    db.collection("pg_collection").deleteOne(myquery,function(err,obj){
      if(err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
})
app.get('/delete5/:userId',function(req,res){
  id=req.params.userId;
  var mongoose=require('mongoose');
  var url="mongodb://localhost:27017/mydb1";
  mongoose.connect(url,function(err,db){
    if(err) throw err;
    var myquery={uname:id};
    db.collection("user_req").deleteOne(myquery,function(err,obj){
      if(err) throw err;
      console.log("1 document deleted");      
       res.redirect('/view5');
      db.close();
    });
  });
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
      title:req.body.title,
      type:req.body.type,
      state:req.body.state,
      city:req.body.city,
      address:req.body.adress,
      rent:req.body.rent,
      electricity:req.body.electricity,
      parking:req.body.parking,
      furnished:req.body.furnished,
      tv:req.body.tv,
      laundry:req.body.laundry,
      meals1:req.body.meals1,
      meals2:req.body.meals2,
      meals3:req.body.meals3,
      agree_term:req.body.agree_term
    });
    
   // console.log(req.body.parking);
    console.log("hit ");
  });
  res.redirect("/login");
  next();
  });
  app.post('/signup_user',function(req,res,next){
    mongoose.connect(url,function(err,db){
      db.collection('customers').insertOne({
        name:req.body.name,
        email:req.body.email,
        password:req.body.pass,
        re_pass:req.body.re_pass,
        gender:req.body.gender,
        state:req.body.state,
        city:req.body.city,
        rent:req.body.rent,
        meals1:req.body.meals1,
        meals2:req.body.meals2,
        meals3:req.body.meals3,
        agree_term:req.body.agree_term
      });
      
  
     // console.log(req.body.parking);
      console.log("hit ");
    });
    
    res.redirect("/login");
    next();
    
    });
    app.post('/update',function(req,res,next){
      mongoose.connect(url,function(err,db){
        if(err) { throw err; } 
          db.collection('add_state').updateMany(
            {state:req.body.state,
              city:req.body.city,
              pin:req.body.pin
            },
            {$set: {state:'Gujrat',
              city:req.body.city,
              pin:req.body.pin }},function(err, result) { 
      
                if(err) { throw err; }  // replacement, replaces only the field "hi"  
        
        console.log("hit ");
    //  });
      res.redirect("/view1");
      next(); 
      });
    });
  })

    app.post('/requests',function(req,res,next){
      mongoose.connect(url,function(err,db){
        db.collection('user_req').insertOne({
          uname:req.body.uname,
          phone:req.body.phone,
          address:req.body.address,
          start_date:req.body.start_date,
          end_date:req.body.end_date  
        });    
        console.log("hit ");
      });   
      res.redirect("/login");
      next(); 
   });
    app.post('/add_pg',function(req,res,next){
      mongoose.connect(url,function(err,db){
        db.collection('pg_collection').insertOne({
         
          state:req.body.state,
          city:req.body.city,
          rent:req.body.rent,
          pin:req.body.pin,
          amenities:req.body.amenities,
          date:req.body.date
        });
        console.log("hit ");
      });
      res.redirect("/admin");
      next(); 
      });
      app.post('/add_admin',function(req,res,next){
        mongoose.connect(url,function(err,db){
          db.collection('admin_collection').insertOne({
           
            name:req.body.name,
            email:req.body.email,
            pass:req.body.pass,
            cpass:req.body.cpass
          });
          console.log("hit ");
        });
        res.redirect("/admin");
        next(); 
        });
        app.post('/add_state',function(req,res,next){
          mongoose.connect(url,function(err,db){
            db.collection('add_state').insertOne({
             
              state:req.body.state,
              city:req.body.city,
              pin:req.body.pin,
               date:req.body.date,
               hour:req.body.hour,
               min:req.body.min,
               time:req.body.time
            });
            console.log("hit ");
          });
          res.redirect("/admin");
          next(); 
          });
  app.post('/signin',function(req,res,next){

    abc=[];
    mongoose.connect(url,function(err,db){
      db.collection('customers').find({name:req.body.your_name,password:req.body.your_pass,remember_me:req.body.remember_me}).toArray(function(errs,person){
        if(errs)throw errs;

        if(person){
           if(req.body.your_name=="jas")
           {
  
            //console.log(person);
          res.render("admin",{data:person});
           }
           else
           {
            res.redirect("/view2");
           console.log("User");

           }
        }else{
          res.redirect("/login");
  
        }
      });
    });
  });
