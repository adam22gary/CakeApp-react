import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteOrder, fetchOrders } from "../../actions";
import { Button, Container, Header, Icon, Item } from 'semantic-ui-react';
import { format, isAfter } from "date-fns";

class OrdersShowAll extends Component {
    // for delete instant
    defaultState = { data: null, error: null };
    constructor(props) {
        super(props);
    
        // Set the default state immediately
        this.state = this.defaultState;
    }

    onDeleteItem = async (id) => {
        await this.props.deleteOrder(id);
    }
  
    componentDidMount() {
        this.setState();
        this.props.fetchOrders();
    }

    render() {
        const { ordersAll } = this.props;
        return (
            <>
            <h1 content='Responsive Item' textalign='left' style={{ fontFamily: "Lobster", marginLeft: "150px" }} >My current orders</h1>
                <div className="clear"></div>
                <Container>
                    <Item.Group divided>
                        {ordersAll.map((item, index) => {
                            
                            return (<>
                                {isAfter(format(item.due_date),format(new Date())) && 
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
                                                <Link to="#">
                                                    <Button floated='right' color='google plus' onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>
                                                        Delete this order
                                                <Icon className='delete right' />
                                                    </Button>
                                                </Link>
                                                <Link to={`/orders/show/${item._id}`}>
                                                    <Button floated='right' color='teal'>
                                                        View this order
                                                <Icon className='birthday cake right' />
                                                    </Button>
                                                </Link>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                }
                                
                                </>
                            );
                        })}
                    </Item.Group>
                    <Link to="/">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <div className="clear"></div>
                    
                </Container>
                <div className="clear"></div>
                <h1 content='Responsive Item' textalign='left' style={{ fontFamily: "Lobster", marginLeft: "150px" }} >My past orders</h1>
                <div className="clear"></div>
                <Container>
                    <Item.Group divided>
                        {ordersAll.map((item, index) => {
                            
                            return (<>
                                {isAfter(format(new Date()),format(item.due_date)) && 
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
                                                <Link to="#">
                                                    <Button floated='right' color='google plus' onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>
                                                        Delete this order
                                                <Icon className='delete right' />
                                                    </Button>
                                                </Link>
                                                <Link to={`/orders/show/${item._id}`}>
                                                    <Button floated='right' color='teal'>
                                                        View this order
                                                <Icon className='birthday cake right' />
                                                    </Button>
                                                </Link>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                }
                                
                                </>
                            );
                        })}
                    </Item.Group>
                    <Link to="/">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <div className="clear"></div>
                    
                </Container>
                <div className="clear"></div>
             </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ordersAll: state.ordersAll
    }
}

export default connect(mapStateToProps, { deleteOrder, fetchOrders })(OrdersShowAll);