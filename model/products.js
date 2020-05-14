const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name:
    {
        type:String,
        required:true
    },

    description:
    {
        type:String,
        required:true,
    },
    category:
    {
        type:String,
        required:true,
    },
    thumb:
    {
        type:String,
        default: `/notfound.jpg`
    },
    price:
    {
        type:Number,
        required:true
    },
    bestseller:
    {
        type:Boolean,
        required:true
    },
    link:
    {
        type:String,
        default: `#`
    },
    quantity:
    {
        type: Number,
        default: 1
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
  });


  const productsModel = mongoose.model('products', productsSchema);

  module.exports = productsModel;
