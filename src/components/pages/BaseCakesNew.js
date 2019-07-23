import React, { Component } from "react";
import BaseCakeForm from "./../forms/BaseCakeForm";
import { connect } from "react-redux";

class BaseCakesNew extends Component {
    onBaseCakeFormSubmit = (baseCakes) => {
        this.setState({ baseCakes });
    }
    render() {
        return (
            <>
                <h2>Create A New Base Cake Recipe</h2>
                <div className="clear"></div>
                <BaseCakeForm onBaseCakeFormSubmit={this.onBaseCakeFormSubmit} />
            </>
        );
    }
}

export default connect(null)(BaseCakesNew);