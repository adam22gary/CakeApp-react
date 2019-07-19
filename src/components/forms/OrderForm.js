import React, {Component} from "react";
import { createOrder } from "../../actions";
import { connect } from "react-redux";
import { Field, reduxForm, change, formValueSelector } from "redux-form";
import Input from "./fields/Input";

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
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                    <label>Customer Name</label>
                     <Field
                        name="customer_name"
                        component={Input}
                        type="text"
                    />
                    <label>Cake Name</label>
                    <Field
                        name="recipe_name"
                        component={Input}
                        type="text"
                        validate={[required]}
                    />
                    <label>No. of People</label>
                    <Field
                        name="total_people"
                        component={Input}
                        type="number"
                        validate={[ required, number, minValue1 ]}
                    />
                    <label>List of Ingredients</label>
                    <Field
                        name="ingredients_array"
                        component={Input}
                        type="text"
                    />
                    <label>Due Date</label>
                    <Field
                        name="date"
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
        const errors = {};

        if(!formValues.recipe_name) {
            errors.recipe_name = "Recipe name is required";
        }

        if(!formValues.total_people) {
            errors.total_people = "Number of people is required";
        }

        if(!formValues.date) {
            errors.description= "Date is required";
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
        ...formMapping
    }
}

export default connect(mapStateToProps, { createOrder })(WrappedOrderForm);



// import React, { Component } from "react";
// import { createOrder } from "../../actions";
// import { connect } from "react-redux";
// import { Field, reduxForm } from "redux-form";
// import Input from "./fields/Input";

// const required = value => value ? undefined : 'Required';
// const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
// const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
// const minValue1 = minValue(0.5);

// class OrderForm extends Component {
//     onFormSubmit = async (formValues) => {
//         const { date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status } = formValues;
//         await this.props.createOrder(date, customer_name, recipe_name, total_people, ingredients_array, description, total_price, order_status);
//         this.props.reset();
//     }

//     render() {
//         return (
//             <form onSubmit={this.onFormSubmit}>
//                  <div>
//                     <label>Customer Name</label>
//                     <Field
//                         name="customer_name"
//                         component={Input}
//                         type="text"
//                     />
//                     <label>Cake Name</label>
//                     <Field
//                         name="recipe_name"
//                         component={Input}
//                         type="text"
//                         validate={[required]}
//                     />
//                     <label>No. of People</label>
//                     <Field
//                         name="total_people"
//                         component={Input}
//                         type="number"
//                         validate={[ required, number, minValue1 ]}
//                     />
//                     <label>List of Ingredients</label>
//                     <Field
//                         name="ingredients_array"
//                         component={Input}
//                         type="text"
//                     />
//                     <label>Due Date</label>
//                     <Field
//                         name="date"
//                         component={Input}
//                         type="date"
//                     />
//                     <label>Description</label>
//                     <Field
//                         name="description"
//                         component={Input}
//                         type="text"
//                     />
//                     <label>Total Price</label>
//                     <Field
//                         name="total_price"
//                         component={Input}
//                         type="number"
//                     />
//                 </div>
//                 <input type="submit" value="Create Order" />
//             </form>
//         );
//     }
// }

// const WrappedOrderForm = reduxForm({
//     form: "order",
//     validate: (formValues) => {
//         const errors = {};

//         if(!formValues.customer_name) {
//             errors.customer_name = "Name is required";
//         }

//         if(!formValues.total_people) {
//             errors.total_people = "Number of people is required";
//         }

//         if(!formValues.recipe_name) {
//             errors.recipe_name = "Base Cake is required";
//         }

//         return errors;
//     }
// })(OrderForm);

// export default connect(null, { createOrder })(WrappedOrderForm);