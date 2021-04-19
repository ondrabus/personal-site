
import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';


interface ITwitterPageProps {
  timestamp: string,
  followersCount: number
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const time = await (await fetch(`http://worldclockapi.com/api/json/utc/now`)).json();
  const data = await (await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=ondrabus`)).json();

  return {
    props: {
      timestamp: time.currentDateTime,
      followersCount: data[0].followers_count
    }
  };
}
  
const Twitter: React.FC<ITwitterPageProps> = ({ timestamp, followersCount }) => {

  return (
    <React.Fragment>
      <Head>
        <title>Twitter - Ondrabus</title>
        <meta property="og:title" content={`Ondrabus has ${followersCount} followers`} />
      </Head>
      <main>
          <section className="content twitter">
              <h1>Follow me on <a href="https://twitter.com/ondrabus" title="Twitter">Twitter</a></h1>
              <p>And see this page update 😎. As of {`${timestamp}`} I have <strong>{followersCount}</strong> followers</p>
          </section>
      </main>
    </React.Fragment>
  )
}

export default Twitter;
