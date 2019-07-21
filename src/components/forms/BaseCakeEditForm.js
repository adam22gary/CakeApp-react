import React, {Component} from "react";
import { updateBaseCake, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import history from "./../../history";

//validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);
const minValue5 = minValue(5);

// array for ingredients
const obj = {};

class BaseCakeEditForm extends Component {
    state = {
        ingredients_array: {}
    }

    onFormSubmit = async (formValues) => {
        const { recipe_name, total_people, description } = formValues;
        //change
        await this.props.updateBaseCake(recipe_name, total_people, description, this.state.ingredients_array, this.props.editAddIngredientsBaseCakes._id);
        history.push("/baseCakes");
    }

    calculate = (event, id, name, measurement, price) => {
        //clear value first
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
        const getValue = event.target.value;

        if(getValue === "" || getValue < 0.5){
            delete obj[id];
        }else{
            obj[id]= [getValue, name, measurement, price];               
        }
        //for testing display only
        document.getElementById("forDisplay").innerHTML = obj[0]; 
        //update state
        this.setState({ingredients_array: obj});
    }

    componentDidMount() {
        this.props.fetchIngredients();
        const { editAddIngredientsBaseCakes } = this.props;
        //add ingredients to the obj object in calculate onload 
        if (editAddIngredientsBaseCakes && Object.keys(editAddIngredientsBaseCakes).length > 0) {
            //const iii = JSON.parse(editAddIngredientsBaseCakes.ingredients_array);
            for(let item in editAddIngredientsBaseCakes.ingredients_array){
                // insert the whole array
                obj[item] = editAddIngredientsBaseCakes.ingredients_array[item];
            }
          
            this.setState({ingredients_array:  obj});
        }
    }

    render() {
        // console.log(this.state.ingredients_array);
        const { handleSubmit, ingredients } = this.props;
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
                                    <Field
                                        name={item._id}
                                        component={Input}
                                        type="number"
                                        onChange={(event) => this.calculate(event,item._id, item.ingredients_name, item.ingredients_measurement, item.ingredients_price)}
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
                <input type="submit" value="Edit" />
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

export default connect(mapStateToProps, {updateBaseCake, fetchIngredients})(WrappedBaseCakeForm);