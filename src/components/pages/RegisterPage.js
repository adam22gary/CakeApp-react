import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        return(
            <div>
                <h1 className="hometitle">Cake Calculator</h1>
                <div className="loginpg">
                    <h3>Register</h3>
                    <RegisterForm {...this.props} />
                </div>
            </div>
        );
    }
}

export default RegisterPage;