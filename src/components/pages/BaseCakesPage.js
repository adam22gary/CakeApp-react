import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes, deleteBaseCake } from "../../actions";
import { Button, Container, Icon, Item } from 'semantic-ui-react';

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
            <h1 content='Responsive Item' textalign='left' style={{ fontFamily: "Lobster", marginLeft: "150px" }} >My base cake recipes</h1>
                <div className="clear"></div>
                <Container>
                    <Item.Group divided>
                        {baseCakes.map((item, index) => {
                            return (
                                <Item key={item._id}>
                                    <Item.Content>
                                        <Item.Header as='a'>{item.recipe_name}</Item.Header>
                                        <div className="antonella_padding"></div>
                                        <Item.Meta>
                                            Total people: {item.total_people}
                                        </Item.Meta>
                                        <div className="antonella_padding"></div>
                                        <Item.Description>
                                            {item.description}
                                        </Item.Description>
                                        <div className="antonella_padding"></div>
                                        <Item.Extra>
                                            <Link to="#">
                                                <Button floated='right' color='google plus' onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>
                                                    Delete this Cake
                                            <Icon className='delete right' />
                                                </Button>
                                            </Link>
                                            <Link to={`/baseCakes/edit/${item._id}`}>
                                                <Button floated='right' primary>
                                                    Edit this Cake
                                            <Icon className='edit right' />
                                                </Button>
                                            </Link>
                                            <Link to={`/baseCakes/show/${item._id}`}>
                                                <Button floated='right' color='teal'>
                                                    View this Cake
                                            <Icon className='birthday cake right' />
                                                </Button>
                                            </Link>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            );
                        })}
                    </Item.Group>
                    <h1 content='Responsive Item' style={{ fontFamily: "Lobster", marginLeft: "0px", textAlign: "left" }} >Base Cake Recipes</h1>
                    <div className="clear"></div>
                    <Link to="/baseCakes/new">
                        <button className="ui green button" style={{ marginLeft: "0px" }}>Create a new base cake recipe
                        <Icon className='plus icon right' />
                        </button>
                    </Link>
                    <div className="clear"></div>
                    <Link to="/">
                        <span className="ui yellow button">Back</span>
                    </Link>
                </Container>
                <div className="clear"></div>
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