import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div style={{height: "0px"}}>
      <Button className="list-delete-icon" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <span className="material-icons md-18">
            more_vert
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Rename List </MenuItem>
        <MenuItem onClick={() => {setAnchorEl(null); props.deleteList(props.listID);}}>Delete List</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu