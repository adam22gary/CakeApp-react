import React, { Component } from "react";
import LoginForm from "./../forms/LoginForm";

class LoginPage extends Component {
    render() {
        return(
            <div>
                <h1 className="hometitle">Cake Calculator</h1>
                <h2>Login</h2>
                <LoginForm {...this.props} />
            </div>
        );
    }
}

export default LoginPage;