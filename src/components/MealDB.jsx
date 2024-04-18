import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import './MealDB.css'; // Import custom CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const MealDB = () => {
  const [query, setQuery] = useState('');
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      // Construct the URL for the API endpoint
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

      // Make the HTTP GET request using Axios
      const response = await axios.get(url);

      // Set the meal state
      if (response.data.meals && response.data.meals.length > 0) {
        setMeal(response.data.meals[0]);
      } else {
        setMeal(null);
      }
      setLoading(false);
    } catch (error) {
      // Set the error state
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if there is an active session
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      navigate('/login');
    } else {
      // If logged in, fetch data
      fetchData();
    }
  }, [navigate]); // Include navigate in the dependency array

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>MealDB Recipe Search</h1>
      <Form onSubmit={fetchData}>
        <Form.Group controlId="formQuery">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter meal name..."
            value={query}
            onChange={handleQueryChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {meal && (
        <Row>
          <Col md={6}>
            <div className="meal-card-content">
              <Card.Img className="meal-image" variant="top" src={meal.strMealThumb} />
            </div>
          </Col>
          <Col md={6}>
            <div className="meal-card-content">
              <h2>{meal.strMeal}</h2>
              <Card.Body>
                <Card.Title>Ingredients</Card.Title>
                <ul>
                  {Object.entries(meal)
                    .filter(([key, value]) => key.startsWith('strIngredient') && value)
                    .map(([key, value]) => (
                      <li key={key}>
                        {value} - {meal[`strMeasure${key.slice(13)}`]}
                      </li>
                    ))}
                </ul>
                <Card.Text>{meal.strInstructions}</Card.Text>
                <Button variant="primary" href={meal.strSource} target="_blank">
                  Source
                </Button>
              </Card.Body>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MealDB;
