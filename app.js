const express=require("express");
const path=require("path");
const app=express();
var mongoose=require('mongoose');
const bodyparser=require('body-parser');            //Did not use it though
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
const port=8000;

//DEFINE MONGOOSE SCHEMA
const contactSchema=new mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    location : String,
    message : String,
});

//MONGOOSE MODEL
var Contact=mongoose.model('Contact',contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//ENDPOINTS
app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your message has been delivered. We will contact back in 48 working hours.")
    }).catch(()=>{
        res.status(400).send("Your message was not sent. Please try again later.")
    })
})
app.get('/services',(req,res)=>{
    const params={};
    res.status(200).render('services.pug',params);
})
app.get('/about',(req,res)=>{
    const params={};
    res.status(200).render('about.pug',params);
})
app.get('/classinfo',(req,res)=>{
    const params={};
    res.status(200).render('classinfo.pug',params);
})


//START THE SERVER
app.listen(port,()=>{
    console.log(`The website started successfully on localhost:${port}`);
})