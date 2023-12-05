import React, { useState, useEffect } from 'react'; // Import useEffect here
import { Container, Header, Input, Form, StyledButton, Paragraph, Error } from './StyledComponents';

const API_LOGIN_URL = 'http://localhost:8080/api/users/login'; //check endpoint!!!

const LoginForm = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Reset the form fields when the component mounts
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser({ username });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Container>
      <Header>Login</Header>
      <Form onSubmit={handleLogin} autoComplete="off">
        <Paragraph>Username:</Paragraph>
        <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <Paragraph>Password:</Paragraph>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <StyledButton type="submit">Login</StyledButton>
        {error && <Error>{error}</Error>}
      </Form>
    </Container>
  );
}

export default LoginForm;
