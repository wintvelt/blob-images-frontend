import React, { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import UserDrawer from './UserDrawer';

const PrivatePage = (props) => {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    useEffect(() => {
        if (!user || !user.user) {
            console.log('redirect');
        } else {
            console.log('logged in');
        }
    }, []);

    return <div style={{ display: 'flex' }}>
        <UserDrawer />
        <div style={{ flex: 1 }}>
            {props.children}
        </div>
    </div>
}

export default PrivatePage