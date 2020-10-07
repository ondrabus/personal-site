import Header from '@/components/header';
import Footer from '@/components/footer';
import Head from 'next/head';
import React from 'react';

const About: React.FC = () => {

  return (
    <div className="wrapper">
      <Head>
        <title>Not found - Ondrabus</title>
        <meta property="og:title" content="Not found - Ondrabus" />
      </Head>
      <Header className="withBackground fixed"></Header>
      <main>
          <section className="content">
              <h1>Page not found</h1>
              <p>The page you are looking for does not exist. <a href="https://twitter.com/ondrabus" title="Get in touch">Tell me</a> what you're looking for.</p>
          </section>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default About;
