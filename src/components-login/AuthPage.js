import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import Paper from '@material-ui/core/Paper';

import Hero from '../components-home/Hero';
import AuthForms from './AuthForms';
import { useUserValue } from '../data/userData';
import { useSetLoadingPath } from '../data/loadingData';
import { useSnackbar } from 'notistack';

const AuthPage = () => {
    const router = useRouter();
    const routerPath = router.pathname;
    const user = useUserValue();
    const userPath = user.path;
    const firstRender = useRef(true);
    const setLoadingPath = useSetLoadingPath();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        // console.log({ userPath, routerPath })
        if (firstRender.current) {
            // console.log('first render')
            firstRender.current = false;
            return;
        }
        if (userPath !== routerPath) {
            // console.log(`redirecting to ${userPath}`);
            setLoadingPath(userPath || '/');
        }
    }, [userPath]);
    
    useEffect(() => {
        if (user.isAuthenticated) {
            enqueueSnackbar('Je bent al ingelogd, dus gaan we terug naar je groepen');
            setLoadingPath('/personal/groups');
        }
    }, [user.isAuthenticated]);

    return (
        <main>
            <Hero
                url='/img/cover.jpg'
            >
                <Paper>
                    <AuthForms path={routerPath} isPage={true} />
                </Paper>
            </Hero>
        </main >
    )
}

export default AuthPage;