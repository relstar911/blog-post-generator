import React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingIndicator from '@/components/LoadingIndicator';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ErrorBoundary>
      {isLoading && <LoadingIndicator />}
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
