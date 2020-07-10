import React, { useState, useEffect, useRef } from 'react'
import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DropdownMenu from '../functionality/DropdownMenu'
import axios from 'axios';
import ContentEditable from "react-contenteditable";

function Sidebar(props) {
  const [allLists, setAllLists] = useState([]);

  const [showListAdder, setShowListAdder] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [allItems, setAllItems] = useState([])
  const editingListName = useRef("")


  useEffect( () => {
    axios.get("http://localhost:5000/lists/")
    .then(response => {
      setAllLists(response.data)

      response.data.forEach(response => setAllItems(prevValue => [...prevValue, false]))
    })
  }, [])

  function addListClicked(){
    setShowListAdder(true);
  }

  function submitNewListClicked(){

    const list = {title: newListName}
    axios.post("http://localhost:5000/lists/", list)
    .then(() => console.log("List is saved"))
    .catch(err => console.log(err));

    setShowListAdder(false);
    setNewListName("");

    window.location="/"
  }

  function onListNameChange(event){
    const value = event.target.value;

    setNewListName(value);
  }

  function closeListAdder(){
    setShowListAdder(false);
  }

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

    axios.patch("http://localhost:5000/lists/"+listID, newList)
    .then( () => console.log("successfully patched"))

    const newArr = [...allItems];
    newArr[index] = false;
    setAllItems(newArr);
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
            <ContentEditable html = {editingListName.current} onChange={onEditChange} onBlur={() => saveChanges(index, list._id)}/>
          </div>
        }
        </div>
        )
      })}
      {showListAdder ? 
        <div className="list-adder">
          <ContentEditable html={newListName} onChange={onListNameChange} className="editable-listname"/>
          <button onClick={submitNewListClicked}><DoneIcon /></button>
          <button onClick={closeListAdder} className="close-listadder"><CloseIcon /></button>
        </div>: 
      <button className="list-adder new-list-button" onClick={addListClicked}>+ Create list</button>}
    </Menu>
  )
}

export default Sidebar
