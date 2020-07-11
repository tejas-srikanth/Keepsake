import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function DropdownMenu(props) {
  //props
  //listID = the id of the list that the action's being done on
  //deleteList = once delete is clicked, shows delete popup
  //listName = the title of the list the action's being done on
  //idx = index of the list in the state hook
  //editClicked = rename list clicked
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  //when the menu is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //when the menu is closed
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
        <MenuItem onClick={() => {props.editClicked(props.idx)}}>Rename List </MenuItem>
        <MenuItem onClick={() => {setAnchorEl(null); props.deleteList(props.listID);}}>Delete List</MenuItem>
      </Menu>
    </div>
  );
}

export default DropdownMenu