const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    
    username:
    {
        type:String,
        required:true
    },

    useremail:
    {
        type:String,
        required:true
    },
    products:
    {
        type:Array,
        required:true
    },
    products_qty:
    {
        type: Array,
        required: true,
        default: 1
    },
    total_amount:
    {
        type:Number,
        default:0,
    },
    total_items:
    {
        type:Number,
        default: 0
    },
    dateCreated:
    {
        type:Date,
        default:Date.now()
    }
  });


  const cartModel = mongoose.model('cart', cartSchema);

  module.exports = cartModel;
