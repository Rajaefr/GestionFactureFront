import React, { useState } from 'react';
import "../styles/ForgotPasswrd.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
          
  
      if (response.ok) {
        await response.json();
        setMessage('A reset link has been sent to your email.');
      } else {
        setMessage('Error: Unable to process your request.');
      }
    } catch (error) {
      setMessage('Error: Unable to connect to the server.');
    }
  };
  
  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <p>Enter your email address, and we'll send you a link to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
  
};


export default ForgotPassword;


