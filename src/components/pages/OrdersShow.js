import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowOrder } from "../../actions";

class OrderShow extends Component {
  
    componentDidMount() {
        this.props.fetchShowOrders(this.props.match.params.id);
    }

    render() {
        const { orders } = this.props;
        console.log(orders)
        return (
            <>
                <h2>Past Orders</h2>
                <ul>
                    {orders.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.total_people }
                                 {item.description }
                                 <Link to={`/orders/edit/${item._id}`}>
                                    <button>Edit Order</button>
                                 </Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders
    }
}

export default connect(mapStateToProps, { fetchShowOrder })(OrderShow);