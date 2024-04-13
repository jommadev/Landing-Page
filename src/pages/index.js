import RootLayout from '@/components/Layouts/RootLayout';
import ButtonPrimary from '@/components/UI/ButtonPrimary';
import ButtonSecondary from '@/components/UI/ButtonSecondary';
import InvestCalculator from '@/components/UI/Home/InvestCalculator';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import brac from '../assets/images/BRAC_EPL_Investments_Ltd-Landing.svg';
import edge from '../assets/images/Edge-Asset-Management-logo.svg';
import midway from '../assets/images/Midway-Securities.svg';
/* import HeroImage from '../assets/images/hero_image.svg'; */
import HeroImage from '../assets/images/hero_image-svg.webp';
/* import landingImage1 from '../assets/images/landing-page-image-1.svg'; */
import { useRouter } from 'next/router';
import landingGif from '../assets/images/Select Stocks, Investment Themes, Mutual Funds & Bonds You want to Invest in.gif';
import btnInvestIcon from '../assets/images/investing-btn-icon.svg';
import landingDummy from '../assets/images/landing-page-choose-us.svg';
import landingImage1 from '../assets/images/landing-page-image-1.png';
import btnMarketData from '../assets/images/market-data-btn-icon.svg';
import santa from '../assets/images/shanta-logo-jomma-online.svg';

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
				<title>Jomma: Digital Investment Marketplace in Bangladesh | Open BO Account, Trade Stocks & Mutual Funds</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta name="description" content="Explore Jomma, the premier digital investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!" />
				<meta name="keywords" content="digital investment marketplace, open BO account, trade stocks, buy mutual funds, market news, financial news, BRAC EPL Investments, trading game, learn stock market, Bangladesh"></meta>
				<link rel="canonical" href="https://jomma.online/" />
				<meta property="og:locale" content="en_US" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Jomma: Digital Investment Marketplace in Bangladesh | Open BO Account, Trade Stocks & Mutual Funds" />
				<meta property="og:description" content="Jomma is a digital investment marketplace in Bangladesh for stocks, bonds and mutual funds. Invest now, secure your future." />
				<meta property="og:url" content="https://jomma.online/" />
				<meta property="article:publisher" content="https://facebook.com/jomma.online" />
				<meta property="article:modified_time" content="2023-11-02T05:56:44+00:00" />
				<meta property="og:image" content="https://jomma.online/content-images/jomma-home-logo.png" />
				<meta property="og:image:width" content="1920" />
				<meta property="og:image:height" content="1080" />
				<meta property="og:image:type" content="image/png" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Jomma: Digital Investment Marketplace in Bangladesh | Open BO Account, Trade Stocks & Mutual Funds" />
				<meta name="twitter:description" content="Jomma is a digital investment marketplace in Bangladesh for stocks, bonds and mutual funds. Invest now, secure your future." />
				<meta name="twitter:image" content="https://jomma.online/content-images/jomma-home-logo.png" />
				<meta name="twitter:site" content="@jomma_online" />
				<meta name="twitter:label1" content="Est. reading time" />
				<meta name="twitter:data1" content="3 minutes" />
				<script type="application/ld+json">
						{`
							{
							"@context": "https://schema.org",
							"@type": "WebPage",
							"name": "Jomma: Digital Investment Marketplace in Bangladesh",
							"description": "Explore Jomma, the premier digital investment marketplace in Bangladesh. Open BO account, trade stocks, mutual funds, and stay updated with market and financial news. Learn about the stock market with our trading game. Invest with confidence through expert advice from partners like BRAC EPL Investments. Sign up now!",
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

			<section className="container mb-4">
				<div className="row mt-2">
					<div className="col-lg-7" style={{ margin: 'auto 0' }}>
						<p className="hero-section-title">
							<span className="hero-section-title-mobile">Invest Now,</span>
							<br /> It’s Easier Than You Think
						</p>
						<h1 className="hero-section-short-text">
							Trade in Stocks, Investment Themes, Mutual Funds & Bonds
						</h1>
						<ButtonPrimary
							onClick={handleGetStart}
							size={!isMobileView ? 'custom-small' : 'custom-medium'}
						>
							Get Started
						</ButtonPrimary>
					</div>
					<div className="col-lg-5">
						<Image src={HeroImage} alt="jomma-investment-icon-hero" className='hero-image-size'/>
					</div>
				</div>
			</section>
			<InvestCalculator page={'landing'} />

			<section className="choose-us-section container mb-5 mt-lg-4 mt-3">
				<p className="choose-us-section-title text-center mb-4">
					Why Choose Us
				</p>

				<div className="row gy-4 mb-4">
					<div className="col-lg-6 col-md-6 col-sm-12 col-12 landing-page-image-area">
						<Image
							src={landingImage1}
							alt="Jomma Investment Hompage"
							layout="responsive"
							className="landing-page-image"
						/>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 col-12 text-end d-flex justify-content-end align-items-center">
						<div>
							<h2 className="choose-us-subTitle">Online BO Account Opening</h2>
							<p className="mb-0 choose-us-info choose-us-info-area">
								Open a BO account with Jomma’s affiliated broker from the
								comfort of your home.
							</p>
							<p className="choose-us-condition">
								No paperwork required, no visits to the Broker!
							</p>
						</div>
					</div>
				</div>

				<div className="row gy-4 mb-4">
					<div className="col-lg-6 col-md-6 col-sm-12 col-12 d-flex justify-content-start align-items-center choose-order1">
						<div>
							<h2 className="choose-us-subTitle">3 Easy Steps to Invest</h2>
							<li className="mb-0 choose-us-info">
								Select Stocks, Investment Themes, Mutual Funds or Bonds
							</li>
							<li className="mb-0 choose-us-info">Enter Investment Amount</li>
							<li className="mb-0 choose-us-info mb-3">Confirm Order</li>
							<ButtonSecondary
								onClick={handleGetStart}
								size={!isMobileView ? 'custom-small' : 'custom-medium'}
							>
							<div className="d-flex justify-content-center align-items-center">
								<Image src={btnInvestIcon} alt="jomma-invest-image-icon" className="me-1" />
								Start Investing
							</div>
							</ButtonSecondary>
						</div>
					</div>

					<div className="col-lg-6 col-md-6 col-sm-12 col-12 choose-order2">
						<Image src={landingGif} alt="jomma-why-choose-us-icon" layout="responsive" />
					</div>
				</div>

				<div className="row gy-4 mb-4">
					<div className="col-lg-7 col-md-7 col-sm-12 col-12">
						<Image src={landingDummy} alt="jomma-landing-page-icon" layout="responsive" />
					</div>
					<div className="col-lg-5 col-md-5 col-sm-12 col-12 text-end d-flex justify-content-end align-items-center">
						<div>
							<h2 className="choose-us-subTitle">Daily Market Information</h2>
							<p className="mb-0 choose-us-info mb-3 choose-us-info-area">
								Daily market information and price alerts delivered to you.
							</p>
							<ButtonSecondary
								onClick={handleGoMarketPage}
								size={!isMobileView ? 'custom-small' : 'custom-medium'}
							>
								<div className="d-flex justify-content-center align-items-center">
									<Image src={btnMarketData} alt="jomma-market-information-icon" className="me-1" />
									See Market Data
								</div>
							</ButtonSecondary>
						</div>
					</div>
				</div>
			</section>

			<section className="partner-section">
				<div className="container py-4">
					<p className="choose-us-section-title text-center mb-3 mt-0 mb-lg-5">
						Our Partners
					</p>

					<div className="row g-3 g-lg-5 g-md-4 mb-3">
						<div className="col-lg-3 col-md-3 col-sm-6 col-6 h-100 mt-4">
							<div className="partner">
								<Image src={midway} alt="Midway Securities: Jomma Partner" className="partnerimage" />
								<h2 className="mb-0 text-center partner-name">
									Midway Securities
								</h2>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-6 h-100 mt-4">
							<div className="partner">
								<Image src={brac} alt="BRAC EPL Investments Limited: Jomma Partner" className="partnerimage" />
								<h2 className="mb-0 text-center partner-name">
									Brac EPL Investments
								</h2>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-6 h-100 mt-4">
							<div className="partner">
								<Image src={edge} alt="Edge Asset Management: Jomma Partner" className="partnerimage" />
								<h2 className="mb-0 text-center partner-name">
									Edge Asset Management
								</h2>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-6 h-100 mt-4">
							<div className="partner">
								<Image src={santa} alt="Shanta Asset Management: Jomma Partner" className="partnerimage" />
								<h2 className="mb-0 text-center partner-name">
									Shanta Asset Management
								</h2>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LandingPage;

LandingPage.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
