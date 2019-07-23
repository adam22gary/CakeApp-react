import React, { Component } from "react";
import { createOrder, fetchIngredients } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Input from "./fields/Input";
import history from "./../../history";
import { Link } from "react-router-dom";

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
        this.setState({total_price: (total_price  * (500 / 100)).toFixed(2)});
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
        <div className="ui piled segment" style={{ backgroundColor: "#ffddf4", marginLeft: "30px", marginRight: "200px" }}>
            <div className="formclass">
                <form className="ui form" onSubmit={handleSubmit(this.onFormSubmit)}>
                    <div>
                        <label><strong>Customer Name</strong></label>
                        <Field
                            name="customer_name"
                            component={"input"}
                            type="text"
                        />
                        <label><strong>Number of People</strong></label>
                        <Field
                            name="total_people_new"
                            component={Input}
                            type="number"
                            onChange={(event) => this.calculateTotal(event)}
                            validate={[ required, number, minValue5 ]}
                        />
                        <label><strong>Due Date</strong></label>
                        <Field
                            name="due_date"
                            component={Input}
                            type="date"
                        />
                        <label><strong>Description</strong></label>
                        <Field
                            name="order_description"
                            component={Input}
                            type="text"
                        />
                        <label style={{ fontSize: "22px" }}><strong>Please select the ingredients</strong></label>
                        <table className="ui table" cellpadding="10">
                            {ordersNew.map((item, index) => {
                                return (
                                    <tbody key={item._id}>
                                        <tr>
                                            <th>Quantity</th>
                                            <th>Description</th>
                                            <th>Measurement</th>
                                            <th>Price</th>
                                        </tr>
                                            {Object.keys(item.ingredients_array).map((theKey, index) => {
                                                return (
                                                    <tr key={theKey}>
                                                        <td>{((parseInt(item.ingredients_array[theKey][0]) / total_people) * total_people_new).toFixed(2)}</td>
                                                        <td>{item.ingredients_array[theKey][1]}</td>
                                                        <td>{item.ingredients_array[theKey][2]}</td>
                                                        <td>${((parseFloat(item.ingredients_array[theKey][3]) / total_people) * total_people_new).toFixed(2)}</td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                );
                            })}   
                        </table> 
                        <h2>Base cake information:</h2>
                        <table className="ui table" cellpadding="10">
                            <tbody>
                                <tr><td>Base cake total food cost: ${(parseFloat(total_price) * parseFloat(total_people)).toFixed(2)}</td></tr>
                                <tr><td>Base cake total people: {total_people}</td></tr>
                            </tbody>

                        </table>
                        <h2>Order Costing:</h2>
                        <table className="ui table" cellpadding="10">
                            {ordersNew.map((item, index) => {
                                return (
                                    <tbody key={item._id}>
                                        <tr><td>Total food cost: ${(parseFloat(total_price) / 5).toFixed(2)}</td></tr>
                                        <tr><td>Profit margin: 500%</td></tr>
                                        <tr><td>Total quote price: ${total_price}</td></tr>
                                    </tbody>
                                );
                            })}
                        </table>
                        <div className="antonella_padding"></div>
                    </div>
                    <Link to="/orders">
                        <span className="ui yellow button">Back</span>
                    </Link>
                    <button className="ui green button" type="submit">Create</button>
                </form>
                <div className="clear"></div>
            </div>
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