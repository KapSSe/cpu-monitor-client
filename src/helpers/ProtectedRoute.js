import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import store from '../store/store'

// const loggedIn = store.getState().auth.isLoggedIn
const loggedIn = true


const ProtectedRoute = ({ ...props }) => loggedIn ? <Route {...props}/> : <Redirect to="/"/>;

export default ProtectedRoute
