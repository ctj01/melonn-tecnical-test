import React,{useContext, useState} from 'react'
import OrderContext from '../ContextOrder/OrderContext'
import {Modal, Button} from 'react-bootstrap'

const OrderList = () => {
    const {Order, OrderDetail, OrderById} = useContext(OrderContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const Find = (id) => {
        OrderById(String(id))
        handleShow()
    }
    console.log(OrderDetail)
    return (
        <>
        <div className="container">
            <table className="table table-responsive table-hover">
                <thead>
                    <tr>
                        <th>Sell Order Number</th>
                        <th>Seller Store</th>
                        <th>Creation Date</th>
                        <th>Shipping Method</th>
                    </tr>
                </thead>
                <tbody>
                        {Object.keys(Order).map((key) => 
                            <tr id={Order[key].id} key={key} onClick={(e) => Find(e.target.id)}>
                                <td>{Order[key].sellerOrderNumber}</td>
                                <td>{Order[key].sellerStore}</td>
                                <td>{Order[key].creationDate}</td>
                                <td>{Order[key].shippingMethod}</td>
                            </tr>
                        )}
                    </tbody>
            </table>
        </div>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-90w" scrollable={true}>
            <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-responsive table-bordered">
                    <thead>
                        <th>sellerStore</th>
                        <th>shippingMethod</th>
                        <th>externalOrderNumber</th>
                        <th>buyerFullname</th>
                        <th>buyerPhoneNumber</th>
                        <th>buyerEmail</th>
                        <th>internalOrderNumber</th>
                        <th>creationDate</th>
                        <th>shippingAddress</th>
                        <th>shippingCity</th>
                        <th>shippingRegion</th>
                        <th>shippingCountry</th>
                        <th>listOfItems</th>
                        <th>shippingMethodRules</th>
                    </thead>
                    <tbody>
                            {show && OrderDetail != null ? (  
                            <tr>
                                <td>{OrderDetail.sellerStore}</td>
                                <td>{OrderDetail.shippingMethod}</td>
                                <td>{OrderDetail.externalOrderNumber}</td>
                                <td>{OrderDetail.buyerFullname}</td>
                                <td>{OrderDetail.buyerPhoneNumber}</td>
                                <td>{OrderDetail.buyerEmail}</td>
                                <td>{OrderDetail.internalOrderNumber}</td>
                                <td>{OrderDetail.creationDate}</td>
                                <td>{OrderDetail.shippingAddress}</td>
                                <td>{OrderDetail.shippingCity}</td>
                                <td>{OrderDetail.shippingRegion}</td>
                                <td>{OrderDetail.shippingCountry}</td>
                                <td></td>
                                <td></td>
                            </tr>

                            ): ""}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
        </Modal.Footer>
        </Modal>
        </>
    )
}

export default OrderList
