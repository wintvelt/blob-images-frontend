import React from 'react';
import PropTypes from 'prop-types';
import { RecoilRoot } from 'recoil';
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from '../src/aws-amplify/config';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

import theme from '../src/theme';
import Nav from '../src/Nav';
import Footer from '../src/Footer';
import LoadingBar from '../src/LoadingBar';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import '../src/styles.css';
import ErrorBoundary from '../src/components-generic/ErrorBoundary';

Amplify.configure(amplifyConfig);

export default function MyApp(props) {
    const { Component, pageProps } = props;
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
        // set right doctype for download
        const newDoctype = document && document.implementation.createDocumentType(
            'html',
            "PUBLIC",
            "-//W3C//DTD XHTML 1.0 Strict//EN",
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
        );
        if (document?.doctype) {
            document.replaceChild(newDoctype, document.doctype);
        } else {
            document && document.insertBefore(newDoctype, document.childNodes[0]);
        }
    }, []);
    return (
        <React.Fragment>
            <Head>
                <title>clubalmanac</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <ErrorBoundary>
                    <SnackbarProvider maxSnack={3}>
                        <RecoilRoot>
                            <CssBaseline />
                            <Nav />
                            <Component {...pageProps} />
                            <Footer />
                            <LoadingBar />
                        </RecoilRoot>
                    </SnackbarProvider>
                </ErrorBoundary>
            </ThemeProvider>
        </React.Fragment >
    );
}

MyApp.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};