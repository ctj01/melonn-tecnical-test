import React,{useState, useEffect} from 'react'
import OrderContext from './OrderContext'
import axios from 'axios'
const OrderState = (props) => {

    useEffect(() => {
        GetListOrder().then((data) => setOrder(data))
    }, [])

    const [Order, setOrder] = useState([])
    const [OrderDetail, setOrderDetail] = useState(null)

    const GetListOrder =  () => {
        return axios.get("http://localhost:5001/")
        .then(res => res.data)
    }
    const postOrder = (post) => {

        console.log(post)

        fetch("http://localhost:5001/orders/",
            {
                method : "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
    }
    const OrderById =  (id) => {
        axios.get("http://localhost:5001/orders/?id=" + id)
        .then(res => Object.values(res.data).map(data => setOrderDetail(data)))
    }

    return(
            <OrderContext.Provider
            value={{
                Order ,
                postOrder,
                OrderDetail,
                OrderById
            }}
            >
            {props.children}
            </OrderContext.Provider>
    )
}

export default OrderState
