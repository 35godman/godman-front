import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={''}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@100;200;300;400;500;600;700;900&display=swap"
            rel="stylesheet"
          />

          <script
            src="http://localhost:5050/static/scripts/embed-script.js"
            defer
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
