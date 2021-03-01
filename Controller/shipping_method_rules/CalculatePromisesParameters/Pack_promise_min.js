const { string } = require('joi');
const moment = require('moment');
const PackPromiseMin = (promisesParameters, day) => {
    const minType = promisesParameters.packPromise.min.type

    let minDeltaHours = 0
    let minDeltaBusiNessDay = 0
    let minTimeOfDay = 0
    if (promisesParameters.packPromise.min.hasOwnProperty('deltaHours'))
    {
        minDeltaHours = promisesParameters.packPromise.min.deltaHours
    }
    if (promisesParameters.packPromise.min.hasOwnProperty('deltaBusinessDays'))
    {
        minDeltaBusiNessDay = promisesParameters.packPromise.min.deltaBusinessDays
    }
    if (promisesParameters.packPromise.min.hasOwnProperty('timeOfDay'))
    {
        minTimeOfDay = promisesParameters.packPromise.min.timeOfDay
    }
    let pack_min;
    const number = moment(minTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (minDeltaBusiNessDay > 0)
    {
        pack_min = day[minDeltaBusiNessDay - 1] + ' at ' + number
        return pack_min
    }
    pack_min = day[minDeltaBusiNessDay] + ' at ' + number
    return pack_min
}
module.exports = PackPromiseMin