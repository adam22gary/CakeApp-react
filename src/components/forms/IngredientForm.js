import React, {Component} from "react";
import { createIngredient } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Input from "./fields/Input";
import { Link } from "react-router-dom";

//validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);

class IngredientForm extends Component {
    onFormSubmit = async (formValues) => {
        const { ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price } = formValues;
        await this.props.createIngredient(ingredients_name, ingredients_quantity, ingredients_measurement, ingredients_price);
        this.props.reset();
    }
    
    render() {
        const { handleSubmit } = this.props;

        return(
            <div className="formclass">
                <form className="ui form" onSubmit={handleSubmit(this.onFormSubmit)}>
                    <div>
                        <label><strong>Ingredient Name</strong></label>
                        <Field
                            name="ingredients_name"
                            component={Input}
                            type="text"
                        />
                        <label><strong>Quantity</strong></label>
                        <Field
                            name="ingredients_quantity"
                            component={Input}
                            type="number"
                            validate={[required, number, minValue1]}
                        />
                        <label><strong>Measurement</strong></label>
                        <Field
                            name="ingredients_measurement"
                            component="select"
                            required>
                            <option value="" disabled>Choose measurement</option>
                            <option value="piece">piece</option>
                            <option value="dozen">dozen</option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="mL">mL</option>
                            <option value="L">L</option>
                        </Field>
                        <label><strong>Price</strong></label>
                        <Field
                            name="ingredients_price"
                            component={Input}
                            type="number"
                            validate={[required, number, minValue1]}
                        />
                    </div>
                    <div className="ui clear"></div>
                    {/* <input type="submit" value="Create" /> */}
                    <Link to="/ingredients">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <button className="ui green button" type="submit">Create</button>
                    <div className="ui clear"></div>
                </form>
            </div>

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