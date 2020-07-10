import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

    const [note, setNote] = useState({title: "", content: ""});
    const [isExpanded, setIsExpanded] = useState(false)

    function updateNote(event){
        const {name, value} = event.target;
        setNote({...note, [name]: value});
    }

    function addClicked(event){
        props.onAdd(note, props.listName);
        setNote({title: "", content: ""});
        console.log(note)
        event.preventDefault();        
    }

    function updateIsExpanded(){
        setIsExpanded(true)
    }


    return (
        <div>
        <form className="create-note">
            {isExpanded && <input name="title" placeholder="Title" value={note.title} onChange={updateNote}></input>} 
            <textarea name="content" placeholder="Take a note..." rows={isExpanded ? 3 : 1} value={note.content} onChange={updateNote}  onClick={updateIsExpanded}></textarea>
            <Zoom in={isExpanded}>
                <Fab onClick={addClicked}>
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
        </div>
    );
}

export default CreateArea;