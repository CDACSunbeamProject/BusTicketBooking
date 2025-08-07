import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { login } = useAuth();

  console.log("login function");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handle submit function");
  
    try {
      console.log("inside try");
      axios.post('http://localhost:9090/test-signin', { email, password });

      const response = await axios.post(`http://localhost:9090/users/signin`, {
        email,
        password
      });
      console.log("Full response from backend:", response.data);

      const { jwt, email: userEmail, role } = response.data;
      console.log(userEmail)

      login(jwt,userEmail,role)

      // Redirect based on role
      if (role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (role === 'USER') {
        navigate('/user/dashboard');
      } else {
        setError('Unknown user role');
      }
    } catch (errorr) {
      setError('Invalid credentials');
      console.error("Login error response:", errorr.response?.data || errorr.message);

    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
      </div>
      <button 
      onClick={() => console.log("Button clicked")}
      type="submit">Login</button>
    </form>
  );
}

export default Login;
