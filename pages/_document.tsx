import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-white loading">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument