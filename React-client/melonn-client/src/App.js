import './App.css';
import CreateOrder from './components/CreateOrder'
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderState from './ContextOrder/OrderState'
import OrderList from './components/OrderList';
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
function App() {
  return (
  
      <OrderState>
          <Router>
            <Header/>
            <Switch>
              <Route exact path="/createorder" component={CreateOrder}/>
              <Route exact path="/" component={OrderList}/>
            </Switch>
          </Router>
      </OrderState>
  
    
  );
}

export default App;
