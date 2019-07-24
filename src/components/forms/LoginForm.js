import React, { Component } from "react";
import LocalAPI from "./../../apis/local";
import { setAuthToken } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class LoginForm extends Component {
    state = { 
        email: "", 
        password: "",
        notValid: false
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        const { email, password } = this.state;

        LocalAPI.post(`/auth/login`, { email, password})
            .then(response => {
                this.props.setAuthToken(response.data.token);
                this.props.history.push("/");
            })
            .catch(error => this.setState({notValid: true}));
    }

    onInputChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    }

    render() {
        const { email, password, notValid } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}> 
                <div className="ui placeholder segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                        <div className="ui form">
                            <div className="field">
                            <label htmlFor="email">Email</label>
                            <div className="ui left icon input">
                                <input type="email" value={email} onChange={(event) => this.onInputChange("email", event)} />
                                <i className="user icon"></i>
                            </div>
                            </div>
                            <div className="field">
                            <label htmlFor="password">Password</label>
                            <div className="ui left icon input">
                                <input type="password" value={password} onChange={(event) => this.onInputChange("password", event)} />
                                <i className="lock icon"></i>
                            </div>
                            </div>
                            {notValid ? <div>Email or password in incorrect, please try again</div> : <div></div>}
                            <input className="ui inverted pink submit button" type="submit" value="Login" />
                        </div>
                        </div>
                        <div className="middle aligned column">
                            <p>Need to create an account?</p>
                            <Link to="/register">
                                <button className="ui inverted pink submit button">Register</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(null, { setAuthToken })(LoginForm);