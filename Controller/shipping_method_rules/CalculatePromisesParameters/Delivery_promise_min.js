const moment = require('moment');

const DeliveryPromiseMin = (promisesParameters, day) => {
    const minType = promisesParameters.deliveryPromise.min.type

    if (minType == 'NULL')
        return 'NULL'

    let minDeltaHours = 0
    let minDeltaBusiNessDay = 0
    let minTimeOfDay = 0

    if (promisesParameters.deliveryPromise.min.hasOwnProperty('deltaHours'))
    {
        minDeltaHours = promisesParameters.deliveryPromise.min.deltaHours
    }
    if (promisesParameters.deliveryPromise.min.hasOwnProperty('deltaBusinessDays'))
    {
        minDeltaBusiNessDay = promisesParameters.deliveryPromise.min.deltaBusinessDays
    }
    if (promisesParameters.deliveryPromise.min.hasOwnProperty('timeOfDay'))
    {
        minTimeOfDay = promisesParameters.deliveryPromise.min.timeOfDay
    }

    let delivery_promise_min;

    const number = moment(minTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (minDeltaBusiNessDay > 0)
    {
        delivery_promise_min = day[minDeltaBusiNessDay - 1] + ' at ' + number
        return delivery_promise_min
    }
    delivery_promise_min = day[minDeltaBusiNessDay] + ' at ' + number
    return delivery_promise_min
}
module.exports = DeliveryPromiseMin