import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutAuthToken } from "../../actions";
import { connect } from "react-redux";
import img1 from "./../../images/img1.png";
import img2 from "./../../images/img2.png";
import img3 from "./../../images/img3.png";
import img4 from "./../../images/img4.jpg";

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
                                    <img className="ui medium circular image" src={img1} alt="orders" style={{ margin: "0 auto" }} />
                                </Link>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/ingredients">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        My ingredients</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>add an ingredient</p>
                                    <img className="ui medium circular image" src={img2} alt="ingredients" style={{ margin: "0 auto" }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="ui two column grid">
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/baseCakes">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        Base Cakes Recipes</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>view all recipes</p>
                                    <img className="ui medium circular image" src={img3} alt="baseCakes" style={{ margin: "0 auto" }} />
                                </Link>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui medium circular cirsegment">
                                <Link to="/orders/showAll">
                                    <h1 style={{ fontSize: "40px", marginTop: "30px", fontFamily: 'Lobster', color: "black", textAlign: "center" }}>
                                        Orders {`&`} History</h1>
                                    <p style={{ color: "#ff0081", fontSize: "20px", textAlign: "center" }}>view all orders</p>
                                    <img className="ui medium circular image" src={img4} alt="showAll orders" style={{ margin: "0 auto" }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
            </>
        );
    }
}

export default connect(null, {logoutAuthToken})(HomePage);

