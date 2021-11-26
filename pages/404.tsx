
import Head from 'next/head';
import React from 'react';

const NotFound: React.FC = () => {

  return (
    <React.Fragment>
      <Head>
        <title>Not found - Ondrej Polesny</title>
        <meta property="og:title" content="Not found - Ondrej Polesny" />
      </Head>
      <main>
          <section className="content">
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist. <a href="https://twitter.com/ondrabus" title="Get in touch">Tell me</a> what you're looking for.</p>
          </section>
      </main>
    </React.Fragment>
  )
}

export default NotFound;
