import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowBaseCakes, fetchIngredients, deleteBaseCake  } from "../../actions";
import { Button, Icon } from 'semantic-ui-react';

class BaseCakesShow extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchShowBaseCakes(this.props.match.params.id);
    }

    render() {
        const { baseCakes } = this.props;
        console.log(baseCakes)
        return (
            <>
            <h2>Base cake recipe</h2>
                <div className="ui piled segment" style={{ backgroundColor: "#ffddf4", marginLeft: "30px", marginRight: "200px" }}>
                <table className="ui table" cellpadding="10">
                        {baseCakes.map((item, index) => {
                            return (
                                <tbody key={item._id}>
                                    <tr><td>{item.recipe_name}</td></tr>
                                    <tr><td>Total people: {item.total_people}</td></tr>
                                    <tr><td>Description:</td></tr>
                                    <tr><td>{item.description}</td></tr>
                                    <tr><td>
                                        <Link to={`/baseCakes/edit/${item._id}`}>
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
                                    </td></tr>
                                </tbody>
                            );
                        })}
                </table>
                <h2>The ingredients for this base cake recipe:</h2>
                    <table className="ui table" cellpadding="10">
                            {baseCakes.map((item, index) => {
                                return (
                                    <tbody key={item._id}>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Description</th>
                                            <th>Measurement</th>
                                            <th>Price</th>
                                        </tr>
                                            {Object.keys(item.ingredients_array).map((theKey, index) => {
                                                return (
                                                    <tr key={theKey}>
                                                        <td>{item.ingredients_array[theKey][0]}</td>
                                                        <td>{item.ingredients_array[theKey][1]}</td>
                                                        <td>{item.ingredients_array[theKey][2]}</td>
                                                        <td>${item.ingredients_array[theKey][3]}</td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                );
                            })}   
                    </table>
                <Link to="/baseCakes">
                    <span className="ui yellow button">Back</span>
                </Link>
                </div>
                <div className="clear"></div>
                <div className="clear"></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchShowBaseCakes, fetchIngredients, deleteBaseCake  })(BaseCakesShow);