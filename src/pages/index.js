import RootLayout from '@/components/Layouts/RootLayout';
import InvestCalculator from '@/components/UI/InvestCalculator';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GoogleAd from '@/components/Shared/GoogleAds/GoogleAd';
import Choose from '@/components/UI/Choose';
import Contact from '@/components/UI/Contact';
import News from '@/components/UI/News';
import NewsVideo from '@/components/UI/NewsVideo';
import Partner from '@/components/UI/Partner';
import PcView from '@/components/UI/TopInformation/PcView';
import { useGetTopListQuery } from '@/redux/api/apiSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';
import rightArrow from '../assets/images/right-arrow.svg';
import MobileView from '../components/UI/TopInformation/MobileView';
import PcHelpCenter from '@/components/UI/HelpCenter/PcViewHelpCenter';
import MobileViewHelpCenter from '@/components/UI/HelpCenter/MobileViewHelpCenter';
import PcTradingTuesday from '@/components/UI/TradingTuesday/PcTradingTuesday';
import MobileTradingTuesday from '@/components/UI/TradingTuesday/MobileTradingTuesday';

const LandingPage = () => {
	const router = useRouter();
	const [isMobileView, setIsMobileView] = useState(false);

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 768) {
				setIsMobileView(false);
			} else {
				setIsMobileView(true);
			}
		}

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleGetStart = () => {
		router.push(`${process.env.NEXT_PUBLIC_SIGNUP_URL}`);
	};
	const handleGoMarketPage = () => {
		router.push(`${process.env.NEXT_PUBLIC_MARKET_URL}`);
	};
	const { data, isLoading, isSuccess } = useGetTopListQuery();

	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<title>
					Jomma: Investment Marketplace | Open BO Account, Trade Stocks & Mutual
					Funds in Bangladesh
				</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta
					name="description"
					content="Open BO account, invest in stocks, mutual funds and Brac EPL. Learn trading with our game. Join Jomma today. | BO অ্যাকাউন্ট খুলুন, শেয়ার, মিউচুয়াল ফান্ড ও ব্র্যাক ইপিএলে  বিনিয়োগ করুন। আমাদের গেমের মাধ্যমে ট্রেডিং শিখুন। আজই জমায় যোগ দিন!"
				/>
				<meta
					name="keywords"
					content="investment marketplace, open BO account, trade stocks, buy mutual funds, market news, financial news, BRAC EPL Investments, trading game, learn stock market, Bangladesh"
				></meta>
				<link rel="canonical" href="https://jomma.online/" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta
					property="og:title"
					content="Jomma: Investment Marketplace | Open BO Account, Trade Stocks & Mutual Funds in Bangladesh"
				/>
				<meta
					property="og:description"
					content="Explore Jomma, the premier investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!"
				/>
				<meta property="og:url" content="https://jomma.online/" />
				<meta
					property="article:publisher"
					content="https://facebook.com/jomma.online"
				/>
				<meta
					property="article:modified_time"
					content="2023-11-02T05:56:44+00:00"
				/>
				<meta
					property="og:image"
					content="https://jomma.online/content-images/jomma-home-logo.png"
				/>
				<meta property="og:image:width" content="1920" />
				<meta property="og:image:height" content="1080" />
				<meta property="og:image:type" content="image/png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content="Jomma: Investment Marketplace | Open BO Account, Trade Stocks & Mutual Funds in Bangladesh"
				/>
				<meta
					name="twitter:description"
					content="Explore Jomma, the premier investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!"
				/>
				<meta
					name="twitter:image"
					content="https://jomma.online/content-images/jomma-home-logo.png"
				/>
				<meta name="twitter:site" content="@jomma_online" />
				<meta name="twitter:label1" content="Est. reading time" />
				<meta name="twitter:data1" content="3 minutes" />
				<script type="application/ld+json">
					{`
							{
							"@context": "https://schema.org",
							"@type": "WebPage",
							"name": "Jomma: Investment Marketplace | Open BO Account, Trade Stocks & Mutual Funds in Bangladesh",
							"description": "Explore Jomma, the premier investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!",
							"publisher": {
								"@type": "Organization",
								"name": "Jomma",
								"url": "https://jomma.online",
								"logo": "https://jomma.online/content-images/jomma-home-logo.png"
							}
							}
						`}
				</script>
			</Head>
			{/* Google Tag Manager (noscript) */}
			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-MJKHBBG"
					height="0"
					width="0"
					style={{ display: 'none', visibility: 'hidden' }}
				></iframe>
			</noscript>
			{/* End Google Tag Manager (noscript) */}

			<div
				class="container py-3"
				style={{ backgroundColor: '#E0F6F5', borderRadius: '4px' }}
			>
				<div class="background-section ">
					<div class="overlay-content">
						{isMobileView ? <PcView data={data} /> : <MobileView data={data} />}
					</div>
				</div>
			</div>

 
			<div className={`container section-margin`}>
				<h2 className="text-center video-section-header">
					News Highlights Today
				</h2>
				<News />
			</div>


			{/* Google Ads */}
			<GoogleAd slotID={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_SQUARE} />



			<div className={isMobileView ? 'container section-margin' : 'section-margin'}>
				<div
					className="container news-videos-background"
					style={{ borderRadius: '4px' }}
				>
					<h2 className="text-center video-section-header">
						Finance Videos Picked For You
					</h2>
					<NewsVideo />
				</div>
			</div>

			{/* TODO: google ads */}
			<div className="container section-margin-v2">
				<h1 className="text-center video-section-header">
					Choose Jomma for Your Next Investment
				</h1>
				<Choose />
				<div className="d-flex justify-content-center">
					<Link
						href={process.env.NEXT_PUBLIC_SIGNUP_URL}
						className="link-signup mt-2"
					>
						Signup Today{' '}
						<span>
							<Image src={rightArrow} alt="signup-link"></Image>
						</span>
					</Link>
				</div>

				
			</div>

			<div className={isMobileView ? 'container section-margin' : 'section-margin'}>
			<div className=" news-videos-background">
					<h2 className="text-center video-section-header">Trading Tuesdays</h2>
					{isMobileView ? <PcTradingTuesday isMobileView={isMobileView} /> : <MobileTradingTuesday isMobileView={isMobileView} />}
				</div>
			</div>

			<InvestCalculator />

			{/* Google Ads */}
			<GoogleAd slotID={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_SQUARE} />

			{/* <Subscription />

			<div className="container mt-5">
				<h1 className="text-center video-section-header">
					Compare Interest Rate
				</h1>

				<BankInterestRate />
			</div> */}
			<div className="container section-margin">
				<h2 className="text-center video-section-header">Jomma Partners</h2>

				<Partner />
			</div>

			<Contact isMobileView={isMobileView} />

			{/* Google Ads */}
			<GoogleAd slotID={process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT_ID_SQUARE} />



			<div className="section-margin">
				<h2 className="text-center video-section-header">Help Center</h2>
				<div className="d-flex justify-content-center mb-4">
					<Link href={'/information'} className="link-help-center">
						Go To Help Center
					</Link>
				</div>

				{isMobileView ? <PcHelpCenter isMobileView={isMobileView} /> : <MobileViewHelpCenter isMobileView={isMobileView} />}
			</div>
		</>
	);
};

export default LandingPage;

LandingPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
