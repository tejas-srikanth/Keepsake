import React, {useState, useRef} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';
import ContentEditable from "react-contenteditable";
import axios from "axios";

function Note(props){
    const [titleText, setTitleText] = useState(props.title)
    const [contentText, setContentText] = useState(props.content)
    const madeChange = useRef({titleChange: false, contentChange: false})
    const [showSubmit, setShowSubmit] = useState(false)
    const [showDelete, setShowDelete] = useState(true)

    function onTitleChange(event){
        const newText = event.target.value
        setTitleText(newText)
        madeChange.current.titleChange = true
    }

    function onContentChange(event){
        const newText = event.target.value
        setContentText(newText)
        madeChange.current.contentChange = true
    }

    function focusHandler(){
        setShowSubmit(true)
        setShowDelete(false)
    }

    function blurHandler(didSubmit, didUndo){
        console.log(didSubmit, didUndo)
        if (didSubmit) {
            submitEdits()
        } else if (didUndo) {
            handleUndo()
        } else{
            if ((!madeChange.current.titleChange) && (!madeChange.current.contentChange)){
                setTitleText(props.title)
                setContentText(props.content)
                
                setShowSubmit(false)
                setShowDelete(true) 
            } 
        }
    }

    function handleDelete(){
        props.onDelete(props.id)
    }

    function handleUndo(){
        setTitleText(props.title)
        setContentText(props.content)

        setShowSubmit(false)
        setShowDelete(true)
    }

    function submitEdits(){
        
        const editedNote = {title: titleText, description: contentText}
        
        axios.patch("http://localhost:5000/notes/"+props.listID+"/"+props.id, editedNote)
        .then( () => console.log("Successfully updated item") )

        setShowSubmit(false)
        setShowDelete(true)
    }

    return (
        <div className="note">
            <ContentEditable className="header1" html={titleText} onChange={(event) => onTitleChange(event)} onFocus={focusHandler} onBlur={() => blurHandler(false, false)}/>
            <ContentEditable className="para" html={contentText} onChange={(event) => onContentChange(event)} onFocus={focusHandler} onBlur={() => blurHandler(false, false)}/>
            {showDelete?<button onClick={handleDelete } className="delete-icon">  <DeleteIcon /> </button>: <button onClick={() => blurHandler(false, true)} className="delete-icon"><UndoIcon /></button>}
            {showSubmit && <button className="edit-icon" onClick={() => blurHandler(true, false)}> <DoneIcon/>  </button>}
        </div>
    );
}

export default Note