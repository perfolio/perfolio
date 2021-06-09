import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
