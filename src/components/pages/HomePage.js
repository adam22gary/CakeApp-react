import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutAuthToken } from "../../actions";
import { connect } from "react-redux";
import img2 from "./../../images/Farm_products_1-512.png";

class HomePage extends Component {
    render() {
        return (
            <>
                <div className="homepageclass">
                    <div className="ui two column grid">
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/orders">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        Create a new Order</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>get started</p>
                                    <img className="ui medium circular image" src={img2} />
                                </Link>
                            </div>
                        </div>
​
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/ingredients">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        My ingredients</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>add an ingredient</p>
                                    <img className="ui medium circular image" src={img2} />
                                </Link>
                            </div>
                        </div>
​
                    </div>
​
                    <div className="ui two column grid">
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/baseCakes">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        Base Cakes Recipes</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>view all Recipes</p>
                                    <img className="ui medium circular image" src={img2} />
                                </Link>
                            </div>
                        </div>
​
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/orders/showAll">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        Orders {`&`} History</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>view all orders</p>
                                    <img className="ui medium circular image" src={img2} />
                                </Link>
                            </div>
                        </div>
​
                    </div>
                </div>
                <div className="clear"></div>
            </>



        //     <>
        //     <div className="ui right aligned grid">
        //         <div className="center aligned two column row">
        //             <div className="column">
        //                 <Link to="/ingredients">
        //                     <div className="ui pink segment">
        //                         Add an ingredient
        //                     </div>
        //                 </Link>
        //             </div>
        //             <div className="column">
        //                 <Link to="/baseCakes">
        //                     <div className="ui pink segment">
        //                         Add a base cake recipe
        //                     </div>
        //                 </Link>
        //             </div>
        //         </div>
        //         <div className="center aligned two column row">
        //             <div className="column">
        //                 <Link to="/orders">
        //                     <div className="ui pink segment">
        //                         Create new orders
        //                     </div>
        //                 </Link>
        //             </div>
        //             <div className="column">
        //                 <Link to="/orders/show">
        //                     <div className="ui pink segment">
        //                         Current and past orders
        //                     </div>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </>
        );
    }
}

export default connect(null, {logoutAuthToken})(HomePage);

