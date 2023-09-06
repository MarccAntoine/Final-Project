import React from 'react';
import { Redirect, Route } from 'react-router-dom';

//This functions protects the routes from being accessible to non-auth users
const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
    {...rest}
    render={(props) =>
        isAuthenticated ? (
        <Component {...props} />
        ) : (
        <Redirect to="/" />
        )
    }
    />
    );

export default ProtectedRoute;