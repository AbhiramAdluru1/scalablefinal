import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BMI = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmiData, setBmiData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const calculateBMI = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://dm3y42j2bl.execute-api.eu-west-1.amazonaws.com/dev/bmi?weight=${weight}&height=${height}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch BMI data');
                }
                const data = await response.json();
                setBmiData(data);
            } catch (error) {
                setError('Error calculating BMI');
                console.error('Error calculating BMI:', error);
            }
            setLoading(false);
        };

        if (weight && height) {
            calculateBMI();
        }
    }, [weight, height]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mt-5">
            <h1>BMI Calculator</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formWeight">
                    <Form.Label>Weight (kg):</Form.Label>
                    <Form.Control type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formHeight">
                    <Form.Label>Height (m):</Form.Label>
                    <Form.Control type="number" placeholder="Enter height" value={height} onChange={(e) => setHeight(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    Calculate BMI
                </Button>
            </Form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {bmiData && (
                <div className="mt-3">
                    <h2>BMI Result</h2>
                    <p>BMI: {bmiData.bmi}</p>
                    <p>Interpretation: {bmiData.interpretation}</p>
                </div>
            )}
        </div>
    );
};

export default BMI;
