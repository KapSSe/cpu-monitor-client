import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

import { logIn, setSession, setToken } from '../store/actions/login'
import store from '../store/store'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm() {

  const classes = useStyles();
  const [toDashboard, redirectToDashboard] = useState(false)

  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');

  const sendRequest = async (e) => {
    e.preventDefault()
    const body = JSON.stringify({ email, password })
    const options = { method: 'POST', headers: { "Content-Type": "application/json"}, body }

    const res = await fetch('//localhost:8090/api/user:login', options);

    if (res.ok) {
      const data = await res.json()
      if (data.status === 'OK') {
        store.dispatch(setToken(data.token))
        store.dispatch(logIn(true))
        redirectToDashboard(true)
      }
    }
    resetEmail();
    resetPassword();
  }

  return (
    <Fragment>
    { toDashboard ? <Redirect to='/dashboard' /> : null }
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> Log in </Typography>
        <form className={classes.form} onSubmit={sendRequest}>
          <TextField {...bindEmail} variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email"autoFocus/>
          <TextField {...bindPassword} variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> Log In </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item> <Link to="/register" variant="body2"> {"Don't have an account? Sign Up"}</Link></Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </Fragment>
  );
}