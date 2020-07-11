import React from 'react';
import PopupMenu from '../functionality/PopupMenu';

function Body(props){
    //props
    //props.showPopup = is a popup being shown
    //deleteID = the ID of the list being deleted
    //actionDone = actionDone in App
    //action = the action being done
    //list = the current list location


    return (
        <div>
            {props.showPopup && <PopupMenu deleteID={props.deleteID} actionDone={props.actionDone} action={props.action} list={props.list}/>}
        </div>
    )
}

export default Body