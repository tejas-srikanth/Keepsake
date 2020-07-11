import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ContentEditable from 'react-contenteditable';

function PopupMenu(props) {
    const [show, setShow] = useState(true);
    const [newListName, setNewListName] = useState("");
  
    const handleClose = () => {setShow(false); props.actionDone();}

    function handleDelete(id){

      axios.delete("http://localhost:5000/lists/"+id)
      .then( () => console.log("Successfully deleted item") )
      
      handleClose();
      
      window.location="/"+props.list;

    }

    function handleChange(event){
      const value = event.target.value;
      setNewListName(value)
    }

    function submitNewListClicked(){

      const list = {title: newListName}
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