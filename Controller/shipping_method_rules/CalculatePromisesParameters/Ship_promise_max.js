const moment = require('moment');

const ShipPromiseMax = (promisesParameters, day) => {
    let maxDeltaHours = 0
    let maxDeltaBusiNessDay = 0
    let maxTimeOfDay = 0
    const maxType = promisesParameters.shipPromise.max.type
    if (maxType == 'NULL')
        return 'NULL'
    if (promisesParameters.shipPromise.max.hasOwnProperty('deltaHours'))
    {
        maxDeltaHours = promisesParameters.shipPromise.max.deltaHours
    }
    if (promisesParameters.shipPromise.max.hasOwnProperty('deltaBusinessDays'))
    {
        maxDeltaBusiNessDay = promisesParameters.shipPromise.max.deltaBusinessDays
    }
    if (promisesParameters.shipPromise.max.hasOwnProperty('timeOfDay'))
    {
        maxTimeOfDay = promisesParameters.shipPromise.max.timeOfDay
    }
    let ship_max;
    const number = moment(maxTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (maxDeltaBusiNessDay > 0)
    {
        ship_max = day[maxDeltaBusiNessDay - 1] + ' at ' + number
        return ship_max
    }
    ship_max = day[maxDeltaBusiNessDay] + ' at ' + number
    return ship_max
}
module.exports = ShipPromiseMax