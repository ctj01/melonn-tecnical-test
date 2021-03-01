const { string } = require('joi');
const moment = require('moment');

const shipPromiseMin = (promisesParameters, day) => {
    const minType = promisesParameters.shipPromise.min.type

    if (minType == 'NULL')
        return 'NULL'

    let minDeltaHours = 0
    let minDeltaBusiNessDay = 0
    let minTimeOfDay = 0
    if (promisesParameters.shipPromise.min.hasOwnProperty('deltaHours'))
    {
        minDeltaHours = promisesParameters.shipPromise.min.deltaHours
    }
    if (promisesParameters.shipPromise.min.hasOwnProperty('deltaBusinessDays'))
    {
        minDeltaBusiNessDay = promisesParameters.shipPromise.min.deltaBusinessDays
    }
    if (promisesParameters.shipPromise.min.hasOwnProperty('timeOfDay'))
    {
        minTimeOfDay = promisesParameters.shipPromise.min.timeOfDay
    }
    let ship_promise_min;
    const number = moment(minTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (minDeltaBusiNessDay > 0)
    {
        ship_promise_min = day[minDeltaBusiNessDay - 1] + ' at ' + number
        return ship_promise_min
    }
    ship_promise_min = day[minDeltaBusiNessDay] + ' at ' + number
    return ship_promise_min
}
module.exports = shipPromiseMin