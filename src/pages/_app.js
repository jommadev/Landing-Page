/* eslint-disable @next/next/no-page-custom-font */
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
import mixpanel from "mixpanel-browser";
const inter = Inter({ subsets: ['latin'] })

mixpanel.init(`${process.env.NEXT_PUBLIC_PANEL_PROJECT_TOKEN}`, {
  debug: false,
  track_pageview: false,
  persistence: "localStorage",
});


export default function App({ Component, pageProps }) {


  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icons/touch-icon-ipad.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/touch-icon-iphone-retina.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icons/touch-icon-ipad-retina.png" />
      
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="format-detection" content="telephone=no" />
      {/* Add Bootstrap CSS */}
      <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wdth,wght@100,100..900&display=swap"
          rel="stylesheet"
        />
      
        <main className={inter.className}>
          <Provider store={store}>
            {getLayout(<Component {...pageProps} />)}
          </Provider>
        </main>
      
      {/* Load Bootstrap JavaScript using next/script */}
      <Script  src="https://fastly.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
	  
	  {/* Facebook Pixel Code */}
      <Script id="fb-pixel" strategy="lazyOnload">
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

      {/* Google Tag Manager */}
      <Script id="gtag-cdn" strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-L32DWYPCW2" />
      <Script id="gtag-js" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L32DWYPCW2');
        `}
      </Script>
      <Script id="gtag-js-2" strategy="lazyOnload">
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
      <Script id="google-adsense" strategy="lazyOnload" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8548079288419529" crossorigin="anonymous" />
    </>
  );
}