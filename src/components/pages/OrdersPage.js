import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";
import { Button, Container, Icon, Item } from 'semantic-ui-react';

class OrdersPage extends Component {

    componentDidMount() {
        this.props.fetchBaseCakes();
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
            <h1 content='Responsive Item' textalign='left' style={{ fontFamily: "Lobster", marginLeft: "150px" }} >Select a base cake recipe</h1>
                <div className="clear"></div>
                <Container>
                    {baseCakes.length === 0 ? <div className="clear">There are no currently no base cakes, please create a new base cake to continue.</div> :
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
                                                <Link to={`/orders/new/${item._id}`}>
                                                    <Button floated='right' color='teal'>
                                                        Select this Cake
                                                <Icon className='birthday cake right' />
                                                    </Button>
                                                </Link>
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>
                                );
                            })}
                        </Item.Group>
                    }
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

export default connect(mapStateToProps, { fetchBaseCakes })(OrdersPage);