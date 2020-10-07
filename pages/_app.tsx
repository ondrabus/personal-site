import { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';


function MyApp({ Component, pageProps, router: { route } }: AppProps) {
  return <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={route} />
      </AnimatePresence>
}

export default MyApp
