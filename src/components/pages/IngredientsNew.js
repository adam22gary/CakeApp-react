import React, { Component } from "react";
import IngredientForm from "./../forms/IngredientForm";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIngredients } from "../../actions";

class IngredientsNew extends Component {
    onIngredientFormSubmit = (ingredients) => {
        this.setState({ ingredients });
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    render() {
        const { ingredients } = this.props;

        return (
            <>
                <h2>Create A New Ingredient</h2>
                <IngredientForm onIngredientFormSubmit={this.onIngredientFormSubmit} />
                <h2>All my ingredients for my beautiful recipes</h2>
                <ul>
                    {ingredients.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.ingredients_name }
                                 {item.ingredients_quantity }
                                 {item.ingredients_measurement }
                                 {item.ingredients_price }
                                 <button>Delete this item(add a closure function with id)</button>
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

export default connect(mapStateToProps, { fetchIngredients })(IngredientsNew);