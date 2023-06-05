import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Perform the API call for sign-up or login using fetch
      const endpoint = isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAVIbdHb1HjOT4pjxuuD7s0sq-EzzC1uQo' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVIbdHb1HjOT4pjxuuD7s0sq-EzzC1uQo';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        if (isSignUp) {
          console.log('User has successfully signed up.');
          setSuccessMsg('SignUp is Successful');
        } else {
          console.log('User has successfully logged in.');
          setSuccessMsg('Login is Successful');
          
        }
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/home');
        }, 5000);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred during authentication.');
    }
  };

  return (
    <Container>
      <Card className="mt-5 mx-auto" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{isSignUp ? 'Sign Up' : 'Login'}</Card.Title>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            {isSignUp && (
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit" block>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="mt-3">
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
