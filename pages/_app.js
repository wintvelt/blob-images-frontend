import React, { useReducer } from 'react';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '../src/aws-amplify/config';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Nav from '../src/Nav';
import Footer from '../src/Footer';
import { initialUser, userReducer, UserContext } from '../src/UserContext';

Amplify.configure(amplifyConfig);

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const [user, setUser] = useReducer(userReducer, initialUser);
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
            await Auth.currentSession();
            const user = await Auth.currentUserInfo();
            setUser({ user: user.attributes });
        }
        catch (e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setUser({isAuthenticating: false});
    }

    return (
        <React.Fragment>
            <Head>
                <title>Photo Duck</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <UserContext.Provider value={{ user, setUser }}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Nav />
                    <Component {...pageProps} />
                    <Footer />
                </ThemeProvider>
            </UserContext.Provider>
        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};