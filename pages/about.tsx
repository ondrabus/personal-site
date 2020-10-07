import Header from '@/components/header';
import Footer from '@/components/footer';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import ContentService from '@/services/ContentService';
import { IPageViewModel } from '@/viewModels/pageViewModel';
import { motion } from 'framer-motion';

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
    <motion.div className="wrapper"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}>
      <Head>
        <title>About - Ondrabus</title>
        <meta property="og:title" content="About - Ondrabus" />
      </Head>
      <Header className="withBackground fixed"></Header>
      <main dangerouslySetInnerHTML={{__html: pageData.content}}>
      </main>

      <Footer></Footer>
    </motion.div>
  )
}

export default About;
