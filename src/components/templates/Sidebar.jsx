import React, { useState, useEffect } from 'react'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import {slide as Menu} from 'react-burger-menu'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [allLists, setAllLists] = useState([]);
  // const [showListAdder, setShowListAdder] = useState(false);
  // const [newListName, setNewListName] = useState("")

  useEffect( () => {
    axios.get("http://localhost:5000/lists/")
    .then(response => setAllLists(response.data))
  }, [])


  return (
    <Menu right>
      <h1>Your lists: </h1>
      {allLists.map((list, index) => {
        return <Link key={index} className="menu-item" to={"/"+list._id}>{list.title}</Link>
      })}

    </Menu>
  )
}

export default Sidebar
