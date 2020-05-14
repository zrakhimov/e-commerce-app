# Project - E-Commerce App

##  Deployment instructions on local machine

```git 
 -> git clone git@github.com:zrakhimov/e-commerce-app.git
 -> cd e-commerce-app
 -> mkdir config/keys.env
 * edit keys.env to include the following
    SEND_GRID_API_KEY=<api_key_here>
    PORT=<port_number_here>
    MONGODB_CONNECTION_STRING=<mongodb_connection_string_here
    SESSION_SECRET=<secret_string_here>
```


##  A Link to deployed application in Heroku (Heroku domain name)

	
##  Your Inventory Clerk credentials details (username/email and password).

	E-mail: test@test.com
	Password: iop890iop

 # Functionalities:

## Authentication
    [DONE]A Session is  created to maintain the user state until the user logs out of the application. 

    [DONE]Upon an unsuccessful authentication, the application  displays an appropriate error message 

    [DONE]The application directs an inventory clerk to their  dashboard and a regular user to his or her dashboard. 

    [DONE]Both dashboards, show the user’s name(first name and lastname) and a logout link 

    [DONE]The logout link destroys the session.

    [DONE]Routes that can only be accessed when users are logged-in, must be protected.

## Inventory Clerk Module
    [DONE]An Inventory Clerk account is manually created in the database.

    [DONE]An Inventory Clerk can create products with all the necessary data

    [DONE]An Inventory can upload a photo for a product

    [INCOMEPLETE]Only a Images can be uploaded as a photo.


    [DONE]All Products created are populated on the Front-End of the website, specifically the product listing Page

    [DONE]Products that are aset as best sellers are rendered in the appropriate section on the home page.

    [DONE]The Inventory Clerk can view a list of all created products

    [DONE]Inventory Clerk can edit product details

## Search Module
    [DONE]Search form has a  drop down list of product categories and a search button.  

    [PARTIAL]Visitors to the web application can search for products via a product category. 

    => Visitors can filter by categories on the produc listings page
    
## Booking Module
    [DONE]Only logged in users can add products to their shopping cart.

    [DONE]User’s must be able to view all their products in their shopping cart 
    and the shopping cart must list all products added, the quantity amount of each product and their total amount.

    [DONE]When the user clicks the “Place Order” button, the application must “clear” the shopping cart and send email with the entire order information
    
## Look and Feel	
    [DONE] Bootstrap has been used for this project
		
	