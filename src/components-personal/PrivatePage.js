import React, { useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Hero from '../components-home/Hero';

import AuthDialog from '../components-login/AuthDialog';
import { useUser } from '../data/userData';

const PrivatePage = (props) => {
    const { user, setPath } = useUser();
    useEffect(() => {
        if (!user.isAuthenticated && !user.isAuthenticating) setPath('/login');
    }, [user.isAuthenticating, user.isAuthenticated]);
    return (!user.isAuthenticated) ?
        <main>
            <Hero url='/img/delay.jpg'>
                <Toolbar />
                <div style={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
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