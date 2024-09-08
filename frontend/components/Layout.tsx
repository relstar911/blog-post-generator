import React, { ReactNode } from 'react';
import Head from 'next/head';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>AI-Powered Blog Post Generator</title>
        <meta name="description" content="Generate blog posts with AI assistance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
