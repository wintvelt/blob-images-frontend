import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap"
            rel="stylesheet"></link>
          <style dangerouslySetInnerHTML={{
            __html: `html {
                scroll-behavior: smooth;
              }`
          }} />
          <style>
            {`
            .pulse {
              width: 100%;
              height: 100%;
              animation: pulse 1s alternate infinite;
            }

            @keyframes pulse {
              0% {
                background-color: #E2DFE6;
                color: #E2DFE6;
              }
              100% {
                background-color: #ccc9cf;
                color: #ccc9cf;
              }
            }
            `}
          </style>
        </Head>
        <body style={{
          background: 'linear-gradient(355deg, rgba(70,52,78,1) 10%, rgba(90,85,96,1) 90%)'
        }}>
          <Main />
          <NextScript />
        </body>
      </html>
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
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};