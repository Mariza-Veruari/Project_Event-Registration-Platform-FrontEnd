import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSession from '../../providers/session';

export default function LoginPage() {
  const { setSessionUser, setSessionToken } = useSession();
  const navigate = useNavigate();
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': {
          m: 1,
        },
      }}
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post('/user/login', {
            email: e.target.email.value,
            password: e.target.password.value,
          })
          .then(
            (res) => {
              setSessionToken(res.data.token);
              setSessionUser(res.data.user);
            },
            (err) => {
              console.log(err);
            }
          );
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField required id='email' label='Email' name='email' />
        <TextField
          id='password'
          label='Password'
          type='password'
          name='password'
          autoComplete='password'
        />
        <Button type='submit'>Login</Button>
        <div>or</div>
        <Button
          onClick={() => {
            navigate('/register');
          }}
        >
          Register
        </Button>
      </div>
    </Box>
  );
}
