import React, {useState, useRef} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from '@material-ui/icons/Done';
import ContentEditable from "react-contenteditable";
import HomeIcon from '@material-ui/icons/Home';
import axios from "axios";

function Note(props){
    const titleText = useRef(props.title)
    const contentText = useRef(props.content)
    const [showSubmit, setShowSubmit] = useState(false)

    function onTitleChange(event){
        const newText = event.target.value
        titleText.current = newText
    }

    function onContentChange(event){
        const newText = event.target.value
        contentText.current=newText
    }

    function focusHandler(){
        setShowSubmit(true)
    }

    function blurHandler(event, didSubmit){
        console.log(event.relatedTarget)
        if ((event.relatedTarget) && (event.relatedTarget.className === "edit-icon")) {
            console.log(true)
            submitEdits()
        } else{
            titleText.current = props.title
            contentText.current = props.content
            
            setShowSubmit(false)
        }
    }

    function handleDelete(){
        props.onDelete(props.id)
    }

    function submitEdits(){
        
        const editedNote = {title: titleText.current, description: contentText.current}
        console.log(editedNote)
        axios.patch("http://localhost:5000/notes/"+props.id, editedNote)
        .then( () => console.log("Successfully updated item") )

        setShowSubmit(false)
    }

    return (
        <div className="note">
            <ContentEditable className="header1" html={titleText.current} onChange={(event) => onTitleChange(event)} onFocus={focusHandler} onBlur={(event) => blurHandler(event, false)}/>
            <ContentEditable className="para" html={contentText.current} onChange={(event) => onContentChange(event)} onFocus={focusHandler} onBlur={(event) => blurHandler(event, false)}/>
            <h6 className="delete-icon">{props.listName === "Home"?<HomeIcon fontSize="small" />:props.listName}</h6>
            {showSubmit ? <button className="edit-icon" onClick={(event) => blurHandler(event, true)}> <DoneIcon/>  </button>:<button onClick={handleDelete } className="edit-icon">  <DeleteIcon /> </button>}
        </div>
    );
}

export default Note