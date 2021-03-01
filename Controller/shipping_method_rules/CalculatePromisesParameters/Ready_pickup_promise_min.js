const moment = require('moment');

const ReadyPickUpPromiseMin = (promisesParameters, day) => {
    const minType = promisesParameters.readyPickUpPromise.min.type

    if (minType == 'NULL')
        return 'NULL'

    let minDeltaHours = 0
    let minDeltaBusiNessDay = 0
    let minTimeOfDay = 0

    if (promisesParameters.readyPickUpPromise.min.hasOwnProperty('deltaHours'))
    {
        minDeltaHours = promisesParameters.readyPickUpPromise.min.deltaHours
    }
    if (promisesParameters.readyPickUpPromise.min.hasOwnProperty('deltaBusinessDays'))
    {
        minDeltaBusiNessDay = promisesParameters.readyPickUpPromise.min.deltaBusinessDays
    }
    if (promisesParameters.readyPickUpPromise.min.hasOwnProperty('timeOfDay'))
    {
        minTimeOfDay = promisesParameters.readyPickUpPromise.min.timeOfDay
    }

    let pick_up_promise_min;

    const number = moment(minTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (minDeltaBusiNessDay > 0)
    {
        pick_up_promise_min = day[minDeltaBusiNessDay - 1] + ' at ' + number
        return pick_up_promise_min
    }
    pick_up_promise_min = day[minDeltaBusiNessDay] + ' at ' + number
    return pick_up_promise_min
}
module.exports = ReadyPickUpPromiseMin