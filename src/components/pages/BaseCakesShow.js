import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchShowBaseCakes, deleteBaseCake  } from "../../actions";

class BaseCakesShow extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }
    componentDidMount() {
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
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchShowBaseCakes, deleteBaseCake  })(BaseCakesShow);