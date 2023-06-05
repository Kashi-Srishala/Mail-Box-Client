import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './components/authantication/AuthForm';

describe('AuthForm', () => {
  test('Renders the login form', () => {
    render(<AuthForm />);
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Sign Up")).toBeInTheDocument();
  });

  test('Renders the sign-up form when clicking on the "Don\'t have an account? Sign Up" link', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    expect(screen.getByLabelText('Email:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Login')).toBeInTheDocument();
  });

  test('Displays an error message when submitting the form with a missing email', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });

  test('Displays an error message when submitting the form with a missing password', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.click(screen.getByText('Sign Up'));
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
  });

  test('Displays an error message when submitting the sign-up form with password mismatch', () => {
    render(<AuthForm />);
    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password' } });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), { target: { value: 'differentpassword' } });
    fireEvent.click(screen.getByText('Sign Up'));
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
});
