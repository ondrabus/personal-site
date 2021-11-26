import { GetStaticProps } from 'next';
import Head from 'next/head';
import BlogPosts from '@/components/blogPosts';
import React from 'react';
import { transformContent } from '@/helpers/contentHelpers';
import { IContentViewModel } from '@/viewModels/contentViewModel';
import { ITaxonomyItemViewModel } from '@/viewModels/taxonomyItemViewModel';
import { motion } from 'framer-motion';
import KontentService from '@/services/KontentService';
import { projectModel } from '@/models/_project';
import { Content } from '@/models/content';


interface IBlogProps {
  content: IContentViewModel[],
  tags: ITaxonomyItemViewModel[],
  types: ITaxonomyItemViewModel[],
  selectedTag?: string,
  selectedType?: string
};

export async function getStaticPaths() {
  const contentTags = await KontentService.Instance().getTaxonomyItems(projectModel.taxonomies.content_tags.codename)
  const contentTypes = await KontentService.Instance().getTaxonomyItems(projectModel.taxonomies.content_type.codename)
  
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

  const allContent = await KontentService.Instance(preview).getItems<Content>(projectModel.contentTypes.content.codename)
  const articles = transformContent(allContent.sort((a,b) => (new Date(b.elements.date.value ?? '')).getTime()-(new Date(a.elements.date.value ?? '')).getTime()));
  const contentTags = await KontentService.Instance(preview).getTaxonomyItems(projectModel.taxonomies.content_tags.codename)
  const contentTypes = await KontentService.Instance(preview).getTaxonomyItems(projectModel.taxonomies.content_type.codename)

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
    <React.Fragment>
      <Head>
        <title>Published content - Ondrej Polesny</title>
        <meta property="og:title" content="Published content - Ondrej Polesny" />
        <link rel="canonical" href="/blog" />
      </Head>
      <main>
        <section className="content blog-posts">
          <h1>Content</h1>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
              <BlogPosts content={content} tags={tags} types={types} selectedTag={selectedTag} selectedType={selectedType} />
          </motion.div>
        </section>
      </main>
    </React.Fragment>
  )
}

export default Blog;
