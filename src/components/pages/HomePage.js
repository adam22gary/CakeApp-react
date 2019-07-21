import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutAuthToken } from "../../actions";
import { connect } from "react-redux";

class HomePage extends Component {
    render() {
        return (
            <>
            <div className="ui right aligned grid">
                <div className="center aligned two column row">
                    <div className="column">
                        <Link to="/ingredients">
                            <div className="ui pink segment">
                                Add an ingredient
                            </div>
                        </Link>
                    </div>
                    <div className="column">
                        <Link to="/baseCakes">
                            <div className="ui pink segment">
                                Add a base cake recipe
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="center aligned two column row">
                    <div className="column">
                        <Link to="/orders">
                            <div className="ui pink segment">
                                Create new orders
                            </div>
                        </Link>
                    </div>
                    <div className="column">
                        <Link to="/history">
                            <div className="ui pink segment">
                                Current and past orders
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default connect(null, {logoutAuthToken})(HomePage);
