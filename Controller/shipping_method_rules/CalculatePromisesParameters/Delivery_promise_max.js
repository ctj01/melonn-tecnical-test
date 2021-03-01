const moment = require('moment');

const DeliveryPromiseMax = (promisesParameters, day) => {
    let maxDeltaHours = 0
    let maxDeltaBusiNessDay = 0
    let maxTimeOfDay = 0
    const maxType = promisesParameters.deliveryPromise.max.type
     if (maxType == 'NULL')
        return 'NULL'
    if (promisesParameters.deliveryPromise.max.hasOwnProperty('deltaHours'))
    {
        maxDeltaHours = promisesParameters.deliveryPromise.max.deltaHours
    }
    if (promisesParameters.deliveryPromise.max.hasOwnProperty('deltaBusinessDays'))
    {
        maxDeltaBusiNessDay = promisesParameters.deliveryPromise.max.deltaBusinessDays
    }
    if (promisesParameters.deliveryPromise.max.hasOwnProperty('timeOfDay'))
    {
        maxTimeOfDay = promisesParameters.deliveryPromise.max.timeOfDay
    }
    let delivery_max;
    const number = moment(maxTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (maxDeltaBusiNessDay > 0)
    {
        delivery_max = day[maxDeltaBusiNessDay - 1] + ' at ' + number
        return delivery_max
    }
    delivery_max = day[maxDeltaBusiNessDay] + ' at ' + number
    return delivery_max
}
module.exports = DeliveryPromiseMax