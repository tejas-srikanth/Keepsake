//TODO: Add sidebar for extra lists
//TODO: Add backend for extra lists+users
//TODO: login page frontend

import React from "react";
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import Header from "./templates/Header"
import Footer from "./templates/Footer"
import List from "./functionality/List";

function App(){

    return (
    <div>
        <Router>
            <Header />
            <Footer />
            <Route path="/:listID" component={List} />
        </Router>
    </div>
    );

}

export default App;