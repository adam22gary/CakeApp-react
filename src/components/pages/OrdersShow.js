import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteOrder, fetchShowOrders } from "../../actions";
import { Button, Container, Header, Icon, Item } from 'semantic-ui-react';
import { format } from "date-fns";

class OrderShow extends Component {
    state = {
        total_people: 0.0,
        total_people_new: 0.0,
        total_price: 0.0
    }
    onDeleteItem = async (id) => {
        await this.props.deleteOrder(id);
    }
  
    componentDidMount() {
        if(this.props.fetchShowOrders(this.props.match.params.id)){
            this.props.fetchShowOrders(this.props.match.params.id);
        }
        //this is from ordersNew
        const { ordersShow } = this.props;
        if (ordersShow && ordersShow.length > 0) {
            this.setState({
                total_people: parseFloat(ordersShow[0].total_people),
                total_people_new: parseFloat(ordersShow[0].total_people_new),
                total_price: parseFloat(ordersShow[0].total_price),
            });
        }
        console.log(this.props);
    }

    render() {
        const { ordersShow } = this.props;
        const { total_people, total_people_new, total_price } = this.state;
        console.log(ordersShow);
        return (
            <> 
            
             <h2>My order details</h2>
                <div className="ui piled segment" style={{ backgroundColor: "#ffddf4", marginLeft: "30px", marginRight: "200px" }}>
                <table className="ui table" cellpadding="10">
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
                    <table className="ui table" cellpadding="10">
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
                                                        <td>{((parseInt(item.ingredients_array[theKey][0]) / total_people) * total_people_new).toFixed(2)} {item.ingredients_array[theKey][0]}</td>
                                                        <td>{item.ingredients_array[theKey][1]}</td>
                                                        <td>{item.ingredients_array[theKey][2]}</td>
                                                        <td>${item.ingredients_array[theKey][3]}</td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                );
                            })}   
                    </table>
                    <h2>Order Costing:</h2>
                    <table className="ui table" cellpadding="10">
                        {ordersShow.map((item, index) => {
                            return (
                                <tbody key={item._id}>
                                    <tr><td>Total food cost: {item.customer_name}</td></tr>
                                    <tr><td>Due Date: {format(item.due_date, 'DD/MM/YYYY')}</td></tr>
                                    <tr><td>Total people: {item.total_people_new}</td></tr>
                                    <tr><td>Description:</td></tr>
                                    <tr><td>{item.order_description}</td></tr>
                                </tbody>
                            );
                        })}
                </table>
                <Link to="/orders/showAll">
                    <span className="ui yellow button">Back</span>
                </Link>
                </div>
                <div className="clear"></div>
                <div className="clear"></div>


             <h1 content='Responsive Item' textalign='left' style={{ fontFamily: "Lobster", marginLeft: "150px" }} >My order</h1>
                <div className="clear"></div>
                <Container>
                    <Item.Group divided>
                        {ordersShow.map((item, index) => {
                            return (
                                <Item key={item._id}>
                                    <Item.Content>
                                    <Item.Header as='a'>{item.customer_name}</Item.Header>
                                        <div className="antonella_padding"></div>
                                        <Item.Meta>
                                            Due Date: {format(item.due_date, 'DD/MM/YYYY')}
                                        </Item.Meta>
                                        <div className="antonella_padding"></div>
                                        <Item.Meta>
                                            Total people: {item.total_people_new}
                                        </Item.Meta>
                                        <div className="antonella_padding"></div>
                                        <Item.Description>
                                            {item.order_description}
                                        </Item.Description>
                                        <div className="antonella_padding"></div>
                                        <Item.Extra>

                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                    <Link to="/orders/showAll">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <div className="clear"></div>
                </Container>
                <div className="clear"></div>

                <h2>Order</h2>
                <ul>
                    {ordersShow.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.due_date}
                                 {item.customer_name }
                                 {item.total_people_new }
                                 {item.order_description }
                                 <Link to="/orders/showAll">
                                    <span className="ui yellow button">Back</span>
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
        ordersShow: state.ordersShow
    }
}

export default connect(mapStateToProps, { deleteOrder, fetchShowOrders })(OrderShow);