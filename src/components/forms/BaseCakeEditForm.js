import React, {Component} from "react";
//import {  } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import Input from "./fields/Input";

//validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);
const minValue5 = minValue(5);

// array for ingredients
const arr = [];

class BaseCakeEditForm extends Component {
    state = {
        ingredients_array: []
    }

    onFormSubmit = async (formValues,id) => {
        const { recipe_name, total_people, description, ingredients_array } = formValues;
        //change
        await this.props.updateBaseCake(recipe_name, total_people, description, ingredients_array, id);
        this.props.reset();
        //clear value after submit
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
    }

    calculate = async (id, price) => {
        //clear value first
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
        
        const getValue = await document.getElementsByName(id);

        // checks within a two dimensional array
        function exists(arr, val) {
            return arr.some(row => row.includes(val));
        }

        if(getValue[0].value === "" || getValue[0].value < 0.5){
            document.getElementById(id).innerHTML = "";

            if(arr.length > 0){
                for( let i = 0; i < arr.length; i++){
                    if ( arr[i][0] === id) {
                      arr.splice(i, 1);
                    }
                }
            }
        }else{
            document.getElementById(id).innerHTML = "$" + (parseFloat(getValue[0].value) * parseFloat(price)).toFixed(2);
            //delete current
            for( let i = 0; i < arr.length; i++){
                if ( arr[i][0] === id) {
                    arr.splice(i, 1);
                }
            }
            if(exists(arr, id) === false){
                //replace with new value
                arr.push([id, getValue[0].value]);
            }
        }
        //convert to json string
        const arrValue = JSON.stringify(arr);
        //for testing display only
        document.getElementById("forDisplay").innerHTML = arrValue; 
        //update state
        this.setState({ingredients_array: arrValue});
        //add value to field
        this.props.dispatch(change('baseCake', 'ingredients_array', this.state.ingredients_array));
    }

    render() {
        const { handleSubmit, ingredients, subBaseCakes } = this.props;
        //const yy = subBaseCakes.ingredients_array.split("[]");
        //console.log(yy);
        return(
            //need to send id
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Name of recipe</label>
                    <Field
                        name="recipe_name"
                        component={Input}
                        type="text"
                        //value={baseCakes.recipe_name}
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
                                    {item.id}
                                    {/* //<input type="text" name={item._id} value="" /> */}
                                    <Field
                                        name={item._id}
                                        component={Input}
                                        type="number"
                                        onChange={() => this.calculate(item._id, item.ingredients_price)}
                                        validate={[ minValue1 ]}
                                    />{item.ingredients_measurement}
                                    <div id={item._id}>$</div>
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
})(BaseCakeEditForm);

export default connect(null)(WrappedBaseCakeForm);