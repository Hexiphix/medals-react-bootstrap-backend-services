// Repository:  medals-b-react, medals-react-bootstrap
// Authors:     Jeff Grissom, Justin Molenda
// Version:     5j.xx
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PlusCircleFill } from 'react-bootstrap-icons';
import Country from './components/Country';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [medals, setMedals] = useState([]);

  const [show, setShow] = useState(false);
  const [newCountryName, setNewCountryName] = useState("");

  const handleAdd = () => {
    if (newCountryName.length > 0) {
      const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
      const mutableCountries = [...countries].concat({ id: id, name: newCountryName, gold: 0, silver: 0, bronze: 0 });
      setCountries( mutableCountries );
    }
    handleClose();
  }

  const handleDelete = (countryId) => {
    const mutableCountries = [...countries].filter(c => c.id !== countryId);
    setCountries( mutableCountries );
  }

  const handleIncrement = (countryId, medalName) => {
    const mutableCountries = [ ...countries ];
    const idx = mutableCountries.findIndex(c => c.id === countryId);
    mutableCountries[idx][medalName] += 1;
    setCountries( mutableCountries );
  }

  const handleDecrement = (countryId, medalName) => {
    const mutableCountries = [ ...countries ];
    const idx = mutableCountries.findIndex(c => c.id === countryId);
    mutableCountries[idx][medalName] -= 1;
    setCountries(mutableCountries);
  }

  const getAllMedalsTotal = () => {
    let sum = 0;
    medals.forEach(medal => { sum += countries.reduce((a, b) => a + b[medal.name], 0); });
    return sum;
  }
  
  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
    setNewCountryName("");
  }

  const keyPress = (e) => {
    (e.keyCode ? e.keyCode : e.which) == '13' && handleAdd();
  }

  useEffect(() => {
    // Initial state data stored here
    let mutableCountries = [
      { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
    ];
    let mutableMedals = [
      { id: 1, name: 'gold' },
      { id: 2, name: 'silver' },
      { id: 3, name: 'bronze' },
    ];
    setCountries(mutableCountries);
    setMedals(mutableMedals);
  }, []);

  return (
    <React.Fragment>
      <Modal onKeyPress={ keyPress } show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>New Country</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleAdd }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar className="navbar-dark bg-dark">
        <Container fluid>
          <Navbar.Brand>
            Olympic Medals
            <Badge className="ml-2" bg="light" text="dark" pill>{ getAllMedalsTotal() }</Badge>
          </Navbar.Brand>
          <Button variant="outline-success" onClick={ handleShow }><PlusCircleFill /></Button>{' '}
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
        { countries.map(country => 
          <Col className="mt-3" key={ country.id }>
            <Country  
              country={ country } 
              medals={ medals }
              onDelete={ handleDelete }
              onIncrement={ handleIncrement } 
              onDecrement={ handleDecrement } />
          </Col>
        )}
        </Row>
      </Container>
    </React.Fragment>
  );
}
 
export default App;
