//imports
const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');

//creation of app object
const app = express();


// load env variable file
require('dotenv').config({path:"./config/keys.env"});
//handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
//loading static assests middleware
app.use(express.static("public"));

// connect to database
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> {
    console.log("Connected to Database");
})
.catch(err => {
    console.log(`Error occured when connecting to database: ${err}`);
})

// Session middleware
app.use(session({secret: `${process.env.SESSION_SECRET}` , resave: false,saveUninitialized: true}))
//custom middleware functions
app.use((req,res,next)=>{

    //res.locals.user is a global handlebars variable. This means that ever single handlebars file can access 
    //that user variable
    res.locals.user = req.session.user;
    res.locals.cart = req.session.cart;
    next();
});
app.use((req,res,next)=>{

    if(req.query.method=="PUT")
    {
        req.method="PUT"
    }

    else if(req.query.method=="DELETE")
    {
        req.method="DELETE"
    }

    next();
})


app.use(fileUpload());



// load controllers
const generalController = require("./controllers/general");
const authController = require("./controllers/auth");
const productsConroller = require("./controllers/products");

// map controllers
app.use("/", generalController);
app.use("/products", productsConroller);
app.use("/auth", authController);


const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`The Server is now running at port ${PORT}`);
});

