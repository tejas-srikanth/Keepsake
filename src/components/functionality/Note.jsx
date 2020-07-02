import React, {useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from '@material-ui/icons/Done';
import ContentEditable from "react-contenteditable";
import axios from "axios";

function Note(props){
    const [titleText, setTitleText] = useState(props.title)
    const [contentText, setContentText] = useState(props.content)
    const [showSubmit, setShowSubmit] = useState(false)

    function onTitleChange(event){
        setTitleText(event.target.value)
    }

    function onContentChange(event){
        setContentText(event.target.value)
    }

    function focusHandler(){
        setShowSubmit(true)
    }


    function submitEdits(){
        const editedNote = {title: titleText, description: contentText}
        console.log(editedNote);
        
        axios.patch("http://localhost:5000/notes/"+props.id, editedNote)
        .then( () => console.log("Successfully updated item") )

        setShowSubmit(false)

    }

    return (
        <div className="note">
            <ContentEditable className="header1" html={titleText} onChange={(event) => onTitleChange(event)} onFocus={focusHandler}/>
            <ContentEditable className="para" html={contentText} onChange={(event) => onContentChange(event)} onFocus={focusHandler}/>
            <button onClick={(event) => {
                event.preventDefault();
                props.onDelete(props.id)
            }} className="delete-icon">
                <DeleteIcon />
            </button>
            {showSubmit && <button className="edit-icon" onClick={() => submitEdits()}> <DoneIcon/>  </button>}
        </div>
    );
}

export default Note