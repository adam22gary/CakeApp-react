import React, { Component } from "react";
import OrderForm from "../forms/OrderForm";

class OrdersEdit extends Component {

    onOrderFormSubmit = (orders) => {
        this.setState({ orders });
    }

    render() {
        return (
            <>
                <h2>Create New Order</h2>
                <OrderForm onOrderFormSubmit={this.onOrderFormSubmit} />
            </>
        );
    }
}


export default OrdersEdit;