const Order = require('./OrderHandler')
const path = './storage/Order.json'
var cors = require('cors');

const AppRouter = (app, fs) => {
    app.use(cors({
        origin: '*'
    }));
    app.get('/', (req, res) => {
        var dic = {}
        let details = []
        const shippingMethod = {
            1 : "Recogida @ Melonn - HOY",
            2 : "Recogida @ Melonn - Siguiente Dia Habil",
            3 : "Domicilio - Express - Local",
            4 : "Domicilio - Hoy - Local",
            5: "Domicilio - Siguiente Dia Habil - Local",
            6 : "Envio Nacional"
}
        fs.readFile(path, 'utf8', (err, data) => {
            if (err){
                throw err
            }
            data = JSON.parse(data)
            Object.keys(data).map((key, value) => {
                dic["id"] = key
                dic["sellerStore"] =  data[key].sellerStore
                dic["sellerOrderNumber"] = data[key].externalOrderNumber
                dic["creationDate"] = data[key].creationDate
                dic["shippingMethod"] = shippingMethod[data[key].shippingMethod]
                details.push (dic)
                dic = {}
        })
        res.send({...details})
        })
    });
    Order(app, fs)
}
module.exports = AppRouter
