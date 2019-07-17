import React, { Component } from "react";
import OrderForm from "./../forms/OrderForm";
import { connect } from "react-redux";
import { fetchOrders, createOrder } from "../../actions";

class OrdersNew extends Component {
    onOrderFormSubmit = (ingredients) => {
        this.setState({ ingredients });
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        const { ingredients } = this.props;

        return (
            <>
                <h2>Create A New Ingredient</h2>
                <OrderForm onOrderFormSubmit={this.onOrderFormSubmit} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.orders
    }
}

export default connect(mapStateToProps, { fetchOrders })(OrdersNew);