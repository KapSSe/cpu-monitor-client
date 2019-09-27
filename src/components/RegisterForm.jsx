import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useInput } from '../hooks/useInput'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function RegisterForm() {
  const classes = useStyles();

  const { value:name, bind:bindName, reset:resetName } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');

  const [toLogin, redirectToLogin] = useState(false)

  const sendRequest = async (e) => {
    const body = JSON.stringify({ name, email, password })
    const options = { method: 'POST', headers: { "Content-Type": "application/json"}, body }

    const res = await fetch('//localhost:8090/api/user:register', options);

    if (res.ok) {
      const data = await res.json()
      if (data.status === 'OK') {
        redirectToLogin(true)
      }
    }
    resetEmail();
    resetName();
    resetPassword();
  }

  return (
    <Fragment>
    { toLogin ? <Redirect to='/' /> : null }
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}> <LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5"> Register </Typography>
        <form className={classes.form} onSubmit={ sendRequest } >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField {...bindName} variant="outlined" required fullWidth id="Name" label="Name" name="Name" autoComplete="fname"/>
            </Grid>
            <Grid item xs={12}>
              <TextField {...bindEmail} variant="outlined" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
            </Grid>
            <Grid item xs={12}>
              <TextField {...bindPassword} variant="outlined" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> Register </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2"> Already have an account? Log in </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
    </Fragment>
  );
}
