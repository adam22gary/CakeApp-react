import React, { Component } from "react";
import OrderForm from "./../forms/OrderForm";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";

class OrdersNew extends Component {

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

export default OrdersNew;