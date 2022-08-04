import Head from 'next/head';
import { blogDescription, blogTitle } from '../constants';

export const HeadTag = ({ title, description }) => {
  return (
    <Head>
      <title>{title || blogTitle}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description || blogDescription} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
