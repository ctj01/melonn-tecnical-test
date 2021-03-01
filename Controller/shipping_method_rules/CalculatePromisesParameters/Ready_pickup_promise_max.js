const moment = require('moment');

const ReadyPickupPromiseMax = (promisesParameters, day) => {
    let maxDeltaHours = 0
    let maxDeltaBusiNessDay = 0
    let maxTimeOfDay = 0
    const maxType = promisesParameters.readyPickUpPromise.max.type
    if (maxType == 'NULL')
        return 'NULL'
    if (promisesParameters.readyPickUpPromise.max.hasOwnProperty('deltaHours'))
    {
        maxDeltaHours = promisesParameters.readyPickUpPromise.max.deltaHours
    }
    if (promisesParameters.readyPickUpPromise.max.hasOwnProperty('deltaBusinessDays'))
    {
        maxDeltaBusiNessDay = promisesParameters.readyPickUpPromise.max.deltaBusinessDays
    }
    if (promisesParameters.readyPickUpPromise.max.hasOwnProperty('timeOfDay'))
    {
        maxTimeOfDay = promisesParameters.readyPickUpPromise.max.timeOfDay
    }
    let pickup_promise_max;
    const number = moment(maxTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (maxDeltaBusiNessDay > 0)
    {
        pickup_promise_max = day[maxDeltaBusiNessDay - 1] + ' at ' + number
        return pickup_promise_max
    }
    pickup_promise_max = day[maxDeltaBusiNessDay] + ' at ' + number
    return pickup_promise_max
}
module.exports = ReadyPickupPromiseMax