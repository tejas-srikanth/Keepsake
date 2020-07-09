//TODO: Add sidebar for extra lists
//TODO: Keep app on same page after all the actions
//TODO: Add backend for extra lists+users
//TODO: login page frontend

import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Route,
  } from "react-router-dom";
import Header from "./templates/Header"
import Body from "./templates/Body"
import Footer from "./templates/Footer"
import List from "./functionality/List";

function App(){
    const [showDeleteMenu, setShowDeleteMenu] = useState(false);
    const [deleteID, setDeleteID] = useState("");
    const [list, setList] = useState("");

    function showDeletePopup(listID){
        setShowDeleteMenu(true);
        setDeleteID(listID)
    }

    function finishedDeleting(){
        setDeleteID("")
    }

    return (
    <div>
        <Router>
            <Header deleteClicked={showDeletePopup}/>
            <Body showPopup={showDeleteMenu} deleteID={deleteID} deleteDone={finishedDeleting} list={list}/>
            <Footer />
            <Route path="/:listID?" component={List} />
        </Router>
    </div>
    );

}

export default App;