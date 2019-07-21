import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchIngredients, deleteIngredient } from "../../actions";
import { Button, Container, Header, Icon, Item } from 'semantic-ui-react';

class IngredientsPage extends Component {
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
            <Container>
                <Header as='h2' content='Responsive Item' textAlign='center'>My ingredients</Header>
                <Link to="/Ingredients/new">
                    <button className="ui primary button">Create a new ingredient</button>
                </Link>
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
                                            <Icon name='delete right' />
                                            </Button>
                                        </Link>
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                            );
                        })}
                    </Item.Group>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps, { fetchIngredients, deleteIngredient })(IngredientsPage);