import React, { useEffect } from 'react';
import { useUser } from '../components-generic/UserContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Hero from '../components-home/Hero';
import LoginForm from '../components-login/LoginForm';

const PrivatePage = (props) => {
    const { user, setDialog } = useUser(true);
    useEffect(() => {
        if (!user.isAuthenticated && !user.isAuthenticating) setDialog({ showLogin: true });
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
                        : <LoginForm title='Log in to continue' />
                    }
                </div>
            </Hero>
        </main>
        : props.children
}

export default PrivatePage