import styles from '@/styles/home/home.module.css';
import Image from 'next/image';
import brac from '../../../assets/images/brac_epl.svg';
import logo from '../../../assets/images/mobile_jomma_logo.svg';
/* import trading_game from '../../../assets/images/featured_trading_game.png';
import trading_game_mobile from '../../../assets/images/featured_trading_game-mobile.png';
import epl from '../../../assets/images/featured_EPL.png';
import epl_mobile from '../../../assets/images/featured_EPL-mobile.png'; */
import trading_game from '../../../assets/images/test3.png';
import trading_game_mobile from '../../../assets/images/test1.png';
import epl from '../../../assets/images/test4.png';
import epl_mobile from '../../../assets/images/test2.png';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';

const FeaturedCard = ({isMobileView}) => {
	const router = useRouter();

	const handleGoInvestmentThemes = () =>{
		const selectedItems = [
			{
			  ACCOUNT_NAME: "Midway Securities Limited",
			  BANK_ACC_NO: "3101093011001",
			  BANK_BRANCH: "Dhaka South, Principal Branch",
			  BANK_NAME: "The City Bank",
			  FIN_ID: 8,
			  FIN_PROD_ID: 601,
			  FUND_MANAGER_ID: null,
			  IS_FLOOR_FLAG: 0,
			  ORDER_SL: null,
			  PROD_NAME: "Brac Thematic",
			  TRADE_CODE: "BRACEPLT",
			  TRANS_UNIT: 1,
			  UNIT_PRICE: 1,
			  YEAR_TO_DATE: 0
			}
		  ];

		  const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/selected-investment-themes-session/${process.env.NEXT_PUBLIC_BUY_REQ}`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						authorization: `${getCookies('accessToken').accessToken}`,
					},
					body: JSON.stringify(selectedItems),
				}
			);

			const information = await response.json();
		};

		fetchData();

		router.push({
			pathname: '/investment-themes/buy-investment-themes/investment-themes-units',
		});
	}

	const handleGoGame = () =>{
		router.push({
			pathname: '/trading-game',
		});
	}
	return (
		<>
			<div className={`${styles.featuredSection}`}>
				<div className="container py-lg-3 py-3">
					<p className={`${styles.featuredTitle} mb-0`}>Featured</p>

					<div className="row mt-0 mb-lg-3 gy-3">
						<div className={`${styles.featuredCardSize} col-lg-3 col-md-4 col-sm-6 col-6`}>
							<div className={`${styles.featuredCard} d-flex flex-column h-100`} onClick={handleGoInvestmentThemes} style={{ cursor: 'pointer' }}>
								<p className={`${styles.featureTitle}`}>BRAC EPL Wealth Management</p>
								<div className='d-flex align-items-center h-100'>
									<ul className={`${styles.featureBody}`}>
										<p className='mb-2'>Invest in Stocks & Bonds</p>
										<p className='mb-2'>Risk managed by experts</p>
										<p className='mb-2'>Start with Tk 1000 only</p>
									</ul>
								</div>
							<div className="mt-auto">
								<div className="d-flex justify-content-center">
								<Image src={brac} layout="responsive" className={`${styles.featuredImageSize}`} alt="featured-company" />
								</div>
							</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<div className={`${styles.featuredCard} d-flex flex-column h-100`} onClick={handleGoGame} style={{ cursor: 'pointer', backgroundColor:'#FFF0A4' }}>
								<p className={`${styles.featureTitle} px-lg-3`}>Jomma Trading Game</p>
								<div className='d-flex align-items-center h-100'>
									<ul className={`${styles.featureBody}`}>
										<p className='mb-2'>Learn how to trade</p>
										<p className='mb-2'>Click to Enter</p>
									</ul>
								</div>
							<div className="mt-auto"> 
								<div className="d-flex justify-content-center">
								<Image src={logo} layout="responsive" className={`${styles.featuredImageSize}`} alt="featured-company" />
								</div>
							</div>
							</div>
						</div> 
						{/* <div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<Image src={test} alt='' layout=' ' style={{borderRadius:'8px'}} className={`${styles.testClassName}`}/>
						</div> */}
						{
							isMobileView ?
							<>
							<div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<Image src={epl} alt='' layout=' ' style={{borderRadius:'8px'}} className={`${styles.testClassName} `}/>
						</div>

							<div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<Image src={trading_game} alt='' layout=' ' style={{borderRadius:'8px'}} className={`${styles.testClassName}`}/>
						</div>

							</>
							:
							<>
							<div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<Image src={epl_mobile} alt='' layout=' ' style={{borderRadius:'4px'}} className={`${styles.testClassName}`}/>
						</div>

							<div className="col-lg-3 col-md-4 col-sm-6 col-6">
							<Image src={trading_game_mobile} alt='' layout=' ' style={{borderRadius:'4px'}} className={`${styles.testClassName}`}/>
						</div>

							</>
						}
						
					</div>

					

				</div>
			</div>
		</>
	);
};

export default FeaturedCard;
