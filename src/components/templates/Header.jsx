import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import Sidebar from "./Sidebar"

function Header(props){
    //props
    //props.deleteClicked = function that shows the delete popup
    //props.createClicked = function that shows the create list popup
    //props.list = ID of current list location
    
    return (
        <header>
            <h1><HighlightIcon /><span onClick={() => window.location="/home"}>Keepsake</span></h1>
            <Sidebar deleteClicked={props.deleteClicked} createClicked={props.createClicked} list={props.list}/>
        </header>
    );
}

export default Header;