import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";
import OrderForm from "./../forms/OrderForm";

class OrdersNew extends Component {

    onOrderFormSubmit = (orders) => {
        this.setState({ orders });
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h3>Select Cake Base</h3>
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                <Link to={`/baseCakes/show/${item._id}`}>
                                {item.recipe_name }
                                {item.total_people }
                                {item.description }   
                                </Link>
                                <Link to={`/baseCakes/edit/${item._id}`}>
                                    <button>Edit Cake</button>
                                </Link>
                                <button onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>Delete this cake</button>
                            </li>
                        );
                    })}
                </ul>
                <h2>Create New Order</h2>
                <OrderForm onOrderFormSubmit={this.onOrderFormSubmit} />
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchBaseCakes })(OrdersNew);