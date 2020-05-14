const express = require("express");
const router = express.Router();
const path = require("path");
const isAuthenticated = require("../middleware/authentication");
const productsModel = require("../model/products");

//Route for the Products Page
router.get("/list",(req,res)=>{
    productsModel.find()
    .then((products)=>{
        //Filter out the information that you want from the array of documents that was returned into
        //a new array
        //Array 300 documents meaning that the array has 300 elements 
        const filteredItems =   products.map(item=>{
                return {
                    id: item._id,
                    name: item.name,
                    description:item.description,
                    category : item.category,
                    price : item.price,
                    bestseller: item.bestseller,
                    link: item.link,
                    thumb: item.thumb
                }
        });

        res.render("products",{
           data : filteredItems
        });

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

});

// Search functionality
router.post("/list", (req,res) => {
    if (req.body.category == "all") {
        productsModel.find()
        .then((products)=>{
            //Filter out the information that you want from the array of documents that was returned into
            //a new array
            //Array 300 documents meaning that the array has 300 elements 
            const filteredItems =  products.map(item=>{
                    return {
                        id: item._id,
                        name: item.name,
                        description:item.description,
                        category : item.category,
                        price : item.price,
                        bestseller: item.bestseller,
                        link: item.link,
                        thumb: item.thumb,
                        quantity: item.quantity
                    }
            });
    
            res.render("products",{
               data : filteredItems
            });
    
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
    }
    else {
        productsModel.find({category: req.body.category})
        .then((products)=>{
            //Filter out the information that you want from the array of documents that was returned into
            //a new array
            //Array 300 documents meaning that the array has 300 elements 
            const filteredItems =  products.map(item=>{
                    return {
                        id: item._id,
                        name: item.name,
                        description:item.description,
                        category : item.category,
                        price : item.price,
                        bestseller: item.bestseller,
                        link: item.link,
                        thumb: item.thumb,
                        quantity: item.quantity
                    }
            });
    
            res.render("products",{
               data : filteredItems
            });
    
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));
    }
});

//Route to direct use to Add Products form
router.get("/add",isAuthenticated,(req,res)=>
{
    if (req.session.user.role=="Clerk") {
        res.render("products-add");
    }
    else {
        res.redirect("list");
    }
    
    
});
//Route to process user's request and data when the user submits the add form
router.post("/add",isAuthenticated,(req,res)=>
{
    const newProduct = {
        name : req.body.name,
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        bestseller : req.body.bestseller == 'true',
        quantity: req.body.quantity
    }

    /*
        Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
        1. YOu have to create an instance of the model, you must pass data that you want inserted
        in the form of an object(object literal)
        2. From the instance, you call the save method
    */

     const product =  new productsModel(newProduct);
     product.save()
     .then(()=>{
        req.files.productPic.name = `${product._id}${path.parse(req.files.productPic.name).ext}`;
        req.files.productPic.mv(`./public/img/${req.files.productPic.name}`)
        .then(()=>{
            productsModel.updateOne({_id:product._id},{
                thumb: req.files.productPic.name
            })
            .then(()=>{
                res.redirect(`/products/list`)
            })
            .catch(err=>console.log(`Update to database failed :${err}`));
        })
     })
     .catch(err=>console.log(`Error happened when inserting in the database :${err}`));
});

//Route to direct user to edit a particular product
router.get("/edit/:id",(req,res)=>{

    productsModel.findById(req.params.id)
    .then((product)=>{

        const {_id,thumb,link,dateCreated,name, category, description, price, quantity, bestseller} = product;
        res.render("products-edit",{
            _id,
            name,
            description,
            category,
            thumb, 
            price, 
            bestseller, 
            link, 
            quantity
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


});

router.put("/edit/:id",(req,res)=>{

    const newProduct = {
        name : req.body.name,
        category : req.body.category,
        description : req.body.description,
        price : req.body.price,
        bestseller : req.body.bestseller == 'true',
        quantity: req.body.quantity
    }


   productsModel.updateOne({_id:req.params.id},newProduct)
   .then(()=>{
       res.redirect("/dashboard");
   })
   .catch(err=>console.log(`Error happened when updating data from the database :${err}`));


});

//Route to direct user to edit a particular product
router.get("/details/:id",(req,res)=>{

    productsModel.findById(req.params.id)
    .then((product)=>{

        const {_id,thumb,link,dateCreated,name, category, description, price, quantity, bestseller} = product;
      
        res.render("products-details",{
            _id,
            name,
            description,
            category,
            thumb, 
            price, 
            bestseller, 
            link, 
            quantity,
        })

    })
    .catch(err=>console.log(`Error happened when pulling from the database :${err}`));


});



router.delete("/delete/:id",(req,res)=>{
    
    productsModel.deleteOne({_id:req.params.id})
    .then(()=>{
        res.redirect("/dashboard");
    })
    .catch(err=>console.log(`Error happened when deleting data from the database :${err}`));

});

module.exports = router;