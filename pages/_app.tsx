import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import KontentSmartLink from '@kentico/kontent-smart-link';
import React, { useEffect } from 'react';

function MyApp({ Component, pageProps, router: { route } }: AppProps) {
  useEffect(() => {
    const kontentSmartLink = KontentSmartLink.initialize({
      queryParam: 'preview-mode'    
    });
    return () => {
      kontentSmartLink.destroy();
    }; 
  });

  return <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={route} />
      </AnimatePresence>
}

export default MyApp
