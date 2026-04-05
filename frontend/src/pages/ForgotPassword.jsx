import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/forgot-password', { email });
      setMessage(data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request reset link');
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Password</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        <form onSubmit={handleRequest}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-block">Send Reset Link</button>
        </form>
        <p className="auth-redirect">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
