import React, {Component} from "react";
import { createBaseCake, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";

//validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);
const minValue5 = minValue(5);

// object for ingredients
const obj = {};

class BaseCakeForm extends Component {
    state = {
        ingredients_array: []
    }

    onFormSubmit = async (formValues) => {
        const { recipe_name, total_people, description, ingredients_array } = formValues;
        await this.props.createBaseCake(recipe_name, total_people, description, ingredients_array);
        this.props.reset();
        //clear value after submit
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
    }

    calculate = (event, id) => {
        //clear value first
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
        const getValue = event.target.value;

        if(getValue === "" || getValue < 0.5){
            delete obj[id];
        }else{

            obj[id]= getValue;        
                
        }
        //for testing display only
        document.getElementById("forDisplay").innerHTML = obj[0]; 
        //update state
        this.setState({ingredients_array: obj});
        //add value to field
        this.props.dispatch(change('baseCake', 'ingredients_array', this.state.ingredients_array));
    }

    componentDidMount() {
        this.props.fetchIngredients();
    }

    render() {
        const { handleSubmit, ingredients } = this.props;

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
                        name="total_people"
                        component={Input}
                        type="number"
                        validate={[ required, number, minValue5 ]}
                    />
                    <label>Description add textarea</label>
                    <Field
                        name="description"
                        component={Input}
                        type="text"
                    />
                    <label>Please select the ingredients</label>
                    <ul>
                        {ingredients.map((item, index) => {
                            return (
                                <li key={item._id}>
                                    <label htmlFor={item._id}>{item.ingredients_name}</label>
                                    <Field
                                        name={item._id}
                                        component={Input}
                                        type="number"
                                        onChange={(event) => this.calculate(event,item._id)}
                                        validate={[ minValue1 ]}
                                    />{item.ingredients_measurement}
                                    <div id={item._id}>${(this.props[item._id] * item.ingredients_price) > 0 ? (this.props[item._id] * item.ingredients_price) : 0}</div>
                                </li>
                            );
                        })}
                    </ul>
                    <span id="forDisplay"></span>
                    <Field
                        name="ingredients_array"
                        id="ingredients_array"
                        component={"input"}
                        type="hidden"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

const WrappedBaseCakeForm = reduxForm({
    form: "baseCake",
    //omg so important
    enableReinitialize: true,
    validate: (formValues) => {
        const errors = {};

        if(!formValues.recipe_name) {
            errors.recipe_name = "Recipe name is required";
        }

        if(!formValues.total_people) {
            errors.total_people = "Number of people is required";
        }

        if(!formValues.description) {
            errors.description= "Description is required";
        }

        return errors;
    }
})(BaseCakeForm);

const selector = formValueSelector('baseCake');

const mapStateToProps = (state) => {
    const formMapping = {};

    state.ingredients.forEach((item) => {
        formMapping[item._id] = selector(state, item._id);
    });
    
    return {
        ingredients: state.ingredients,
        ...formMapping
    }
}

export default connect(mapStateToProps, { createBaseCake, fetchIngredients })(WrappedBaseCakeForm);