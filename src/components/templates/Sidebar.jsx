import React, { useState, useEffect } from 'react'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DropdownMenu from '../functionality/DropdownMenu'
import axios from 'axios';
import ContentEditable from "react-contenteditable";

function Sidebar(props) {
  const [allLists, setAllLists] = useState([]);

  const [showListAdder, setShowListAdder] = useState(false);
  const [newListName, setNewListName] = useState("")


  useEffect( () => {
    axios.get("http://localhost:5000/lists/")
    .then(response => {
      setAllLists(response.data)
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

  function deleteListItem(index, id){
    axios.delete("http://localhost:5000/lists/"+id)
    .then( () => console.log("Successfully deleted item") )

    setAllLists(prevValue => {
      prevValue.splice(index, 1)
      console.log(prevValue)
      return prevValue
    });
  }

  function onListNameChange(event){
    const value = event.target.value;

    setNewListName(value);
  }

  return (
    <Menu right isOpen>
      <h1 className="list-header">Your lists: </h1>
      {allLists.map((list, index) => {
        return (
        <div key={index}>
          <Link className="menu-item" to={"/"+list._id}><span>{list.title}</span></Link>
          <DropdownMenu listID={list._id}/>
          {/*<button onClick={() => deleteListItem(index, list._id)} className="list-delete-icon"><DeleteIcon fontSize="small"/></button>*/}
        </div>
        )
      })}
      {showListAdder ? 
        <form action="/" onSubmit={submitNewListClicked}>
          <input className="new-list-input" onChange={onListNameChange} value={newListName}></input>
          <input type="submit" value="submit" className="new-list-button" />
        </form>: 
      <button className="new-list-button" onClick={addListClicked}>+ Create list</button>}
    </Menu>
  )
}

export default Sidebar
