import React, { Component } from "react";
import BaseCakeEditForm from "./../forms/BaseCakeEditForm";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBaseCake, fetchEditBaseCakes, fetchIngredients } from "../../actions";

class BaseCakesEdit extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }

    onBaseCakeFormSubmit = (editBaseCakes) => {
        this.setState({ editBaseCakes });
    }

    componentDidMount() {
        this.props.fetchIngredients();
        this.props.fetchEditBaseCakes(this.props.match.params.id);
    }

    render() {
        const { editBaseCakes, ingredients } = this.props;
        return (
            <>
                <h2>Edit a current BaseCake Recipe</h2>
                <BaseCakeEditForm onBaseCakeFormSubmit={this.onBaseCakeFormSubmit} ingredients={ingredients} initialValues={editBaseCakes} />
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        editBaseCakes: state.editBaseCakes
    }
}

export default connect(mapStateToProps, { deleteBaseCake, fetchEditBaseCakes, fetchIngredients })(BaseCakesEdit);