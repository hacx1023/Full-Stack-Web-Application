import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(`/portfolio/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to edit your portfolio</p>
        
        {error && <div className="error-message">✕ {error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <input type="email" placeholder="you@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>PASSWORD</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-block">Log In ➔</button>
        </form>
        
        <p className="auth-redirect">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="auth-redirect" style={{ marginTop: '1rem' }}>
          New to Portfolio? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
