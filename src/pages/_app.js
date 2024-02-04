import { store } from "@/redux/store";
import "@/styles/globals.css";
import Script from "next/script";
import { Provider } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Inter } from 'next/font/google'
import { getCookies } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ['latin'] })


export default function App({ Component, pageProps }) {

/*   const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Add your own logic here to check if the user is authenticated
      const userIsAuthenticated = checkUserAuthentication();

      if (!userIsAuthenticated && url === '/protected-page') {
        router.replace('/login');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []); */
  /* const router = useRouter();
  useEffect(() => {
    const handleRouteChange = async (url) => {
      const token = getCookies('accessToken').accessToken;
      const nextUrl = new URL(url, window.location.origin);

      console.log('token and pathname:', { token: token, pathname: nextUrl.pathname });

      if (!token) {
        const redirectUrl = new URL("/login", window.location.origin);
        redirectUrl.searchParams.set("redirect", nextUrl.pathname);
        //console.log('Redirecting to login:', redirectUrl.toString());
        //router.replace(redirectUrl.toString());
        router.replace(redirectUrl.toString());
          return;
      }

      // Perform asynchronous operations here if needed...

      //const userIsAuthenticated = await checkUserAuthentication();

      if (!userIsAuthenticated && nextUrl.pathname === '/home') {
        router.replace('/login');
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []) */;


  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      {/* Add Bootstrap CSS */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />

      <main className={inter.className}>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </main>

      {/* Load Bootstrap JavaScript using next/script */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
    </>
  );
}