import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Home = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [calorieIntake, setCalorieIntake] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Check if the user is logged in by checking session storage
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      navigate('/login');
    }
  }, [navigate]); // Include navigate in the dependency array to ensure it's available

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const [calorieIntakeResponse, idealWeightResponse] = await Promise.all([
        axios.get(`http://calorieapi-env.eba-udbdxf3g.us-east-1.elasticbeanstalk.com/api/calorie_intake?height=${height}&weight=${weight}`),
        axios.get(`http://calorieapi-env.eba-udbdxf3g.us-east-1.elasticbeanstalk.com/api/ideal_weight?height=${height}`)
      ]);

      setCalorieIntake(calorieIntakeResponse.data.calorie_intake);
      setIdealWeight(idealWeightResponse.data.ideal_weight_male);

      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Calorie Intake Recommendation</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="height" className="form-label">Height (cm):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="weight" className="form-label">Weight (kg):</label>
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Loading...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}
      {calorieIntake && idealWeight && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Results</h5>
                <p className="card-text">Calorie Intake Recommendation: {calorieIntake} calories</p>
                <p className="card-text">Ideal Weight: {idealWeight} kg</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
