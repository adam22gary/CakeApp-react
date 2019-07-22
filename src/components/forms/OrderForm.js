import React, { Component } from "react";
import { createOrder, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import history from "./../../history";
import { isAfter } from 'date-fns'


//Form validation
const required = value => value ? undefined : 'Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
const minValue1 = minValue(0.5);


class OrderForm extends Component {
    state = {
        recipe_name: null,
        ingredients_array: {},
        total_people: null,
        description: null
    }

    onFormSubmit = async (formValues) => {
        const { due_date, customer_name, total_people_new, order_description, total_price } = formValues;
        await this.props.createOrder(
            due_date, 
            customer_name, 
            total_people_new, 
            order_description, 
            String(this.state.recipe_name), 
            this.state.ingredients_array, 
            String(this.state.total_people), 
            String(this.state.description), 
            parseInt(total_price)
        );
        //push history
        history.push("/orders");
    }

    componentDidMount() {
        this.props.fetchIngredients();
        //this is from ordersNew
        const { ordersNew } = this.props;
        if (ordersNew && ordersNew.length > 0) {
            this.setState({
                recipe_name: ordersNew[0].recipe_name,
                total_people: ordersNew[0].total_people,
                description: ordersNew[0].description,
                ingredients_array: ordersNew[0].ingredients_array           
            });
        }
    }

    render() {
        console.log(this.state);
            console.log("ffffffffffffffffffffff");
        const { handleSubmit, ordersNew } = this.props;

        return(<>
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                
                <div>
                    <label>Customer Name</label>
                     <Field
                        name="customer_name"
                        component={Input}
                        type="text"
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
                        name="due_date"
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
                </div>
                <input type="submit" value="Create Order" />
            </form>
            <div>{ordersNew.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <ul>
                                {Object.keys(item.ingredients_array).map((theKey, index) => {
                                    return (
                                        <li key={theKey}>
                                            {item.ingredients_array[theKey][0]} {item.ingredients_array[theKey][1]} {item.ingredients_array[theKey][2]} ${item.ingredients_array[theKey][3]}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
            </>
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

        if(!formValues.customer_name) {
            errors.customer_name = "Customer name is required";
        }

        if(!formValues.total_people_new) {
            errors.total_people = "Number of people is required";
        }

        if(!formValues.due_date) {
            errors.due_date = "Date is required";
        }

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
        ingredients: state.ingredients,
        ...formMapping
    }
}

export default connect(mapStateToProps, { createOrder, fetchIngredients })(WrappedOrderForm);