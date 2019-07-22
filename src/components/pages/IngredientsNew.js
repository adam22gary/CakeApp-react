import React, { Component } from "react";
import IngredientForm from "./../forms/IngredientForm";
import { connect } from "react-redux";
import { fetchIngredients, deleteIngredient } from "../../actions";
import { Button, Icon, Item } from 'semantic-ui-react';
import { Link } from "react-router-dom";

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
                <div className="clear"></div>
                <div className="formclass">
                    <Item.Group divided>
                        {ingredients.map((item, index) => {
                            return (
                                <Item key={item._id}>
                                    <Item.Content>
                                        <Item.Header as='a'>{item.ingredients_quantity} {item.ingredients_measurement} {item.ingredients_name}</Item.Header>
                                        <Item.Description>
                                            Price: ${item.ingredients_price}
                                        </Item.Description>
                                        <Item.Extra>
                                            <Link to="#">
                                                <Button floated='right' color='google plus' onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>
                                                    Delete this ingredient
                                            <Icon className='delete right' />
                                                </Button>
                                            </Link>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                    <Link to="/ingredients">
                        <span className="ui yellow button">Back</span>
                    </Link>
                </div>
                
                <div className="clear"></div>
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