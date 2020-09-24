import Header from '../components/header';
import Footer from '../components/footer';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import ContentService from '../services/ContentService';
import { IPageViewModel } from '../viewModels/pageViewModel';

interface IPageProps {
  pageData: IPageViewModel
}

export const getStaticProps: GetStaticProps = async ({preview}) => {
  console.log(`Loading about page content, preview mode is ${!!preview}`);

  const contentService = new ContentService(preview ?? false);
  const page = await contentService.getPage("about");
  
  const props = {
    pageData: {
        content: page.content.resolveHtml().replace(/<div[^>]*?type="application\/kenticocloud".*?>\s*(<section.*?>.*?<\/section>)\s*<\/div>/gs, '$1')
    }
  }
  
  return { props };
}

const About: React.FC<IPageProps> = ({ pageData }) => {

  return (
    <div className="wrapper">
      <Head>
        <title>About - Ondrabus</title>
        <meta property="og:title" content="About - Ondrabus" />
        <link rel="canonical" href="/about" />
      </Head>
      <Header className="withBackground fixed"></Header>
      <main dangerouslySetInnerHTML={{__html: pageData.content}}>
      </main>

      <Footer></Footer>
    </div>
  )
}

export default About;
