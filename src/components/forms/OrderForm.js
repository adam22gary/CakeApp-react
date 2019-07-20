import React, { Component } from "react";
import { createOrder, fetchBaseCakes } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";

//Form validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);
const minValue5 = minValue(5);

class OrderForm extends Component {

    onFormSubmit = async (formValues) => {
        const { date, customer_name, total_people_new, order_description, recipe_name, ingredients_array, total_people, description, total_price } = formValues;
        await this.props.createOrder(date, customer_name, total_people_new, order_description, recipe_name, ingredients_array, total_people, description, total_price);
        this.props.reset();
        //clear value after submit
        this.props.dispatch(change("order", "ingredients_array", []));
    }

    componentDidMount() {
        // this.props.fetchBaseCakes(this.props.match.params.id);

    }

    render() {
        const { handleSubmit } = this.props;

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
                        name="total_people_new"
                        component={Input}
                        type="number"
                        validate={[ required, number, minValue1 ]}
                    />
                    <label>Due Date</label>
                    <Field
                        name="date"
                        component={Input}
                        type="date"
                    />
                    <label>Description</label>
                    <Field
                        name="order_description"
                        component={Input}
                        type="text"
                    />
                    <label>Total Price</label>
                    <Field
                        name="total_price"
                        component={Input}
                        type="number"
                    />
                    <Field
                        name="recipe_name"
                        component={Input}
                        type="hidden"
                    />
                    <Field
                        name="ingredients_array"
                        component={Input}
                        type="hidden"
                    />
                    <Field
                        name="description"
                        component={Input}
                        type="hidden"
                    />
                    <Field
                        name="total_people"
                        component={Input}
                        type="hidden"
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
        const errors = {};
        let d = new Date();

        if(!formValues.customer_name) {
            errors.customer_name = "Customer name is required";
        }

        if(!formValues.total_people_new) {
            errors.total_people = "Number of people is required";
        }

        if(!formValues.date) {
            errors.date = "Date is required";
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
        baseCake: state.baseCake,
        ...formMapping
    }
}

export default connect(mapStateToProps, { createOrder, fetchBaseCakes })(WrappedOrderForm);