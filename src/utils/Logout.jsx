import React from 'react'
import axios from 'axios'
import { MenuItem, Typography } from '@mui/material';
import { useContext,useState } from 'react';
import { UserContext } from './UserContext';
import { Link,Navigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import LogoutIcon from '@mui/icons-material/Logout';
const Logout = ({onClick}) => {
    const [redirect,setRedirect] = useState(false);
    const {auth,user,setUser} = useContext(UserContext);

    async function logout() {
        await axios.post('/logout');
        setRedirect(true);
        setUser(null);
        onClick();
      }

      
    if (!auth) {
        return 'Loading...';
    }

    if (auth && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
  return (
        <MenuItem onClick={logout}>

            <IconButton >
                <LogoutIcon fontSize='medium' color='primary'  />
            </IconButton>
            <Typography whiteSpace='nowrap' textAlign="center">
                Logout

            </Typography>
        </MenuItem>
    )
}

export default Logout