import React, {useState} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function PopupMenu(props) {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDelete(id){

      axios.delete("http://localhost:5000/lists/"+id)
      .then( () => console.log("Successfully deleted item") )
      
      handleClose();

      window.location="/";
    }
  
    return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this list</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={() => {handleDelete(props.deleteID); props.deleteDone();}}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export default PopupMenu;