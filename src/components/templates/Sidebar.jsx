import React, { useState, useEffect, useRef } from 'react'
import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import DropdownMenu from '../functionality/DropdownMenu'
import axios from 'axios';
import ContentEditable from "react-contenteditable";

function Sidebar(props) {
  const [allLists, setAllLists] = useState([]);

  const [allItems, setAllItems] = useState([])
  const editingListName = useRef("")


  useEffect( () => {
    axios.get("http://localhost:5000/lists/")
    .then(response => {
      setAllLists(response.data)

      response.data.forEach(response => setAllItems(prevValue => [...prevValue, false]))
    })
  }, [])

  function renameListClicked(index){
    const newArr = [...allItems];
    newArr[index] = true;
    setAllItems(newArr);
  }

  function onEditChange(event){
    const value = event.target.value;
    editingListName.current = value;
  }

  function saveChanges(index, listID){
    const newList = {title: editingListName.current}
    const newTitle = {newListName: editingListName.current}

    axios.patch("http://localhost:5000/lists/"+listID, newList)
    .then( () => console.log("successfully patched"))

    axios.patch("http://localhost:5000/notes/lists/"+listID, newTitle)
    .then( () => console.log("Item successfully updated"))

    const newArr = [...allItems];
    newArr[index] = false;
    setAllItems(newArr);

    window.location="/"+props.list;
  }

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
