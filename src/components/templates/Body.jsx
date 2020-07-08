import React from 'react';
import PopupMenu from '../functionality/PopupMenu';

function Body(props){

    return (
        <div>
            {props.showPopup && <PopupMenu deleteID={props.deleteID} deleteDone={props.deleteDone}/>}
        </div>
    )
}

export default Body