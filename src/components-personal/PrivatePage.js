import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../UserContext';
import Hero from '../components-home/Hero';
import CircularProgress from '@material-ui/core/CircularProgress';

const PrivatePage = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const router = useRouter();
    const { asPath } = router;
    if (!user.isAuthenticated) {
        if (user.isAuthenticating) {
            console.log('no user, authenticating');
        } else {
            console.log('no user, NOT authenticating');
            router.push('/login?redirect='+asPath);
        }
    } else {
        if (user.isAuthenticating) {
            console.log('user, authenticating');
        } else {
            console.log('user, NOT authenticating');
        }
    }
    return (!user.isAuthenticated || user.isAuthenticating) ?
        <Hero url='/img/delay.jpg'>
            <div style={{
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </div>
        </Hero>
        : props.children
}

export default PrivatePage