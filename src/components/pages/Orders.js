import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";

class Orders extends Component {

    componentDidMount() {
        this.props.fetchBaseCakes();
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
                                <Link to={`/orders/new/${item._id}`}>
                                    {item.recipe_name}
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
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchBaseCakes })(Orders);