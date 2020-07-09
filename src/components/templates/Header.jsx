import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import Sidebar from "./Sidebar"

function Header(props){
    return (
        <header>
            <h1 onClick={() => {window.location="/"}}><HighlightIcon />Keeper App</h1>
            <Sidebar deleteClicked={props.deleteClicked}/>
        </header>
    );
}

export default Header;