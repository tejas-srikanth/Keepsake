import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import Sidebar from "./Sidebar"

function Header(props){
    return (
        <header>
            <h1><HighlightIcon /><span onClick={() => window.location="/Home"}>Keeper App</span></h1>
            <Sidebar deleteClicked={props.deleteClicked} createClicked={props.createClicked} list={props.list}/>
        </header>
    );
}

export default Header;