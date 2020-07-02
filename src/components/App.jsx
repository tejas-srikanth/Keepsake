//TODO: get rid of multiple edits (if you do this, you have to put the original text back)
//TODO: Add sidebar for extra lists
//TODO: Add backend for extra lists+users
//TODO: login page frontend

import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./templates/Header";
import Footer from "./templates/Footer";
import Note from "./functionality/Note";
import CreateArea from "./functionality/CreateArea"

function App(){
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/notes")
        .then(response => {
            setListItems(response.data)
        })
        .catch(err => console.log(err))
    }, [])

    function addTask(note){
        const newNote = {title: note.title, description: note.content}
        axios.post("http://localhost:5000/notes", newNote)
        .then(res => console.log(res.data))

        window.location = "/"
    }

    function deleteTask(id){
        axios.delete("http://localhost:5000/notes/"+id)
        .then(() => console.log("Item successfully deleted"))

        setListItems(listItems.filter((listItem, idx)=>{
            return idx !== id;
        }))

        window.location = "/"
    }


    return (
    <div>
        <Header />
        <Footer />
        <CreateArea 
            onAdd={addTask}
        />
        {listItems.map((listItem) => {
            return <Note 
                    key={listItem._id} 
                    id={listItem._id} 
                    title={listItem.title} 
                    content={listItem.description} 
                    onDelete={deleteTask}
                    />
        })}
        
    </div>
    );

}

export default App;