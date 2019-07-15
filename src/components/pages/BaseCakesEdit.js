import React, { Component } from "react";
import BaseCakeEditForm from "./../forms/BaseCakeEditForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBaseCake } from "../../actions";

class BaseCakesEdit extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }

    onBaseCakeFormSubmit = (baseCakes) => {
        this.setState({ baseCakes });
    }

    componentDidMount() {
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h2>Edit a current BaseCake Recipe</h2>
                <BaseCakeEditForm onBaseCakeFormSubmit={this.onBaseCakeFormSubmit} sendID={this.props.match.params.id} />
                <h2>My current BaseCake Recipes</h2>
                {/* <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 <Link to={`/baseCakes/show/${item._id}`}>
                                    <button>View Cake</button>
                                 </Link>
                                 <button>Edit this item(use link to)</button>
                                 <button onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>Delete this cake</button>
                            </li>
                        );
                    })}
                </ul> */}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { deleteBaseCake })(BaseCakesEdit);