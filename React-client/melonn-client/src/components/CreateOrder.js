import React,{useState, useContext} from 'react'
import {Form, Col, FormLabel, Button} from 'react-bootstrap'
import OrderContext from '../ContextOrder/OrderContext'



const CreateOrder = () => {
    const initialState = {
        sellerStore : null,
        shippingMethod : 0,
        externalOrderNumber : 0,
        buyerFullname: null ,
        buyerPhoneNumber : null,
        buyerEmail : null,
        shippingAddress : null,
        shippingCity : null,
        shippingRegion : null,
        shippingCountry : null,
        listOfItems : [],
}
    const { postOrder } = useContext(OrderContext)
    const [OrderNew, setOrderNew] = useState(initialState)

  const updateField = (data, field) => {
    setOrderNew({
      ...OrderNew,
      [field]: data,
    });
  };
  const saveOrder = () => {
      postOrder(OrderNew)
      alert("new Product Added")

  }
    const HandleOnSubmit = () => {
        var product = document.getElementsByClassName("product-added-final")
        let producs = {}
        if(product.length > 0)
        {
            let array = []
            for (var i = 0; i < product.length; i++)
            {
                producs ={
                    productName : product[i].cells[0].innerHTML,
                    productQty : product[i].cells[1].innerHTML,
                    productWeight: product[i].cells[2].innerHTML,
                }
                array.push(producs)
            }
            updateField(OrderNew.listOfItems.concat([...array]), "listOfItems")
        }
    }
    const HandleAddProduct = () => {

        const productName = document.getElementById("product-name")
        const productQty = document.getElementById("product-qty")
        const productWeight = document.getElementById("product-weight")
        const error = document.getElementById("modal-error")

        if (productName.value  === "" || productQty.value === "" || productWeight.value === ""){
            error.innerHTML = "No blank Camps Allowed"

        }
        else
        {   const productAdded = document.getElementById("products-added")
            let tr = productAdded.appendChild(document.createElement("tr"))
            tr.setAttribute("class", "product-added-final")
            let td =document.createElement("td")
            td.setAttribute("class","productName")
            td.innerHTML = productName.value
            tr.appendChild(td)
            td = document.createElement("td")
            td.setAttribute("class","productQty")
            td.innerHTML = productQty.value
            tr.appendChild(td)
            td = document.createElement("td")
            td.setAttribute("class","productWeight")
            td.innerHTML = productWeight.value
            tr.appendChild(td)
            td = document.createElement("td")
            td.setAttribute("class","TotalWeight")
            td.innerHTML = parseInt(productQty.value) * parseInt(productWeight.value)
            tr.appendChild(td)
            productName.value = ""
            productWeight.value = ""
            productQty.value = ""

        }
        HandleOnSubmit()

    }

    return (
        <div className="container mt-2">
        <div className="card-header" style={{background:"#66727a"}}><h3 style={{color:"white"}}>Create Order</h3></div>
        <Form className="mt-3 mb-3" >
            <Form.Row>
                <Col>
                    <Form.Label>Seller store</Form.Label>
                    <Form.Control placeholder="Seller store" onChange={(e)=>{ updateField(e.target.value, "sellerStore")}}/>
                </Col>
                <Col>
                <Form.Label>Shipping method</Form.Label>
                    <Form.Control as="select" size="sm" onChange={(e) => updateField(e.target.selectedIndex, "shippingMethod")}>
                        <option>Select shipping method</option>
                        <option id="1">Recogida @ Melonn - HOY</option>
                        <option id="2">Recogida @ Melonn - Siguiente Dia Habil</option>
                        <option id="3">Domicilio - Express - Local</option>
                        <option id="4">Domicilio - Hoy - Local</option>
                        <option id="5">Domicilio - Siguiente Dia Habil - Local</option>
                        <option id="6">Envio Nacional</option>

                    </Form.Control>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label className="mt-2">External order number</Form.Label>
                    <Form.Control placeholder="Enter order number" onChange={(e)=>{ updateField(e.target.value, "externalOrderNumber")}}/>
                </Col>
                <Col>
                <   Form.Label className="mt-2">Buyer full name</Form.Label>
                    <Form.Control placeholder="Enter full name" onChange={(e)=>{ updateField(e.target.value, "buyerFullname")}}/>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label className="mt-2">Buyer Phone number</Form.Label>
                    <Form.Control placeholder="Enter phone number" onChange={(e)=>{updateField(e.target.value, "buyerPhoneNumber")}}/>
                </Col>
                <Col>
                    <Form.Label className="mt-2">Buyer email</Form.Label>
                    <Form.Control placeholder="Enter Buyer Email" onChange={(e)=>{ updateField(e.target.value,"buyerEmail")}}/>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label className="mt-2">Shipping Address</Form.Label>
                    <Form.Control placeholder="Enter shipping Address" onChange={(e)=>{ updateField(e.target.value,"shippingAddress")}}/>
                </Col>
                <Col>
                    <Form.Label className="mt-2">Shipping city</Form.Label>
                    <Form.Control placeholder="Enter shipping city" onChange={(e)=>{ updateField(e.target.value,"shippingCity")}}/>
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Label className="mt-2">Shipping region</Form.Label>
                    <Form.Control placeholder="Enter shipping region" onChange={(e)=>{ updateField(e.target.value, "shippingRegion")}}/>
                </Col>
                <Col>
                    <Form.Label className="mt-2">Shipping country</Form.Label>
                    <Form.Control placeholder="Enter shipping country"
                    onChange={(e)=>{ updateField(e.target.value,"shippingCountry")}}/>
                </Col>
            </Form.Row>
            <Form.Row>
            <div className="d-flex flex-direction-row">
                <div className="mt-2">
                    <div className="card-header" style={{ background:"#66727a", color:"white"}}>
                        <FormLabel className="mt-2">Add product</FormLabel>
                        <div>
                        <FormLabel className="mt-2" id="modal-error"></FormLabel>
                        </div>
                    </div>
                    <Form.Control placeholder="Enter product name" className="mt-2" id="product-name"/>
                    <Form.Control placeholder="Enter product quantity" className="mt-2" id="product-qty" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key))
                    {
                        alert("Only Number Allowed")
                        event.preventDefault();
                    }}}/>
                    <Form.Control placeholder="Enter product weight" className="mt-2" id="product-weight"
                    onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key))
                        {
                            alert("Only Number Allowed")
                            event.preventDefault();
                        }}}
                    />
                    <Button className="mt-3" onClick ={() => HandleAddProduct()} style={{background:"#b9a5e5", border : "1px solid white"}}>Add Product</Button>
                </div>
                <div style={{marginLeft: "1em"}}>
                    <div>
                        <FormLabel className="mt-2">Products Added</FormLabel>
                    </div>
                    <div id="product">
                        <table className="table table-responsive" >
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Product quantity</th>
                                    <th>Product Weight</th>
                                    <th>Total Weight</th>
                                </tr>
                            </thead>
                            <tbody id="products-added">
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="m-5">
                    <Button type="submit" onClick={saveOrder} style={{background:"#b9a5e5", border : "1px solid white"}} href="/">Create Order</Button>
                </div>
            </div>
            </Form.Row>
            <Form.Row className="mt-2">
            </Form.Row> 
        </Form>
        </div>
    )
}
export default CreateOrder