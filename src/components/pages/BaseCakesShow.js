import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowBaseCakes } from "../../actions";

class BaseCakesShow extends Component {

    componentDidMount() {
        this.props.fetchShowBaseCakes(this.props.match.params.id);
    }

    render() {
        const { baseCakes } = this.props;
        console.log(baseCakes)
        return (
            <>
                <h2>Show This BaseCake Recipes</h2>
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.total_people }
                                 {item.description }
                                 <button>Edit this item(use link to)</button>
                                 <button>Delete this item(add a closure function with id)and(are you sure)</button>
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

export default connect(mapStateToProps, { fetchShowBaseCakes })(BaseCakesShow);