import { Flex } from '@chakra-ui/react';
import { Footer } from './Footer';
import { HeadTag } from './HeadTag';
import { Navbar } from './Navbar';
import Script from 'next/script';

export default function MainLayout({ title, description, children }) {
  return (
    <Flex as="main" direction="column" minH="100vh">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-L2QHSC5PVL"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-L2QHSC5PVL');
        `}</Script>
      <HeadTag title={title} description={description} />
      <Navbar />
      {children}
      <Footer />
    </Flex>
  );
}
