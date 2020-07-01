import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import ContentEditable from "react-contenteditable";

function Note(props){
    const [titleText, setTitleText] = useState(props.title)

    function onTitleChange(event){
        setTitleText(event.target.value)
    }
    return (
        <div className="note">
            <ContentEditable className="header1" html={titleText} onChange={(event) => onTitleChange(event)}/>
            <p>{props.content}</p>
            <button onClick={ (event) => {
                
            }}
            className="edit-icon">
                <EditIcon/>
            </button>
            <button onClick={(event) => {
                event.preventDefault();
                props.onDelete(props.id)
            }} className="delete-icon">
                <DeleteIcon />
            </button>
        </div>
    );
}

export default Note