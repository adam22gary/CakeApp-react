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
import OrdersPage from "./pages/OrdersPage";
import OrdersShowAll from "./pages/OrdersShowAll";
import OrdersShow from "./pages/OrdersShow";
import OrdersNew from "./pages/OrdersNew";
import IngredientsPage from "./pages/IngredientsPage";
import IngredientsNew from "./pages/IngredientsNew";
import Footer from "./pages/Footer";
import PrivateRoute from "./PrivateRoute";
import history from "./../history";
import { logoutAuthToken } from "../../src/actions";
import { connect } from "react-redux";
import ScrollToTop from "./ScrollToTop";

class App extends Component {

    render() {
        const { token } = this.props;

        return (
            <Router history={history}>
                <>
                <ScrollToTop>
                    {token && <>
                        <h1 className="hometitle birthday cake icon" style={{ backgroundColor: "#ff0081", color: "white", textAlign: "center" }}>
                            <i className="birthday cake icon" style={{ marginBottom: "10px" }}></i>
                            Cake Calculator</h1>
                        <button className="ui inverted pink right floated button" style={{ marginRight: "15px"}} onClick={() => this.props.logoutAuthToken()}>Logout</button>
                        <Link to="/">
                            <button className="ui left inverted pink left floated button" style={{ marginLeft: "15px"}}>Home</button>
                        </Link>
                        <div className="clear"></div>
                    </>}
                        <Switch>                        
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
                            <PrivateRoute exact path="/" component={HomePage} />
                            <PrivateRoute exact path="/baseCakes" component={BaseCakesPage} />
                            <PrivateRoute exact path="/baseCakes/show/:id" component={BaseCakesShow} />
                            <PrivateRoute exact path="/baseCakes/new/" component={BaseCakesNew} />
                            <PrivateRoute exact path="/baseCakes/edit/:id" component={BaseCakesEdit} />
                            <PrivateRoute exact path="/ingredients/" component={IngredientsPage} />
                            <PrivateRoute exact path="/ingredients/new" component={IngredientsNew} />
                            <PrivateRoute exact path="/orders/showAll" component={OrdersShowAll} />
                            <PrivateRoute exact path="/orders/show/:id" component={OrdersShow} />
                            <PrivateRoute exact path="/orders/new/:id" component={OrdersNew} />
                            <PrivateRoute exact path="/orders" component={OrdersPage} />
                            {/* <PrivateRoute exact path="/orders/edit/:id" component={OrdersEdit} />*/}
                            <Route component={NotFoundPage} />
                        </Switch>
                        <Footer />
                    </ScrollToTop>
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
