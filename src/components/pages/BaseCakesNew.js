import React, { Component } from "react";
import BaseCakeForm from "./../forms/BaseCakeForm";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchBaseCakes } from "../../actions";

class BaseCakesNew extends Component {
    onBaseCakeFormSubmit = (baseCakes) => {
        console.log("submit");
        this.setState({ baseCakes });
    }

    componentDidMount() {
        console.log("fetch");
        this.props.fetchBaseCakes();
    }

    render() {
        const { baseCakes } = this.props;

        return (
            <>
                <h2>Create A New BaseCake Recipe</h2>
                <BaseCakeForm onBaseCakeFormSubmit={this.onBaseCakeFormSubmit} />
                <h2>My Ingredients for this BaseCake Recipe</h2>
                <h2>Do i need a second scheme for the ingredients_array??? </h2>
                <h2>kvnckjf </h2>
                <ul>
                    {baseCakes.map((item, index) => {
                        return (
                            <li key={item._id}>
                                 {item.ingredients_array }
                                 <button>Delete this item(add a closure function with id)</button>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("map");
    return {
        baseCakes: state.baseCakes
    }
}

export default connect(mapStateToProps, { fetchBaseCakes })(BaseCakesNew);