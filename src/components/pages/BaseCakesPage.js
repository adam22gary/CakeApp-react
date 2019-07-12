import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";

class BaseCakesPage extends Component {

    componentDidMount() {
        this.props.fetchBaseCakes();
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h2>Create A New BaseCake Recipe</h2>
                <Link to="/baseCakes/new">
                    <button>Create A New BaseCake Recipe</button>
                </Link>
                <h2>View all my BaseCake Recipes</h2>
                {console.log(baseCakes)}
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.recipe_makes_number }
                                 {item.description }
                                 {item.method }
                                 {item.ingredients_array }

                                 <button>View this item(use link to)</button>
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

export default connect(mapStateToProps, { fetchBaseCakes })(BaseCakesPage);