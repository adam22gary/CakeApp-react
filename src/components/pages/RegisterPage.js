import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        return(
            <div className="ui vertical stripe segment">
                <h4 className="ui horizontal header divider">
                    <span>Cake Calculator</span>
                </h4>
                <div className="loginpg">
                    <h3>Register</h3>
                    <RegisterForm {...this.props} />
                </div>
            </div>
        );
    }
}

export default RegisterPage;