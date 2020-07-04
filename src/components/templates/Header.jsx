import React from "react";
import HighlightIcon from '@material-ui/icons/Highlight';
import Sidebar from "./Sidebar"

function Header(){
    return (
        <header>
            <h1><HighlightIcon />Keeper App</h1>
            <Sidebar />
        </header>
    );
}

export default Header;