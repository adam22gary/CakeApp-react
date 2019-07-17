import React, { Component } from "react";
import BaseCakeEditForm from "./../forms/BaseCakeEditForm";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteBaseCake, fetchEditBaseCakes } from "../../actions";

class BaseCakesEdit extends Component {
    onDeleteItem = async (id) => {
        await this.props.deleteBaseCake(id);
    }

    onBaseCakeFormSubmit = (editBaseCakes) => {
        this.setState({ editBaseCakes });
    }

    componentDidMount() {
        this.props.fetchEditBaseCakes(this.props.match.params.id);
    }
    
    render() {
        const { editBaseCakes, editAddIngredientsBaseCakes } = this.props;
        //add ingredients to state by each ObjectID then change editBaseCakes.ingredients_array back to the original JSON string
        if (editBaseCakes && Object.keys(editBaseCakes).length > 0) {
           // const iii = JSON.parse(editBaseCakes.ingredients_array);
            for(let item in editBaseCakes.ingredients_array){
                editBaseCakes[item] = editBaseCakes.ingredients_array[item];
            }
            //editBaseCakes["ingredients_array"] = editBaseCakes.ingredients_array;
        }

        return (
            <>
                <h2>Edit a current BaseCake Recipe</h2>
                {editAddIngredientsBaseCakes.length === 0 ? null : <BaseCakeEditForm onBaseCakeFormSubmit={this.onBaseCakeFormSubmit} editAddIngredientsBaseCakes={editAddIngredientsBaseCakes} initialValues={editBaseCakes} />}
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        editBaseCakes: state.editBaseCakes,
        editAddIngredientsBaseCakes: state.editBaseCakes
    }
}

export default connect(mapStateToProps, { deleteBaseCake, fetchEditBaseCakes })(BaseCakesEdit);