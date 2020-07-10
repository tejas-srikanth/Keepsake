import React from 'react';
import PopupMenu from '../functionality/PopupMenu';

function Body(props){

    return (
        <div>
            {props.showPopup && <PopupMenu deleteID={props.deleteID} actionDone={props.actionDone} action={props.action} list={props.list}/>}
        </div>
    )
}

export default Body