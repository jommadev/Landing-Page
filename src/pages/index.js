import RootLayout from '@/components/Layouts/RootLayout';
import InvestCalculator from '@/components/UI/InvestCalculator';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
/* import HeroImage from '../assets/images/hero_image.svg'; */
/* import landingImage1 from '../assets/images/landing-page-image-1.svg'; */
import BankInterestRate from '@/components/UI/BankInterestRate';
import Choose from '@/components/UI/Choose';
import News from '@/components/UI/News';
import NewsVideo from '@/components/UI/NewsVideo';
import Partner from '@/components/UI/Partner';
import Subscription from '@/components/UI/Subscription';
import TradingTuesday from '@/components/UI/TradingTuesday';
import Link from 'next/link';
import { useRouter } from 'next/router';
import rightArrow from '../assets/images/right-arrow.svg';
import ButtonSecondary from '@/components/UI/ButtonSecondary';
import ButtonPrimary from '@/components/UI/ButtonPrimary';
import HelpCenter from '@/components/UI/HelpCenter';
import Contact from '@/components/UI/Contact';
import TopInformation from '@/components/UI/TopInformation';

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
					content="Explore Jomma, the premier investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!"
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

				<TopInformation />
			<div className={`container mb-5`}>
				<News />
			</div>
			<div className={isMobileView ? 'container' : ''}>
				<div
					className="container news-videos-background"
					style={{ borderRadius: '4px' }}
				>
					<h1 className="text-center video-section-header">
						Videos Picked For You
					</h1>
					<NewsVideo />
				</div>
			</div>

			{/* TODO: google ads */}
			<div className="container mt-5">
				<h1 className="text-center video-section-header">
					Why Choose Jomma for Your Next Investment
				</h1>
				<div className="d-flex justify-content-center mb-4">
					<Link
						href={process.env.NEXT_PUBLIC_SIGNUP_UR}
						className="link-signup mt-2"
					>
						Signup Today{' '}
						<span>
							<Image src={rightArrow} alt="signup-link"></Image>
						</span>
					</Link>
				</div>

				<Choose />
			</div>

			<div className=" news-videos-background">
				<div className="container">
					<h1 className="text-center video-section-header">Trading Tuesdays</h1>
					<TradingTuesday mobileNumber={isMobileView}/>
				</div>
			</div>

			<InvestCalculator />

			{/* TODO: google ads */}

			<Subscription />

			{/* <div className="container mt-5">
				<h1 className="text-center video-section-header">
					Compare Interest Rate
				</h1>

				<BankInterestRate />
			</div> */}
			<div className="container mt-5">
				<h1 className="text-center video-section-header">Jomma Partners</h1>

				<Partner />
			</div>

			<Contact isMobileView={isMobileView}/>
			{/* TODO: google ads */}
			<div
				className=' mt-5'
			>
				
					<h1 className="text-center video-section-header">
					Help Center
					</h1>
					<div className="d-flex justify-content-center mb-4">
					<Link
						href={'/information'}
						className="link-help-center mt-lg-2"
					>
						Go To Help Center
					</Link>
				</div>


				<HelpCenter isMobileView={isMobileView}/>

					
			</div>
		</>
	);
};

export default LandingPage;

LandingPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
