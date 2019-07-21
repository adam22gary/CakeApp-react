import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowBaseCakes, fetchIngredients, deleteBaseCake  } from "../../actions";

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
                <h2>Show This BaseCake Recipes</h2>
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.total_people }
                                 {item.description }
                                 <Link to={`/baseCakes/edit/${item._id}`}>
                                    <button>Edit Cake</button>
                                 </Link>
                                 <button onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>Delete this cake</button>
                            </li>
                        );
                    })}
                </ul>
                <div>{baseCakes.map((item, index) => {
                        return (
                            <div key={item._id}>
                                 <ul>
                                 {console.log(item.ingredients_array)}
                                    {Object.keys(item.ingredients_array).map((theKey, index) => {
                                        return (
                                            <li key={theKey}>
                                                {item.ingredients_array[theKey][0]} {item.ingredients_array[theKey][1]} {item.ingredients_array[theKey][2]} ${item.ingredients_array[theKey][3]}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
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