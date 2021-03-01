const joi = require('joi');

const Order = joi.object().keys({

            "seller store" : joi.string().required(),
            "shippingMethod" : joi.number().required(),
            "external order number" : joi.string().required(),
            "buyer fullname" : joi.string().required(),
            "buyer phone number" : joi.string().required(),
            "buyer email" : joi.string().required().email(),
            "shipping address" : joi.string().required(),
            "shipping city" : joi.string().required(),
            "shipping region" : joi.string().required(),
            "shipping country" :joi.string().required(),
            "listOfItems" : joi.array().required(),
            "creationDate" : joi.date().required(),
            "internal order number" : joi.string().required(),
            "shippingMethodRules" : {}
})
module.exports = Order;