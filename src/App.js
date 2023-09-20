// Repository:  medals-b-react, medals-react-bootstrap
// Authors:     Jeff Grissom, Justin Molenda
// Version:     5j.xx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Country from './components/Country';
import './App.css';
import NewCountry from './components/NewCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  // const [medals, setMedals] = useState([]);
  const medals = useRef([
    { id: 1, name: 'gold' },
    { id: 2, name: 'silver' },
    { id: 3, name: 'bronze' },
  ]);
  const apiEndpoint = "https://medals-jam-countries-api.azurewebsites.net/api/country";

  const handleAdd = async (name) => {
    const { data: post } = await axios.post(apiEndpoint, { name: name });
    setCountries(countries.concat(post));
    // const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    // const mutableCountries = [...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
    // setCountries( mutableCountries );
  }

  const handleDelete = async (countryId) => {
    const originalCountries = countries;
    setCountries(countries.filter(c => c.id !== countryId));
    try {
      await axios.delete(`${apiEndpoint}/${countryId}`);
    } catch(ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while deleting a country');
        setCountries(originalCountries);
      }
    }
    // const mutableCountries = [...countries].filter(c => c.id !== countryId);
    // setCountries( mutableCountries );
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
    medals.current.forEach(medal => { sum += countries.reduce((a, b) => a + b[medal.name], 0); });
    return sum;
  }

  useEffect(() => {
    // Initial state data stored here
    // let mutableCountries = [
    //   { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
    //   { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
    //   { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
    // ];
    // let mutableMedals = [
    //   { id: 1, name: 'gold' },
    //   { id: 2, name: 'silver' },
    //   { id: 3, name: 'bronze' },
    // ];
    // setCountries(mutableCountries);
    // setMedals(mutableMedals);
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Navbar className="navbar-dark bg-dark">
        <Container fluid>
          <Navbar.Brand>
            Olympic Medals
            <Badge className="ml-2" bg="light" text="dark" pill>{ getAllMedalsTotal() }</Badge>
          </Navbar.Brand>
          <NewCountry onAdd={ handleAdd }></NewCountry>
          {/* <Button variant="outline-success" onClick={ handleShow }><PlusCircleFill /></Button>{' '} */}
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
        { countries.map(country => 
          <Col className="mt-3" key={ country.id }>
            <Country  
              country={ country } 
              medals={ medals.current }
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
