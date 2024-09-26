import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword, loginUser } from '../State/Authentication/Action';
import ForgotPassword from '../ForgotPawword';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showForgotPassword, setShowForgotPassword] = useState(false); 

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
  };


  const handleForgotPasswordOpen = () => {
    setShowForgotPassword(true); // Open the modal
  };

  const handleForgotPasswordClose = () => {
    setShowForgotPassword(false); // Close the modal
  };
  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name='email'
            label='email'
            fullWidth
            variant='outlined'
            margin='normal'
          />
          <Field
            as={TextField}
            name='password'
            label='password'
            fullWidth
            variant='outlined'
            margin='normal'
            type='password'
          />
          <Button sx={{ mt: 2, padding: '1rem' }} fullWidth type='submit' variant='contained'>
            Login
          </Button>
          {/* Forgot Password Button */}
          <Button 
            sx={{ mt: 2 }} 
            fullWidth 
            variant='text' 
            onClick={handleForgotPasswordOpen} // Change this route as needed
          >
            Forgot Password?
          </Button>
        </Form>
      </Formik>
      {/* Render the ForgotPassword modal */}
      <ForgotPassword open={showForgotPassword} handleClose={handleForgotPasswordClose} />

      <Typography variant='body2' align='center' sx={{ mt: 3 }}>
        Don't have an account?
        <Button size='small' onClick={() => navigate('/account/register')}>
          Register
        </Button>
      </Typography>
    </div>
  );
};

export default LoginForm;