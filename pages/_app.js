import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '../src/aws-amplify/config';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import theme from '../src/theme';
import Nav from '../src/Nav';
import Footer from '../src/Footer';
import { UserContext, initialUser, getUserInfo } from '../src/components-generic/UserContext';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import '../src/styles.css';

Amplify.configure(amplifyConfig);

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useState(initialUser);
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        onLoad();
    }, []);

    async function onLoad() {
        try {
            // await Auth.currentSession();
            const user = await getUserInfo();
            setUser((oldUser) => ({
                ...oldUser,
                profile: user,
                isAuthenticated: !!user.id,
                isAuthenticating: false
            }));
        }
        catch (e) {
            setUser((oldUser) => ({ ...oldUser, isAuthenticating: false }));
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Photo Duck</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <UserContext.Provider value={{ user, setUser }}>
                    <SnackbarProvider maxSnack={3}>
                        <RecoilRoot>
                            <CssBaseline />
                            <Nav />
                            <Component {...pageProps} />
                            <Footer />
                        </RecoilRoot>
                    </SnackbarProvider>
                </UserContext.Provider>
            </ThemeProvider>
        </React.Fragment >
    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};