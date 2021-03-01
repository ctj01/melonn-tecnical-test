const ShippingMethodDetails = require('./Details_shipping_Method')
const GetBussinessDay = require('../helper/GetBussinessDay')
const moment = require('moment')
const DaysOff = require('../helper/Get_daysOff')
const Pack_promise_min = require('./CalculatePromisesParameters/Pack_promise_min')
const Pack_promise_max = require('./CalculatePromisesParameters/Pack_promise_max')
const Ship_promise_min = require('./CalculatePromisesParameters/Ship_promise_min')
const Ship_promise_max = require('./CalculatePromisesParameters/Ship_promise_max')
const Delivery_promise_min = require('./CalculatePromisesParameters/Delivery_promise_min')
const Delivery_promise_max = require('./CalculatePromisesParameters/Delivery_promise_max')
const Ready_pickup_promise_min = require('./CalculatePromisesParameters/Ready_pickup_promise_min')
const Ready_pickup_promise_max = require('./CalculatePromisesParameters/Ready_pickup_promise_max')
let shipping_promise = {
    "pack_promise_min" : null,
    "pack_promise_max" : null,
    "ship_promise_min" : null,
    "ship_promise_max" : null,
    "delivery_promise_min" : null,
    "delivery_promise_max" : null,
    "ready_pickup_promise_min" : null,
    "ready_pickup_promise_max" : null
}
const ValidatePromise =  async (weight, date, shippingmethod_id) =>{

     let data = await ShippingMethodDetails(shippingmethod_id)
     let min_weight = data["rules"].availability.byWeight.min
     let max_weight = data["rules"].availability.byWeight.max
     let dayTyp = data["rules"].availability.byRequestTime.dayType
     let fromTimeOfDay = data["rules"].availability.byRequestTime.fromTimeOfDay;
     let toTimeOfDay = data["rules"].availability.byRequestTime.toTimeOfDay

     if(min_weight <= weight && weight <= max_weight)
        {   let isPriority = false;
            let priority = 0
            let day;
            let dayType;
            let hour = moment.utc().format("H")
            let daysoff;

            try {
                day = await GetBussinessDay()
                daysoff = await DaysOff()
            } catch (error) {
                throw error
            }

            Object.values(daysoff).indexOf(date) > -1 ? dayType = "ANY" : dayType = "BUSINESS"
            if (dayType != dayTyp && dayTyp != 'ANY')
                return  shipping_promise
            if(hour > toTimeOfDay )
                return shipping_promise
            let promisesParameters;
            console.log(dayType)
            while(!isPriority)
            {
                let case_day = data["rules"].promisesParameters.cases[priority].condition.byRequestTime.dayType
                if (dayType != case_day && case_day != 'ANY')
                {
                    console.log(case_day)
                    priority++;
                }
                else if ( dayType == 'BUSINESS' && case_day == 'ANY')
                {
                    isPriority = true
                    promisesParameters = data["rules"].promisesParameters.cases[priority]
                }
                else if (dayType == case_day)
                {   console.log("hoola")
                    isPriority = true
                    promisesParameters = data["rules"].promisesParameters.cases[priority]
                }
            }

            let pack_promise_min = Pack_promise_min(promisesParameters, day)
            let pack_promise_max = Pack_promise_max(promisesParameters, day)
            let ship_promise_min = Ship_promise_min(promisesParameters, day)
            let ship_promise_max = Ship_promise_max(promisesParameters, day)
            let delivery_promise_min = Delivery_promise_min(promisesParameters, day)
            let delivery_promise_max = Delivery_promise_max(promisesParameters, day)
            let ready_pickup_promise_max = Ready_pickup_promise_max(promisesParameters, day)
            let ready_pickup_promise_min = Ready_pickup_promise_min(promisesParameters, day)


            shipping_promise.pack_promise_min = pack_promise_min
            shipping_promise.pack_promise_max = pack_promise_max
            shipping_promise.ship_promise_min = ship_promise_min
            shipping_promise.ship_promise_max = ship_promise_max
            shipping_promise.delivery_promise_min = delivery_promise_min
            shipping_promise.delivery_promise_max = delivery_promise_max
            shipping_promise.ready_pickup_promise_min = ready_pickup_promise_min
            shipping_promise.ready_pickup_promise_max = ready_pickup_promise_max
            return shipping_promise
        }
        return shipping_promise;
}
module.exports = ValidatePromise;