import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';

import Hero from '../components-home/Hero';
import AuthForms from './AuthForms';
import { useUserValue } from '../data/userData';

const AuthPage = () => {
    const router = useRouter();
    const routerPath = router.pathname;
    const user = useUserValue();
    const userPath = user.path;
    const firstRender = useRef(true);

    useEffect(() => {
        // console.log({ userPath, routerPath })
        if (firstRender.current) {
            // console.log('first render')
            firstRender.current = false;
            return;
        }
        if (userPath !== routerPath) {
            // console.log(`redirecting to ${userPath}`);
            router.push(userPath || '/');
        }
    }, [userPath]);

    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <Paper>
                    <AuthForms path={routerPath} />
                </Paper>
            </Hero>
        </main >
    )
}

export default AuthPage;