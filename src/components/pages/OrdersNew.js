import React, { Component } from "react";
import OrderForm from "./../forms/OrderForm";
import { connect } from "react-redux";
import { fetchBaseCakesForNew } from "../../actions";

class OrdersNew extends Component {

    onOrderFormSubmit = (baseCakeForNew) => {
        this.setState({ baseCakeForNew });
    }

    componentDidMount() {
        this.props.fetchBaseCakesForNew(this.props.match.params.id);
    }

    render() {
        const { ordersNew } = this.props;

        return (
            <>
                <h2>Create New Order</h2>
                {ordersNew.length === 0 ? null : <OrderForm onOrderFormSubmit={this.onOrderFormSubmit}  ordersNew={ordersNew} />}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ordersNew: state.ordersNew
    }
}

export default connect(mapStateToProps, { fetchBaseCakesForNew })(OrdersNew);