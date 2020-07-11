import React, {useState, useEffect} from "react";
import axios from "axios";
import Footer from "../templates/Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function List(props){
    const [listItems, setListItems] = useState([]);//the notes in the list
    const [listName, setListName] = useState("");//the name of the list

    //once the element is rendered in the DOM
    useEffect(() => {
        //if we are not on the home list
        if (props.match.params.listID !== "home"){
            //get all the notes that correspond to that list
            axios.get("http://localhost:5000/notes/lists/"+props.match.params.listID)
            .then(response => {
                setListItems(response.data)
            })
            .catch(err => console.log(err))
            
            //get the current list to get the list name
            axios.get("http://localhost:5000/lists/"+props.match.params.listID)
            .then(response => setListName(response.data.title))

            //update the location of the user
            props.updateLocation(props.match.params.listID)
        } else {
            //Same idea but with the home route

            axios.get("http://localhost:5000/notes/")
            .then(response => setListItems(response.data))

            setListName("Home")

            props.updateLocation("home")
        }
    
        
    }, [props.match.params.listID, props.updateLocation])

    //add a new task
    function addTask(note, listName){
        const newNote = {title: note.title, description: note.content, listName: listName}

        //if you are not on the home route
        if (props.match.params.listID !== "home"){
            //post the new note to the specific note
            axios.post("http://localhost:5000/notes/lists/"+props.match.params.listID, newNote)
            .then(res => console.log(res.data))
            window.location = "/"+props.match.params.listID
        } else {
            //post the new note to the home route
            axios.post("http://localhost:5000/notes/", newNote)
            .then(res => console.log(res.data))
            window.location = "/"+props.match.params.listID      
        }
    }

    //delete the specific task, and remove it from the list items hook
    function deleteTask(id){
        axios.delete("http://localhost:5000/notes/"+id)
        .then(() => console.log("Item successfully deleted"))

        setListItems(listItems.filter((listItem, idx)=>{
            return idx !== id;
        }))

        props.match.params.listID!=="home" ? window.location = "/"+props.match.params.listID : window.location = "/home"

        
    }

    return (
    <div>
        <h1 className="listname-header">{listName}</h1>
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