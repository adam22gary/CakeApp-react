import React, {Component} from "react";
import { createIngredient } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Input from "./fields/Input";

class IngredientForm extends Component {
    onFormSubmit = async (formValues) => {
        const { ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price } = formValues;
        await this.props.createIngredient(ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price);
        this.props.reset();
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Name of Ingredient</label>
                    <Field
                        name="ingredients_name"
                        component={Input}
                        type="text"
                    />
                    <label>Quantity</label>
                    <Field
                        name="ingredients_quantity"
                        component={Input}
                        type="text"
                    />
                    <label>Measurement give a drop down list!!!</label>
                    <Field
                        name="ingredients_measurement"
                        component={Input}
                        type="text"
                    />
                    <label>Price</label>
                    <Field
                        name="ingredients_price"
                        component={Input}
                        type="text"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

const WrappedIngredientForm = reduxForm({
    form: "ingredient",
    validate: (formValues) => {
        const errors = {};

        if(!formValues.ingredients_name) {
            errors.ingredients_name = "Name is required";
        }

        if(!formValues.ingredients_quantity) {
            errors.ingredients_quantity = "Quantity is required";
        }

        if(!formValues.ingredients_measurement) {
            errors.ingredients_measurement = "Measurement is required";
        }

        if(!formValues.ingredients_price) {
            errors.ingredients_price = "Price is required";
        }

        return errors;
    }
})(IngredientForm);

export default connect(null, { createIngredient })(WrappedIngredientForm);