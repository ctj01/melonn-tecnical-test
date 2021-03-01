const DaysOff = require('../helper/Get_daysOff')
const fetch = require('node-fetch')
const moment = require('moment')
const dias = 10;
let array = [];
let daysoff;
const GetBussinessDay = async() => {

    await DaysOff().then(res => daysoff = res).then(() => {

    let get_dia = 1

    for (let index = 1; index <= dias; get_dia++) {
        var dia = moment().add(get_dia, 'days').utc().format('Y-MM-DD')

        if(Object.values(daysoff).indexOf(dia) == -1) {
            array.push(dia)
            index++
        }
    }
})
return array
}

module.exports = GetBussinessDay