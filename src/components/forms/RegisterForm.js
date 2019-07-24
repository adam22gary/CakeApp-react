import React, {Component} from "react";
import LocalAPI from "./../../apis/local";
import { setAuthToken } from "./../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class RegisterForm extends Component {
    state = { 
        email: "", 
        password: "" 
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        
        const { email, password } = this.state;

        LocalAPI.post(`/auth/register`, { email, password})
            .then(response => {
                this.props.setAuthToken(response.data.token);
                this.props.history.push("/");
            })
            .catch(error => console.log(error));
    }

    onInputChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    }

    render() {
        const { email, password } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}> 
                <div className="ui placeholder segment">
                    <div className="ui two column very relaxed stackable grid">
                        <div className="column">
                        <div className="ui form">
                            <div className="field">
                            <label htmlFor="email">Email</label>
                            <div className="ui left icon input">
                                <input type="email" value={email} required onChange={(event) => this.onInputChange("email", event)} />
                                <i className="user icon"></i>
                            </div>
                            </div>
                            <div className="field">
                            <label htmlFor="password">Password</label>
                            <div className="ui left icon input">
                                <input type="password" value={password} required onChange={(event) => this.onInputChange("password", event)} />
                                <i className="lock icon"></i>
                            </div>
                            </div>
                            <input className="ui inverted pink submit button" type="submit" value="Register" />
                        </div>
                        </div>
                        <div className="middle aligned column">
                            <p style={{textAlign: "center"}}>Already have an account?</p>
                            <Link to="/login">
                                <button className="ui inverted pink submit button">Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(null, { setAuthToken })(RegisterForm);