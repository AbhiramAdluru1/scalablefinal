import React, { useState } from 'react';
import { Auth } from 'aws-amplify/auth';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = credentials;
    try {
      await Auth.signIn(username, password);
      console.log('User successfully signed in');
    } catch (error) {
      console.error('Error signing in', error);
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
            <div className="card-footer">
              <Link to="/register">Register</Link> {/* Link to register page */}
              <span className="mx-2">|</span>
              <Link to="/forgot-password">Forgot Password?</Link> {/* Link to forgot password page */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
