import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes, deleteBaseCake } from "../../actions";
import { Button, Container, Header, Icon, Item } from 'semantic-ui-react';

class BaseCakesPage extends Component {
    defaultState = { data: null, error: null };
    constructor(props) {
        super(props);
    
        // Set the default state immediately
        this.state = this.defaultState;
    }

    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }

    componentDidMount() {
        this.setState();
        this.props.fetchBaseCakes();
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h2>Create a new base cake recipe</h2>
                <Link to="/baseCakes/new">
                    <button className="ui primary button">Create a new base cake recipe</button>
                </Link>
​
                <Header as='h2' content='Responsive Item' textAlign='center' >My base cake recipes</Header>
                <Container>
​
                <Item.Group divided>
                        {baseCakes.map((item, index) => {
                            return (
                                    <Item key={item._id}>
                                        <Item.Content>
                                    <Item.Header as='a'>{item.recipe_name}</Item.Header>
                                    <Item.Meta>
                                        Total people: {item.total_people}
                                    </Item.Meta>
                                    <Item.Description>
                                        {item.description}
                                    </Item.Description>
                                    <Item.Extra>
                                        <Link to="#">
                                            <Button floated='right' color='google plus' onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>
                                                Delete this Cake
                                            <Icon name='delete right' />
                                            </Button>
                                        </Link>
                                        <Link to={`/baseCakes/edit/${item._id}`}>
                                            <Button floated='right' primary>
                                                Edit this Cake
                                            <Icon name='edit right' />
                                            </Button>
                                        </Link>
                                        <Link to={`/baseCakes/show/${item._id}`}>
                                            <Button floated='right'color='teal'>
                                                View this Cake
                                            <Icon name='birthday cake right' />
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
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchBaseCakes, deleteBaseCake })(BaseCakesPage);