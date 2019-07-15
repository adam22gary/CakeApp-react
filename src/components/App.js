import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import BaseCakesPage from "./pages/BaseCakesPage";
import BaseCakesShow from "./pages/BaseCakesShow";
import BaseCakesNew from "./pages/BaseCakesNew";
import BaseCakesEdit from "./pages/BaseCakesEdit";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientsNew from "./pages/IngredientsNew";
import PrivateRoute from "./PrivateRoute";
import history from "./../history";
import { logoutAuthToken } from "../../src/actions";
import { connect } from "react-redux";
//import Input from "./forms/fields/Input";

class App extends Component {

    render() {
        const { token } = this.props;

        return (
            <Router history={history}>
                <>
                    {token && <h4>{token}User Logged In!</h4>}
                    {(token && <div>
                        <Link to="/">
                            <button>Home</button>
                        </Link>
                        <Link to="/ingredients">
                            <button>Ingredients</button>
                        </Link>
                        <Link to="/baseCakes">
                            <button>BaseCakes</button>
                        </Link>
                        <Link to="#">
                            <button>Create New Order</button>
                        </Link>
                        <Link to="#">
                            <button>Current Orders</button>
                        </Link>
                        <Link to="#">
                            <button>Order History</button>
                        </Link>
                                <button onClick={() => this.props.logoutAuthToken()}>Logout</button>
                            </div>) || (<div>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                                <Link to="/register">
                                    <button>Register</button>
                                </Link>
                            </div>)}
                    <Switch>
                        
                        <Route exact path="/" component={HomePage} />
                        <Route 
                            exact 
                            path="/register" 
                            component={RegisterPage}
                        />
                        <Route 
                            exact 
                            path="/login" 
                            component={LoginPage}
                        />
                        <PrivateRoute exact path="/baseCakes" component={BaseCakesPage} />
                        <PrivateRoute exact path="/baseCakes/show/:id" component={BaseCakesShow} />
                        <PrivateRoute exact path="/baseCakes/new/" component={BaseCakesNew} />
                        <PrivateRoute exact path="/baseCakes/edit/:id" component={BaseCakesEdit} />
                        <PrivateRoute exact path="/ingredients/" component={IngredientsPage} />
                        <PrivateRoute exact path="/ingredients/new" component={IngredientsNew} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
}

export default connect(mapStateToProps, {logoutAuthToken})(App);
