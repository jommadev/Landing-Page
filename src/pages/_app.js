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
  const router = useRouter();

  useEffect(() => {
    // Google Tag Manager
    const handleRouteChange = (url) => {
      window.dataLayer.push({
        event: "pageview",
        page: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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

      {/* Facebook Pixel Code */}
      <Script strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '893506848615408');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=893506848615408&ev=PageView&noscript=1"
        />
      </noscript>

      {/* Google Tag Manager */}
      <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-L32DWYPCW2" />
      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L32DWYPCW2');
        `}
      </Script>
      <Script strategy="lazyOnload">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MJKHBBG');
        `}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google AdSense */}
      <Script strategy="lazyOnload" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8548079288419529" crossorigin="anonymous" />
    </>
  );
}
