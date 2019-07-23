import React, {Component} from "react";
import { createBaseCake, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import history from "./../../history";
import { Link } from "react-router-dom";

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
        ingredients_array: {}
    }

    onFormSubmit = async (formValues) => {
        const { recipe_name, total_people, description } = formValues;
        await this.props.createBaseCake(recipe_name, total_people, description, this.state.ingredients_array);
        //push history
        history.push("/basecakes");
    }

    calculate = (event, id, name, measurement, price) => {
        //clear value first
        this.props.dispatch(change('baseCake', 'ingredients_array', []));
        const getValue = event.target.value;
        const new_price = getValue * price;

        if(getValue === "" || getValue < 0.5){
            delete obj[id];
        }else{

            obj[id]= [getValue, name, measurement, new_price];        
                
        }
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
            <div className="formclass">
                <form className="ui form" onSubmit={handleSubmit(this.onFormSubmit)}>
                    <div>
                        <label><strong>Recipe Name</strong></label>
                        <Field
                            name="recipe_name"
                            component={Input}
                            type="text"
                        />
                        <label><strong>Number of People</strong></label>
                        <Field
                            name="total_people"
                            component={Input}
                            type="number"
                            validate={[required, number, minValue5]}
                        />
                        <label><strong>Description</strong></label>
                        <Field
                            name="description"
                            component={Input}
                            type="text"
                        />
                        <label style={{ fontSize: "22px" }}><strong>Please select the ingredients</strong></label>
                        <div className="clear"></div>
                        <table className="ulclass">
                            <tbody>       
                                {ingredients.map((item, index) => {
                                    return (
                                            <tr key={item._id}>
                                                <td style={{ color: "blue" }}>{item.ingredients_name}</td>
                                                <td className="fields" style={{ width: "70px", margin: "0 20px 0 20px" }}>
                                                    <Field
                                                        name={item._id}
                                                        component={Input}
                                                        type="number"
                                                        onChange={(event) => this.calculate(event, item._id, item.ingredients_name, item.ingredients_measurement, item.ingredients_price)}
                                                        validate={[ minValue1 ]}
                                                    />
                                                </td>
                                                <td style={{ color: "blue" }}>{item.ingredients_measurement}</td>
                                                <td style={{ color: "blue" }}> <span id={item._id} style={{margin: "0 30px 0 30px" }}> ${(this.props[item._id] * item.ingredients_price) > 0 ? (this.props[item._id] * item.ingredients_price).toFixed(2) : 0}</span></td>

                                            </tr>
                                    )
                                })}
                            
​                           </tbody>
                        </table>
​
                        <Field
                           name="ingredients_array"
                           id="ingredients_array"
                           component={"input"}
                           type="hidden"
                        />
                    </div>
                    <Link to="/basecakes">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <button className="ui green button" type="submit">Create</button>
                </form>
                <div className="clear"></div>
            </div>
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