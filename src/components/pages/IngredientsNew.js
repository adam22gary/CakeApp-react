import React, { Component } from "react";
import IngredientForm from "./../forms/IngredientForm";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIngredients, deleteIngredient } from "../../actions";

class IngredientsNew extends Component {
    onIngredientFormSubmit = (ingredients) => {
        this.setState({ ingredients });
    }

    onDeleteItem = async (item) => {
        await this.props.deleteIngredient(item);
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
                                 {item.ingredients_name}
                                 {item.ingredients_quantity}
                                 {item.ingredients_measurement}
                                 {item.ingredients_price}
                                 <button onClick={() => window.confirm("Are you sure you wish to delete this item?") && this.onDeleteItem(item._id)}>Delete this item</button>
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

export default connect(mapStateToProps, { fetchIngredients, deleteIngredient })(IngredientsNew);