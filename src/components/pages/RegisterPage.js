import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        return(
            <div>
                <h1 className="hometitle">Cake Calculator</h1>
                <h2>Register</h2>
                <RegisterForm {...this.props} />
            </div>
        );
    }
}

export default RegisterPage;