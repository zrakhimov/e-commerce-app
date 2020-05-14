const productsModel = require("../model/products");

const dashBoardLoader = (req,res)=>{

    if(req.session.user.role=="Clerk")
    {
        req.session.user.isClerk = true;

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
    
            res.render("clerkDashboard",{
               data : filteredItems
            });
    
        })
        .catch(err=>console.log(`Error happened when pulling from the database :${err}`));

    }
    else
    {
        req.session.user.isRegular = true;
        res.render("dashboard");
    }

}

module.exports = dashBoardLoader;