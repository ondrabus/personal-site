import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import KontentSmartLink from '@kentico/kontent-smart-link';
import React, { useEffect } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';

function MyApp({ Component, pageProps, router: { route } }: AppProps) {
  useEffect(() => {
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'preview-mode'    
    });
    return () => {
      kontentSmartLink.destroy();
    }; 
  });
  console.log(route);

  return <React.Fragment>
    <div className="wrapper">
      <Header className={(route != "/" ? "withBackground fixed" : "")}></Header>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={route} />
      </AnimatePresence>
      <Footer></Footer>
    </div>
  </React.Fragment>

}

export default MyApp
