import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteOrder, fetchShowOrders } from "../../actions";
import { format } from "date-fns";

class OrderShow extends Component {
    state = {
        total_people: 0.0,
        total_people_new: 0.0,
        total_price: 0.0,
        onOff: true
    }
    onDeleteItem = async (id) => {
        await this.props.deleteOrder(id);
    }
  
    componentDidMount() {
        this.props.fetchShowOrders(this.props.match.params.id);
    }

    componentDidUpdate() {
        const { ordersShow } = this.props;
        const { onOff } = this.state;

        //do not update state in render - ask Garret
        if (onOff && ordersShow && ordersShow.length > 0) {
            this.setState({
                total_people: parseFloat(ordersShow[0].total_people),
                total_people_new: parseFloat(ordersShow[0].total_people_new),
                total_price: parseFloat(ordersShow[0].total_price),
                onOff: false
            });
        }
    }

    render() {
        const { ordersShow } = this.props;
        const { total_people, total_people_new, total_price } = this.state;
        
        return (
            <> 
            
             <h2>My order details</h2>
                <div className="ui piled segment" style={{ backgroundColor: "#ffddf4", marginLeft: "30px", marginRight: "200px" }}>
                <table className="ui table" cellPadding="10">
                        {ordersShow.map((item, index) => {
                            return (
                                <tbody key={item._id}>
                                    <tr><td>Customer's name: {item.customer_name}</td></tr>
                                    <tr><td>Due Date: {format(item.due_date, 'DD/MM/YYYY')}</td></tr>
                                    <tr><td>Total people: {item.total_people_new}</td></tr>
                                    <tr><td>Description:</td></tr>
                                    <tr><td>{item.order_description}</td></tr>
                                </tbody>
                            );
                        })}
                </table>
                <h2>The ingredients for this order:</h2>
                    <table className="ui table" cellPadding="10">
                            {ordersShow.map((item, index) => {
                                return (
                                    <tbody key={item._id}>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Description</th>
                                            <th>Measurement</th>
                                            <th>Price</th>
                                        </tr>
                                            {Object.keys(item.ingredients_array).map((theKey, index) => {
                                                return (
                                                    <tr key={theKey}>
                                                        <td>{((parseInt(item.ingredients_array[theKey][0]) / total_people) * total_people_new).toFixed(2)}</td>
                                                        <td>{item.ingredients_array[theKey][1]}</td>
                                                        <td>{item.ingredients_array[theKey][2]}</td>
                                                        <td>${((parseFloat(item.ingredients_array[theKey][3]) / total_people) * total_people_new).toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                );
                            })}   
                    </table>
                    <h2>Order Costing:</h2>
                    <table className="ui table" cellPadding="10">
                        {ordersShow.map((item, index) => {
                            return (
                                <tbody key={item._id}>
                                    <tr><td>Total food cost: ${(parseFloat(total_price) / 5).toFixed(2)}</td></tr>
                                    <tr><td>Profit margin: 500%</td></tr>
                                    <tr><td>Total quote price: ${total_price}</td></tr>
                                </tbody>
                            );
                        })}
                    </table>
                <div className="antonella_padding"></div>
                <Link to="/orders/showAll">
                    <span className="ui yellow button">Back</span>
                </Link>
                </div>
                <div className="clear"></div>
                <div className="clear"></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ordersShow: state.ordersShow
    }
}

export default connect(mapStateToProps, { deleteOrder, fetchShowOrders })(OrderShow);