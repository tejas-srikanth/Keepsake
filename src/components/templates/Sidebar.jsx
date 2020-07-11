import React, { useState, useEffect, useRef } from 'react'
import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import DropdownMenu from '../functionality/DropdownMenu'
import axios from 'axios';
import ContentEditable from "react-contenteditable";

function Sidebar(props) {
  //props
  //props.deleteClicked = function that shows the delete popup
  //props.createClicked = function that shows the create list popup
  //props.list = ID of current list location

  const [allLists, setAllLists] = useState([]);//set the lists to their name

  const [allItems, setAllItems] = useState([])//which item is being edited
  const editingListName = useRef("")

  //once the Sidebar is rendered in the DOM
  useEffect( () => {
    //get all the lists for display
    //then set allItems (which items are being edited) to false
    axios.get("http://localhost:5000/lists/")
    .then(response => {
      setAllLists(response.data)

      response.data.forEach(response => setAllItems(prevValue => [...prevValue, false]))
    })
  }, [])

  //if the rename list was clicked 
  function renameListClicked(index){
    const newArr = [...allItems];
    newArr[index] = true;
    setAllItems(newArr);
  }

  //if the text in the input field for a renamed list is changed
  function onEditChange(event){
    const value = event.target.value;
    editingListName.current = value;
  }

  //save the changes to the database, finish renaming the list
  function saveChanges(index, listID){
    const newList = {title: editingListName.current}
    const newTitle = {newListName: editingListName.current}

    //update the list name itself within the list collection
    axios.patch("http://localhost:5000/lists/"+listID, newList)
    .then( () => console.log("successfully patched"))

    //update the notes that go along with that list, and change the list names
    axios.patch("http://localhost:5000/notes/lists/"+listID, newTitle)
    .then( () => console.log("Item successfully updated"))

    //reset the allItems array to false, as none of the items are now being edited
    const newArr = [...allItems];
    newArr[index] = false;
    setAllItems(newArr);

    window.location="/"+props.list;
  }

  //if the enter key is pressed, trigger the saveChanges function
  //and save the changes to a database
  function handleKeyDown(event, index, listID){
    if (event.keyCode === 13){
      saveChanges(index, listID)
    }
  }

  return (
    <Menu right >
      <h3 className="list-header">Your lists: </h3>
      {allLists.map((list, index) => {
        return (
        <div key={index}>
        {!allItems[index]?
          <div>
            <Link className="menu-item" to={"/"+list._id} > <span>{list.title}</span> </Link>
            <DropdownMenu listID={list._id} deleteList={props.deleteClicked} listName={list.title} idx={index} editClicked={renameListClicked}/>
          </div>:
          <div>
            <ContentEditable html = {editingListName.current} onChange={onEditChange} onBlur={() => saveChanges(index, list._id)} onKeyDown={(event) => handleKeyDown(event, index, list._id)}/>
          </div>
        }
        </div>
        )
      })}
      <button className="list-adder btn btn-outline-light btn-sm" onClick={props.createClicked}>+ Create list</button>
    </Menu>
  )
}

export default Sidebar
