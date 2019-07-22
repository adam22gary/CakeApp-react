import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowOrders } from "../../actions";

class OrderShow extends Component {
  
    componentDidMount() {
        this.props.fetchShowOrders();
    }

    render() {
        const { ordersShow } = this.props;
        console.log(ordersShow)
        return (
            <>
                <h2>Past Orders</h2>
                <ul>
                    {ordersShow.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.total_people }
                                 {item.description }
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
        ordersShow: state.ordersShow
    }
}

export default connect(mapStateToProps, { fetchShowOrders })(OrderShow);