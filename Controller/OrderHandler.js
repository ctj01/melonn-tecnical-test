const joi = require('joi');
const order = require('../Models/Order')
const WriteFile = require('./helper/WriteFile')
const Guid = require('./helper/GuidGenerator')
const ReadFile = require('./helper/ReadFile')
const moment = require('moment')
const ValidatePromise = require('./shipping_method_rules/CalcutePromise')


const OrderRoute = (app, fs) => {
    const path = './storage/Order.json'

    app.get('/orders', (req, res) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err){
                throw err;
            }
            res.send(JSON.parse(data));
        })
    })
    app.post("/orders", async (req, res) => {

        let shippingMethodRules;
        let weight = 0

        for (let index = 0; index < req.body.listOfItems.length; index++) {
            weight += req.body.listOfItems[index].productWeight * req.body.listOfItems[index].productQty
        }
 
        let creationDate = moment().utc().format('YYYY-MM-DD')

        try {
            shippingMethodRules = await ValidatePromise(weight, creationDate, req.body.shippingMethod)
        } catch (error) {
            console.error(error)
        }
        let ordern = Math.round(Math.floor(new Date().getTime()/1000.0) + Math.random(0, 100))
        let bodyFinal = {
            ...req.body,
            "internalOrderNumber" : ordern ,
            "shippingMethodRules" : shippingMethodRules,
            "creationDate" : creationDate
        }
          ReadFile(data => {
            const orderId = Guid()
            data[orderId.toString()] = bodyFinal
            WriteFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("New order added")
            }, path)
        }, true, path)
    })
    app.get('/orders/:id', (req, res) => {
        fs.readFile(path,"utf-8", (err, data) => {
            if (err){
                throw err;
            }
            data = JSON.parse(data[req.params.id])

            res.send(data)
        })
    })
}
module.exports = OrderRoute;