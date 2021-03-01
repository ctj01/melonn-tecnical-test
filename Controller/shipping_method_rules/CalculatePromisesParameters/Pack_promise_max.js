const moment = require('moment');

const PackPromiseMax = (promisesParameters, day) => {
    let maxDeltaHours = 0
    let maxDeltaBusiNessDay = 0
    let maxTimeOfDay = 0
    const maxType = promisesParameters.packPromise.max.type

    if (promisesParameters.packPromise.max.hasOwnProperty('deltaHours'))
    {
        maxDeltaHours = promisesParameters.packPromise.max.deltaHours
    }
    if (promisesParameters.packPromise.max.hasOwnProperty('deltaBusinessDays'))
    {
        maxDeltaBusiNessDay = promisesParameters.packPromise.max.deltaBusinessDays
    }
    if (promisesParameters.packPromise.max.hasOwnProperty('timeOfDay'))
    {
        maxTimeOfDay = promisesParameters.packPromise.max.timeOfDay
    }
    let pack_max;
    const number = moment(maxTimeOfDay.toString(), ["H"]).format("hh:mm a");
    if (maxDeltaBusiNessDay > 0)
    {
        pack_max = day[maxDeltaBusiNessDay - 1] + ' at ' + number
        return pack_max
    }
    pack_max = day[maxDeltaBusiNessDay] + ' at ' + number
    return pack_max
}
module.exports = PackPromiseMax