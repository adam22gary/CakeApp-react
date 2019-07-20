import React, { Component } from "react";
import OrderForm from "./../forms/OrderForm";
import { connect } from "react-redux";
import { fetchBaseCakes, deleteBaseCake } from "../../actions";

class OrdersNew extends Component {

    onOrderFormSubmit = (orders) => {
        this.setState({ orders });
    }

    componentDidMount() {
        this.props.fetchBaseCakes(this.props.match.params.id);
    }

    render() {
        const { baseCake } = this.props;

        return (
            <>
                <h2>Create New Order</h2>
                <OrderForm onOrderFormSubmit={this.onOrderFormSubmit}  initialValues={baseCake} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseCake: state.baseCake
    }
}

export default connect(mapStateToProps, { fetchBaseCakes })(OrdersNew);