
const axios = require('axios')
const DayOff = async () => {
   let re = await axios.get("https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days",{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "x-api-key" : "oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT"
      },
      "credentials" : "same-origin"
})
return re.data
}
module.exports = DayOff