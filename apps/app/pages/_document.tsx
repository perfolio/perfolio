import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="Insights. For Everyone." />

          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/fav/favicon_96x96_dark_mode.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/fav/favicon_32x32_dark_mode.png"
          ></link>
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/fav/favicon_16x16_dark_mode.png"
          ></link>

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
