import React, {Component} from "react";
import { createBaseCake } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Input from "./fields/Input";

class BaseCakeForm extends Component {
    onFormSubmit = async (formValues) => {
        console.log("form on submit");
        const { recipe_name, recipe_makes_number, description, method, ingredients_array } = formValues;
        await this.props.createBaseCake(recipe_name, recipe_makes_number, description, method, ingredients_array);
        this.props.reset();
    }

    render() {
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Name of recipe</label>
                    <Field
                        name="recipe_name"
                        component={Input}
                        type="text"
                    />
                    <label>How many does this recipe make</label>
                    <Field
                        name="recipe_makes_number"
                        component={Input}
                        type="text"
                    />
                    <label>Description</label>
                    <Field
                        name="description"
                        component={Input}
                        type="text"
                    />
                    <label>Method</label>
                    <Field
                        name="method"
                        component={Input}
                        type="text"
                    />
                    <label>All the ingredients</label>
                    <Field
                        name="ingredients_array"
                        component={Input}
                        type="text"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

const WrappedBaseCakeForm = reduxForm({
    form: "baseCake",
    validate: (formValues) => {
        const errors = {};

        if(!formValues.recipe_name) {
            errors.recipe_name = "Recipe name is required";
        }

        if(!formValues.recipe_makes_number) {
            errors.recipe_makes_number = "Number of people is required";
        }

        if(!formValues.description) {
            errors.description= "Description is required";
        }

        if(!formValues.method) {
            errors.method= "Method is required";
        }

        if(!formValues.ingredients_array) {
            errors.ingredients_array= "Ingredients list is required";
        }

        return errors;
    }
})(BaseCakeForm);

export default connect(null, { createBaseCake })(WrappedBaseCakeForm);