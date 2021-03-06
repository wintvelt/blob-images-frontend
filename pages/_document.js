import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

const bodyStyle = {
    backgroundImage: 'url(/img/fabric_plaid.png)'
    // backgroundImage: 'url(/img/farmer.png)'
    // background: 'linear-gradient(355deg, rgba(70,52,78,1) 10%, rgba(90,85,96,1) 90%)'
    // backgroundColor: 'white'
};

export default class MyDocument extends Document {
    render() {
        return (<Html xmlns="http://www.w3.org/1999/xhtml" lang="en" prefix="og: http://ogp.me/ns#">
            <Head >
                { /* Google tag manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
const isClient = (typeof window !== 'undefined');
if (isClient) {
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M6L83BM');
};`,
                    }}
                />
                { /* PWA primary color */}
                <meta name="theme-color"
                    content={theme.palette.primary.main} />
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                { /* <link href="https://unpkg.com/filepond/dist/filepond.css" rel="stylesheet" /> */}
                <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
                    rel="stylesheet" />
            </Head>
            <body
                style={bodyStyle}
            >
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M6L83BM"
                    height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                </noscript>
                <Main />
                <NextScript />
            </body>
        </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(< App {...props}
            />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};