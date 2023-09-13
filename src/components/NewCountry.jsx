import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { PlusCircleFill } from 'react-bootstrap-icons';

const NewCountry = (props) => {
  const { onAdd } = props;

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false)
  const [newCountryName, setNewCountryName] = useState("");

  const handleModalClose = () => {
    setShowModal(false);
  }

  const handleModalkeyPress = (e) => {
    (e.keyCode ? e.keyCode : e.which) == '13' && handleAdd();
  }

  const handleAdd = () => {
    newCountryName.length > 0 ? onAdd(newCountryName) : setShowToast(true) ;
    handleModalClose();
  }
  
  return (
    <React.Fragment className='newCountryButton'>
      <Button onClick={ () => {setShowModal(true); setNewCountryName("");} }>
        <PlusCircleFill />
      </Button>
      <Modal onKeyPress={ handleModalkeyPress } show={showModal} onHide={ handleModalClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="modalForm1">
            <Form.Label>Country Name</Form.Label>
            <Form.Control
              type="text"
              name="newCountryName"
              onChange={ (e) => setNewCountryName(e.target.value) }
              value={ newCountryName }
              placeholder="enter name"
              autoFocus
              autoComplete='off'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleModalClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleAdd }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className="position-fixed" style={{top:5,right:5,zIndex:5,width:'18rem'}}>
        <Toast show={ showToast } onClose={ () => {setShowToast(false);} } delay={ 4000 } autohide>
          <Toast.Header className="justify-content-between">
            <strong className="me-auto">Country Not Added</strong>
          </Toast.Header>
          <Toast.Body>Enter a name to add a new country</Toast.Body>
        </Toast>
      </ToastContainer>
    </React.Fragment>
  );
}

export default NewCountry;
