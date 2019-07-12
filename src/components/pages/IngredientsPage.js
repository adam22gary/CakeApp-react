import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIngredients } from "../../actions";

class IngredientsPage extends Component {

    componentDidMount() {
        this.props.fetchIngredients();
    }

    render() {
        const { ingredients } = this.props;
 
        return (
            <>
                <h2>My ingredients</h2>
                <Link to="/Ingredients/new">
                    <button>Create A New Ingredient</button>
                </Link>
                <h2>View all my Ingredients</h2>
                <ul>
                    {ingredients.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.ingredients_name }
                                 {item.ingredients_quantity }
                                 {item.ingredients_measurement }
                                 {item.ingredients_price }
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
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps, { fetchIngredients })(IngredientsPage);