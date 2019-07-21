// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { fetchOrders } from "../../actions";

// class Orders extends Component {
//     defaultState = { data: null, error: null };
//     constructor(props) {
//         super(props);
    
//         // Set the default state immediately
//         this.state = this.defaultState;
//     }

//     componentDidMount() {
//         this.setState();
//         this.props.fetchOrders();
//     }

//     render() {
//         const { orders } = this.props;

//         return (
//             <>
//                 <h2>Current Orders</h2>
//                 <ul>
//                     {orders.map((item, index) => {
//                         return (
//                             <li key={item._id}>
//                                  {item.recipe_name }
//                                  {item.total_people }
//                                  {item.description }
//                                  <Link to={`/orders/show/${item._id}`}>
//                                     <button>View Order</button>
//                                  </Link>
//                                  <Link to={`/orders/edit/${item._id}`}>
//                                     <button>Edit Order</button>
//                                  </Link>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         orders: state.orders
//     }
// }

// export default connect(mapStateToProps, { fetchOrders })(Orders);