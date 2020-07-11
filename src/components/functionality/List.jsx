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
        if (props.match.params.listID !== "Home"){
            axios.get("http://localhost:5000/notes/"+props.match.params.listID)
            .then(response => {
                setListItems(response.data)
            })
            .catch(err => console.log(err))

            axios.get("http://localhost:5000/lists/"+props.match.params.listID)
            .then(response => setListName(response.data.title))

            props.updateLocation(props.match.params.listID)
        } else {
            axios.get("http://localhost:5000/notes/")
            .then(response => setListItems(response.data))

            setListName("Home")

            props.updateLocation("Home")
        }
    
        
    }, [props.match.params.listID, props.updateLocation])

    function addTask(note, listName){
        const newNote = {title: note.title, description: note.content, listName: listName}
        if (props.match.params.listID){
            // console.log(newNote.listName)
            console.log(props.match.params.listID);
            axios.post("http://localhost:5000/notes/"+props.match.params.listID, newNote)
            .then(res => console.log(res.data))
            window.location = "/"+props.match.params.listID
        } else {
            
            axios.post("http://localhost:5000/notes/", newNote)
            .then(res => console.log(res.data))
            window.location = "/"+props.match.params.listID      
        }
    }

    function deleteTask(id){
        axios.delete("http://localhost:5000/notes/"+id)
        .then(() => console.log("Item successfully deleted"))
        setListItems(listItems.filter((listItem, idx)=>{
            return idx !== id;
        }))

        props.match.params.listID!=="Home" ? window.location = "/"+props.match.params.listID : window.location = "/Home"

        
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
            listName={listName}
        />
        {listItems.map((listItem) => {
            return <Note 
                    key={listItem._id} 
                    id={listItem._id}
                    listID = {listItem.listID} 
                    title={listItem.title} 
                    content={listItem.description} 
                    onDelete={deleteTask}
                    listName={listItem.listName}
                    />
        })}
        <Footer />
    </div>
    );

}

export default List;