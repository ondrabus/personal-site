import Header from '../../components/header';
import Footer from '../../components/footer';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import BlogPosts from '../../components/blogPosts';
import React from 'react';
import ContentService from '../../services/ContentService';
import { transformContent } from '../../helpers/contentHelpers';
import { IContentViewModel } from '../../viewModels/contentViewModel';
import { ITaxonomyItemViewModel } from '../../viewModels/taxonomyItemViewModel';


interface IBlogProps {
  content: IContentViewModel[],
  tags: ITaxonomyItemViewModel[],
  types: ITaxonomyItemViewModel[],
  selectedTag?: string,
  selectedType?: string
};

export async function getStaticPaths() {
  const contentService = new ContentService(false);
  const contentTags = await contentService.getContentTags();
  const contentTypes = await contentService.getContentTypes();
  
  const paths = contentTags.terms.map(t => ['tag', t.codename]).concat(contentTypes.terms.map(t => ['type', t.codename])).map(t => ({ 'params': { 'filter': t }}));
  // add also blog page index without tags and types
  paths.push({'params': {'filter': []}});

  return {
    paths: paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({preview, params}) => {
  
  console.log(`Loading blog page content, preview mode is ${!!preview}`);

  const selectedFilter = params?.filter ?? [null, null];
  const selectedFilterType = selectedFilter[0] ?? null;
  const selectedFilterValue = selectedFilter[1] ?? null;

  const contentService = new ContentService(preview ?? false);
  const allContent = await contentService.getAllContent();
  const articles = transformContent(allContent.sort((a,b) => (b.date.value ?? new Date()).getTime()-(a.date.value ?? new Date()).getTime()));
  const contentTags = await contentService.getContentTags();
  const contentTypes = await contentService.getContentTypes();

  const props = {
    content: articles,
    tags: contentTags.terms.map(t => ({
        codename: t.codename,
        text: t.name,
    })),
    types: contentTypes.terms.map(t => ({
        codename: t.codename,
        text: t.name
    })),
    selectedTag: selectedFilterType == "tag" ? selectedFilterValue : null,
    selectedType: selectedFilterType == "type" ? selectedFilterValue : null
  };

  return { props };
}

const Blog: React.FC<IBlogProps> = ({ content, tags, types, selectedTag, selectedType }) => {

  return (
    <div className="wrapper">
      <Head>
        <title>Published content - Ondrabus</title>
        <meta property="og:title" content="Published content - Ondrabus" />
        <link rel="canonical" href="/blog" />
      </Head>
      <Header className="withBackground fixed"></Header>

      <main>

        <BlogPosts content={content} tags={tags} types={types} selectedTag={selectedTag} selectedType={selectedType} />

      </main>

      <Footer></Footer>
      
    </div>
  )
}

export default Blog;
