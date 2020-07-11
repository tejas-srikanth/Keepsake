

//TODO: Add backend for extra lists+users
//TODO: login page frontend

import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./templates/Header"
import Body from "./templates/Body"
import Footer from "./templates/Footer"
import List from "./functionality/List";

function App(){
    const [action, setAction] = useState("");
    const [deleteID, setDeleteID] = useState("");
    const [list, setList] = useState("");

    function showDeletePopup(listID){
        setAction("delete");
        setDeleteID(listID)
    }

    function finishedAction(){
        setDeleteID("")
        setAction("")
    }

    function showCreatePopup(){
        setAction("create");
    }

    function listLocation(listID){
        setList(listID)
    }

    return (
    <div>
        <Router>
            <Header deleteClicked={showDeletePopup} createClicked={showCreatePopup} list={list} />
            <Body showPopup={action !== ""} deleteID={deleteID} actionDone={finishedAction} list={list} action={action}/>
            <Footer />
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route path="/:listID" render={(props) => <List {...props} updateLocation={listLocation} />} />
        </Router>
    </div>
    );

}

export default App;