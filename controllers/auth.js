const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//import userModel
const userModel = require('../model/user')
const cartModel = require('../model/cart')
const isAuthenticated = require("../middleware/authentication");
const dashBoardLoader = require("../middleware/authorization");

//setup email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);


//Route for the Customer Registration
router.get("/register",(req,res)=>{

    res.render("register",{
        title: "Sign up"
    });

});

// Handle the post data for register
router.post("/register", (req,res) => {
    
    // error messages
    const errorMessages = {};

    // fields value holder
    let form = {
        name : req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    };


    // validation
    if(req.body.email=="") {
        errorMessages.email = "You must enter e-mail";
    }
    else if (req.body.email.search(/[@]/) < 0) {
        errorMessages.email = "You must valid e-mail";
    }
    if(req.body.name=="") {
        errorMessages.name = "You must enter name";
    }
    if(req.body.password=="") {
        errorMessages.password = "You must enter password";
    }
    else if (req.body.password.search(/[0-9][A-Z]/) < 0 && req.body.password.length < 8)
    {
        errorMessages.password = "Your password must contain at least one digit, one uppercase letter and must have be at least 8 characters long";
    }
    if(req.body.confirm_password=="") {
        errorMessages.confirm_password = "You must confirm password";
    }
    else if (req.body.confirm_password != req.body.password) {
        errorMessages.confirm_password = "Password does not match";
    }

     //If the user does not enter all the information
     if(errorMessages.password != null || errorMessages.email != null || errorMessages.name != null || errorMessages.confirm_password != null)
     {
             res.render("register",{
                     title:"Sign up",
                     errors : errorMessages,
                     retain: form
             });
     }
     //If the user enters all the data and submit the form, send email and go to dashboard
     else
     {  
        /** Save User info to database **/
        /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
         in the form of an object(object literal)
        2. From the instance, you call the save method
        */
       // 1.
        const newUser = {
            name: form.name,
            email: form.email,
            password: form.password
        }

        // 2.
        const userObj = new userModel(newUser);
        userObj.save()
        .then(()=> {
            const msg = {
                to: form.email,
                from: 'zokir.rakhimov@gmail.com',
                subject: 'Welcome!',
                text: 'Welcome to our shop!',
                html: '<strong>High Quality Products. SALE ON NOW!</strong>',
              };
              sgMail.send(msg)
              .then ( ()=> {
                    req.session.user=userObj;
                    res.redirect("/dashboard");
              })
              .catch(err => {
                  console.log(`Error on sending email: ${err}`);
              })         
        })
        .catch(err => {
            console.log(`Error on saving to database: ${err}`);
        });

     }
});


//Route for the Login
router.get("/login",(req,res)=>{

    res.render("login",{
        title:"Login",
    });

});

// Handle the login post data
router.post("/login", (req,res) => {
    
        // error messages
        const errorMessages = {};


        // fields value holder
        let form = {
            email : req.body.email,
            password: req.body.password
        };


        // validation
        if(req.body.email=="") {
            errorMessages.login = "You must enter e-mail";
        }
        if(req.body.password=="") {
            errorMessages.password = "You must enter password";
        }

        //If the user does not enter all the information
        if(errorMessages.password != null || errorMessages.login != null)
        {
                res.render("login",{
                        title:"Login",
                        errors : errorMessages,
                        retain: form
                });
        }
        //If the user enters all the data and submit the form
        else
        {  
            /**TODO: Session based authentication */
            userModel.findOne({email:form.email})
            .then((user)=>{
                //there was no matching email
                if(user==null)
                {
                    errorMessages.login = "Sorry your email was not found in our database";
                    res.render("login",{
                        title:"Login",
                        errors : errorMessages,
                        retain: form
                });
                }
                //There is a matching email
                else
                {
                    bcrypt.compare(form.password,user.password)
                    .then((isMatched)=>{
                        //password match
                        if(isMatched==true)
                        {
                            req.session.user=user;
                            res.redirect("/products/list");
                        }
                        //no match
                        else
                        {
                            errorMessages.password = "Sorry your password was wrong!";
                            res.render("login",{
                                title:"Login",
                                errors : errorMessages,
                                retain: form
                        });
                        }

                    })
                    .catch(err=>console.log(`Error ${err}`));
                 }
            })
            .catch(err=>console.log(`Error ${err}`));

        }
});

// Handle logout
router.get("/logout",isAuthenticated, (req,res)=>{

    // Cleanup cart
    cartModel.deleteMany({userid: req.session.user._id})
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

    req.session.destroy();
    res.redirect("/auth/login");
    
})

module.exports = router;