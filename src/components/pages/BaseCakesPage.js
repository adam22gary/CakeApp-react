import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes, deleteBaseCake } from "../../actions";

class BaseCakesPage extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }

    componentDidMount() {
        this.props.fetchBaseCakes();
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h2>Create A New BaseCake Recipe</h2>
                <Link to="/baseCakes/new">
                    <button>Create A New BaseCake Recipe</button>
                </Link>
                <h2>View all my BaseCake Recipes</h2>
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.recipe_name }
                                 {item.total_people }
                                 {item.description }
                                 <Link to={`/baseCakes/show/${item._id}`}>
                                    <button>View Cake</button>
                                 </Link>
                                 <Link to={`/baseCakes/edit/${item._id}`}>
                                    <button>Edit Cake</button>
                                 </Link>
                                 <button onClick={() => window.confirm("Are you sure you wish to delete this cake?") && this.onDeleteItem(item._id)}>Delete this cake</button>
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
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchBaseCakes, deleteBaseCake })(BaseCakesPage);