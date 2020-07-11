import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ContentEditable from 'react-contenteditable';

function PopupMenu(props) {
    //props
    //props.showPopup = is a popup being shown
    //deleteID = the ID of the list being deleted
    //actionDone = actionDone in App
    //action = the action being done
    //list = the current list location
  
    const [show, setShow] = useState(true);
    const [newListName, setNewListName] = useState("");

    //once the modal is closed
    const handleClose = () => {setShow(false); props.actionDone();}

    //delete a list
    function handleDelete(id){

      axios.delete("http://localhost:5000/lists/"+id)
      .then( () => console.log("Successfully deleted item") )
      
      handleClose();
      
      window.location="/"+props.list;

    }

    //for creating a new list (the contenteditable)
    function handleChange(event){
      const value = event.target.value;
      setNewListName(value)
    }

    //when a new list was submitted
    function submitNewListClicked(){

      const list = {title: newListName}
      //post the list to the lists home route
      axios.post("http://localhost:5000/lists/", list)
      .then(() => console.log("List is saved"))
      .catch(err => console.log(err));
  
      setNewListName("");
      setShow(false);
  
      window.location="/"+props.list;
    }
  
    return (
      <>
  
        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">{props.action === "create"? "New List" : "Warning"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.action === "create"? <ContentEditable className="new-list-changer" html = {newListName} onChange={handleChange} />: "Are you sure you want to delete this list"}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              {props.action==="delete"?"No":"Close"}
            </Button>
            {props.action==="delete"?
            <Button variant="danger" onClick={() => {handleDelete(props.deleteID); props.actionDone();}}>
              Yes
            </Button>:
            <Button variant="warning" onClick={() => {submitNewListClicked(); props.actionDone();}}>
              Create
            </Button>
            }
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default PopupMenu;