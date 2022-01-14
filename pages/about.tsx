import { GetStaticProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { IPageViewModel } from '@/viewModels/pageViewModel';
import { motion } from 'framer-motion';
import KontentService from '@/services/KontentService';
import { createRichTextHtmlResolver, linkedItemsHelper } from '@kentico/kontent-delivery';
import { Page } from '@/models/page';
import { BlockWithImage } from '@/models/block_with_image';
import { nodeParser } from '@kentico/kontent-delivery-node-parser'
import { projectModel } from '@/models/_project';

interface IPageProps {
  pageData: IPageViewModel
}

export const getStaticProps: GetStaticProps = async ({preview}) => {
  console.log(`Loading about page content, preview mode is ${!!preview}`);

  const pageData = (await KontentService.Instance(preview).deliveryClient.item<Page>("about").toPromise()).data
  console.log(pageData.item.elements.content.value)
  const resolvedContent = createRichTextHtmlResolver(nodeParser).resolveRichText({
    element: pageData.item.elements.content,
    linkedItems: linkedItemsHelper.convertLinkedItemsToArray(pageData.linkedItems),
    contentItemResolver: (codename, contentItem) => {
      if (contentItem && contentItem.system.type === projectModel.contentTypes.block_with_image.codename) {
        const blockWithImage = contentItem as BlockWithImage
        return {
          contentItemHtml:
            `<section itemScope itemType="http://schema.org/Blog" class="content alternating"
              data-kontent-component-id="${blockWithImage.system.id}"
              data-kontent-add-button
              data-kontent-add-button-insert-position="after"
              data-kontent-add-button-render-position="bottom">
                <div class="img">
                    <img src="${blockWithImage.elements.image.value[0].url}" alt="${blockWithImage.elements.title.value}" />
                </div>
                <div class="text">
                    <h2>${blockWithImage.elements.title.value}</h2>
                    ${blockWithImage.elements.content.value}
                </div>
            </section>`
        }
      }
      return {
        contentItemHtml: ''
      }
    }
  }).html.replace(/<object.*?data-sdk-resolved=\"1\".*?>(.*?)<\/object>/ms, '$1')
  
  
  const props = {
    pageData: {
        id: pageData.item.system.id,
        content: resolvedContent
    }
  }
  
  return { props };
}

const About: React.FC<IPageProps> = ({ pageData }) => {

  return (
    <React.Fragment>
      <Head>
        <title>About - Ondrabus</title>
        <meta property="og:title" content="About - Ondrej Polesny" />
      </Head>
      <main
        data-kontent-item-id={pageData.id} 
        data-kontent-element-codename={projectModel.contentTypes.page.elements.content.codename}>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        dangerouslySetInnerHTML={{__html: pageData.content}}>
        </motion.div>
      </main>
    </React.Fragment>
  )
}

export default About;
