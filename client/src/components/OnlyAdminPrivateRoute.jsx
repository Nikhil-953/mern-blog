import React from 'react'
import { useSelector } from 'react-redux';
import {Outlet,Navigate} from 'react-router-dom';

export default function OnlyPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>;
}
