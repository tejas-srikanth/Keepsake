import React, {useState, useEffect} from "react";
import axios from "axios";
import ContentEditable from 'react-contenteditable'
import Footer from "../templates/Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function List(props){
    const [listItems, setListItems] = useState([]);
    const [listName, setListName] = useState("")

    useEffect(() => {
        if (props.match.params.listID){
            axios.get("http://localhost:5000/notes/"+props.match.params.listID)
            .then(response => {
                setListItems(response.data)
            })
            .catch(err => console.log(err))

            axios.get("http://localhost:5000/lists/"+props.match.params.listID)
            .then(response => setListName(response.data.title))
        } else {
            axios.get("http://localhost:5000/notes/")
            .then(response => setListItems(response.data))
        }
        
    }, [props.match.params.listID])

    function addTask(note){
        console.log(props.match.params.listID);
        const newNote = {title: note.title, description: note.content}
        if (props.match.params.listID){

            axios.post("http://localhost:5000/notes/"+props.match.params.listID, newNote)
            .then(res => console.log(res.data))
            window.location = "/"+props.match.params.listID
        } else {
            
            axios.post("http://localhost:5000/notes/", newNote)
            .then(res => console.log(res.data))
            window.location = "/"      
        }
    }

    function deleteTask(id){
        if (props.match.params.listID){
            axios.delete("http://localhost:5000/notes/"+props.match.params.listID+"/"+id)
            .then(() => console.log("Item successfully deleted"))
            setListItems(listItems.filter((listItem, idx)=>{
                return idx !== id;
            }))

            window.location = "/"+props.match.params.listID
        } else {
            axios.delete("http://localhost:5000/notes/"+id)
            .then(() => console.log("item successfully deleted"))
            setListItems(listItems.filter((listItem, idx)=>{
                return idx !== id;
            }))

            window.location = "/"
        }
        
    }

    function titleChange(event){
        const value = event.target.value;
        setListName(value);
    }

    return (
    <div>
        {!props.editListName? <h1 className="listname-header">{listName}</h1> : <ContentEditable className="listname-header" onChange={titleChange} html={listName} />}
        <CreateArea 
            onAdd={addTask}
        />
        {listItems.map((listItem) => {
            return <Note 
                    key={listItem._id} 
                    id={listItem._id}
                    listID = {listItem.listID} 
                    title={listItem.title} 
                    content={listItem.description} 
                    onDelete={deleteTask}
                    />
        })}
        <Footer />
    </div>
    );

}

export default List;