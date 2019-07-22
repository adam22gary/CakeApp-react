import React, { Component } from "react";
import { createOrder, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import history from "./../../history";

class OrderForm extends Component {
    state = {
        recipe_name: null,
        ingredients_array: {},
        total_people: null,
        description: null,
        total_people_new: 0.0,
        total_price: 0.0
    }

    onFormSubmit = async (formValues) => {
        const { due_date, customer_name, total_people_new, order_description } = formValues;
        await this.props.createOrder(due_date, customer_name, total_people_new, order_description, String(this.state.recipe_name), this.state.ingredients_array, String(this.state.total_people), String(this.state.description), parseFloat(this.state.total_price));
        //push history
        history.push("/orders/showAll");
    }

    calculateTotal = (event) => {
        //clear value first
        const getValue = event.target.value;
        //update state
        this.setState({total_people_new: getValue}, this.getTotalPrice);
    }

    getTotalPrice = () => {
        const { ordersNew } = this.props;
        const { total_people_new, total_people } = this.state;
        let total_price = 0;
        ordersNew.map((item, index) => {
          Object.keys(item.ingredients_array).map((theKey, index) => {
                total_price += (((parseFloat(item.ingredients_array[theKey][3]) / total_people) * total_people_new))
          })
        })
        this.setState({total_price: (total_price  * (1000 / 100)).toFixed(2)});
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
            }, this.getTotalPrice);
        } else {
            this.getTotalPrice();
        }
    }

    render() {
        //Form validation
        const required = value => value ? undefined : 'Required';
        const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
        const minValue = min => value =>
            value && value < min ? `Must be at least ${min}` : undefined;

        // this validation gets the number of people that she create for the basecake :-)
        const minValue5 = minValue(parseInt(this.state.total_people));

        const { handleSubmit, ordersNew } = this.props;
        const { total_people_new, total_people } = this.state;
        let { total_price } = this.state;

        return(<>
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                
                <div>
                    <label>Customer Name</label>
                     <Field
                        name="customer_name"
                        component={"input"}
                        type="text"
                    />
                    <label>No. of People</label>
                    <Field
                        name="total_people_new"
                        component={Input}
                        type="number"
                        onChange={(event) => this.calculateTotal(event)}
                        validate={[ required, number, minValue5 ]}
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
                </div>
                <input type="submit" value="Create" />
            </form>
            <div>{ordersNew.map((item, index) => {
                    return (
                        <div key={item._id}>
                            <ul>
                                {Object.keys(item.ingredients_array).map((theKey, index) => {
                                    return (
                                        <li key={theKey}>
                                           { ((parseInt(item.ingredients_array[theKey][0]) / total_people) * total_people_new).toFixed(2)} {item.ingredients_array[theKey][2]} {item.ingredients_array[theKey][1]}  ${((parseFloat(item.ingredients_array[theKey][3]) / total_people) * total_people_new).toFixed(2)}
                                        </li>
                                    );
                                })}
                            </ul>
                            <div>Total base people: {total_people}</div>


                            <div>Total base people: {total_people_new}</div>
                            {/* need to update state here */}
                            <div>Total cost price: {(parseFloat(total_price) / 10).toFixed(2)}</div>
                            <div>Total order price: <span>{total_price}</span></div>
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

        if(!formValues.order_description) {
            errors.order_description = "Description le is required";
        }
        
        return errors;
    }
})(OrderForm);

export default connect(null, { createOrder, fetchIngredients })(WrappedOrderForm);