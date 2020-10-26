import React, { useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Hero from '../components-home/Hero';

import AuthDialog from '../components-login/AuthDialog';
import { useUser } from '../data/userData';
import useActiveRoot from '../data/activeTreeRoot';

const divStyle = {
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const PrivatePage = (props) => {
    const { user, setPath } = useUser();
    useActiveRoot();
    useEffect(() => {
        if (!user.isAuthenticated && !user.isAuthenticating) setPath('/login');
    }, [user.isAuthenticating, user.isAuthenticated]);
    console.log({user});
    return (!user.isAuthenticated) ?
        <main>
            <Hero url='/img/delay.jpg'>
                <Toolbar />
                <div style={divStyle}>
                    {(user.isAuthenticating) ?
                        <CircularProgress />
                        : null
                    }
                </div>
            </Hero>
            <AuthDialog noClose />
        </main>
        : props.children
}

export default PrivatePage