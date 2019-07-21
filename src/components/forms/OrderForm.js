import React, {Component} from "react";
import { createOrder, fetchShowBaseCakes } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import { isAfter } from 'date-fns';

//validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);

// object for ingredients
const obj = {};

class OrderForm extends Component {
    state = {
        ingredients_array: [],
        order_status: "current"
    }

    onFormSubmit = async (formValues) => {
        const { date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status } = formValues;
        await this.props.createOrder(date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status);
        this.props.reset();
        //clear value after submit
        this.props.dispatch(change('order', 'ingredients_array', []));
    }

    calculate = (event, id) => {
        //clear value first
        this.props.dispatch(change('order', 'ingredients_array', []));
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

    render() {
        const { handleSubmit, baseCakes } = this.props;
        console.log(baseCakes);

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Customer Name</label>
                     <Field
                        name="customer_name"
                        component={Input}
                        type="text"
                        validate={required}
                    />
                    <label>No. of People</label>
                    <Field
                        name="total_people"
                        component={Input}
                        type="number"
                        validate={[ required, number, minValue1 ]}
                    />
                    <label>Due Date</label>
                    <Field
                        name="due_date"
                        component={Input}
                        type="date"
                    />
                    <label>Description</label>
                    <Field
                        name="description"
                        component={Input}
                        type="text"
                    />
                    <label>Total Price</label>
                    <Field
                        name="total_price"
                        component={Input}
                        type="number"
                    />
                </div>
                <input type="submit" value="Create" />
            </form>
        );
    }
}

const WrappedOrderForm = reduxForm({
    form: "order",
    //omg so important
    enableReinitialize: true,
    validate: (formValues) => {
        console.log(formValues)
        const errors = {};

        if(!formValues.recipe_name) {
            errors.customer_name = "Customer name is required";
        }

        if(!formValues.total_people) {
            errors.total_people = "Number of people is required";
        }

        if(!formValues.due_date) {
            errors.due_date = "Date is required";
        }

        console.log(">>>>>>>>", new Date(), new Date(formValues.due_date), isAfter(new Date(), new Date(formValues.due_date)));

        if(isAfter(new Date(), new Date(formValues.due_date))) {
            errors.due_date = "Must be after today.";
        }

        return errors;
    }
})(OrderForm);

const selector = formValueSelector('order');

const mapStateToProps = (state) => {
    const formMapping = {};

    state.ingredients.forEach((item) => {
        formMapping[item._id] = selector(state, item._id);
    });
    
    return {
        orders: state.orders,
        baseCakes: state.baseCakes,
        ...formMapping
    }
}

export default connect(mapStateToProps, { createOrder, fetchShowBaseCakes })(WrappedOrderForm);