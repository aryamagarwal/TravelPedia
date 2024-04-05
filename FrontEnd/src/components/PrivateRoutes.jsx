import React from 'react';
import {Navigate} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
//import of context
import {IsLoggedInContext}  from '../App';
function PrivateRoutes() {
    //using IsLoggedIn Context from App.jsx
const {isLoggedIn} = React.useContext(IsLoggedInContext);
    //if user is logged in return the children
  return isLoggedIn ? <Outlet/> : <Navigate to="/LogIn" />;
}

export default PrivateRoutes;
