// Your Next.js page or component

import styles from '@/styles/home/home.module.css';
import { formatNumberWithCommasAndInt } from '@/utils/formatNumberWithCommasAndDecimal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import brac from '../../../assets/images/brac_epl.svg';
import strategy from '../../../assets/images/calculator-strategy.svg';
import icon from '../../../assets/images/invest_calculator_goal.svg';
import mutual from '../../../assets/images/product_mutual.svg';
import stock from "../../../assets/images/product_stock.svg"
import planner from "../../../assets/images/fplanner-savings.svg"
import thematic from '../../../assets/images/product_thematic.svg';
import blank from '../../../assets/images/blank-logo.svg';
import fplannerMutual from '../../../assets/images/fplanner-mutual-funds.png';
import fplannerStock from '../../../assets/images/fplanner-stock.png';
import InvestCalculatorRadioButton from '../../Shared/InvestCalculatorRadioButton';
import { useRouter } from 'next/router';

const InvestCalculator = ({ page }) => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState('0.09');
	const [amount, setAmount] = useState(500000);
	const [year, setYear] = useState(5);
	const [monthlyReturn, setMonthlyReturn] = useState(0);
	const [totalInvest, setTotalInvest] = useState(0);
	const [totalGain, setTotalGain] = useState(0);

	const handleRadioChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const changeAmount = (event) => {
		const getAmount = event.target.value.replace(/[^0-9]/g, '');
		setAmount(getAmount);
	};
	const changeYear = (event) => {
		const getYear = event.target.value.replace(/[^0-9]/g, '');
		setYear(getYear);
	};

	useEffect(() => {
		let period = 12;

		const n = amount * (parseFloat(selectedOption) / period);
		const d = (1 + parseFloat(selectedOption) / period) ** (period * year) - 1;

		const monthly_return = n / d;
		setMonthlyReturn(monthly_return);
		const total_investment_amount = monthly_return * period * year;
		setTotalInvest(total_investment_amount);
		const total_gain_amount = amount - total_investment_amount;
		setTotalGain(total_gain_amount);
	}, [selectedOption, amount, year]);

	const handlePageRedirect = (redirectPage) =>{
		if(redirectPage === "themematic"){
			router.push(`${process.env.NEXT_PUBLIC_THEMATIC_URL}`);
		}else if(redirectPage ==="mutual"){
			router.push(`${process.env.NEXT_PUBLIC_FUND_URL}`);
		}else if(redirectPage ==="saving"){
			router.push(`${process.env.NEXT_PUBLIC_SAVING_URL}`);
		}else{
			router.push(`${process.env.NEXT_PUBLIC_STOCKS_URL}`);
		}
		//router.push()
	}

	return (
		<div
			className={` pt-2 ${styles.investCalculatorSectionLanding}`}
		>
			<div className="container">
				
					<>
						<p
							className={`${styles.investCalculatorTitleLanding} mb-0 text-center`}
						>
							Investment Calculator
						</p>
					</>


				<div className={`${styles.calculatorInputArea}`}>
					<div className="d-flex align-items-center mb-2 mb-lg-0">
						<Image src={icon} alt="icon" />
						<p className={`${styles.calculatorAmountInputText} ${styles.calculatorAmountInputTextMobile} mx-2 mb-0`}>
							I want to save
						</p>
					</div>
					<div className="d-flex justify-content-center align-items-center mt-0">
					<p className={`${styles.calculatorAmountInputText} me-2 mb-0`}>
						Tk
						</p>
						<input
							className={`${styles.calculatorAmountInput}`}
							type="text"
							value={amount}
							onChange={changeAmount}
						/>
						<p className={`${styles.calculatorAmountInputText} mx-2 mb-0`}>
							within
						</p>
						<input
							className={`${styles.calculatorAmountInput} ${styles.calculatorYearInput}`}
							type="text"
							value={year}
							onChange={changeYear}
						/>
						<p className={`${styles.calculatorAmountInputText} mx-2 mb-0`}>
							years
						</p>
					</div>
				</div>

				<div className="d-flex justify-content-center mb-lg-3 mb-2">
					<InvestCalculatorRadioButton
						label="I like to play it safe"
						value="0.07"
						checked={selectedOption === '0.07'}
						onChange={handleRadioChange}
					/>
					<InvestCalculatorRadioButton
						label="I’m somewhere in the middle"
						value="0.09"
						checked={selectedOption === '0.09'}
						onChange={handleRadioChange}
					/>
					<InvestCalculatorRadioButton
						label="I like to hit big sixes"
						value="0.10"
						checked={selectedOption === '0.10'}
						onChange={handleRadioChange}
					/>
				</div>

				<div className={`${styles.resultAmoutArea}`}>
					<p className={`${styles.resultAmoutTitle} mb-0`}>
						Monthly Investment (Tk)
					</p>

					<p className={`${styles.resultAmout} mb-0`}>
						{formatNumberWithCommasAndInt(monthlyReturn)}
					</p>
				</div>

				<div className={`${styles.resultAmoutSummaryArea}`}>
					<div className="row">
						<div className="col-lg-8 col-md-7 col-sm-6 col-6">
							<div className={`${styles.resultAmoutAreaPart}`}>
								<p className={`${styles.resultAmoutSummaryText}`}>
									Investment (Tk):
								</p>
								<p className={`${styles.resultAmoutSummaryAmount}`}>
									{formatNumberWithCommasAndInt(totalInvest)}
								</p>
							</div>
						</div>
						<div
							className="col-lg-4 col-md-5 col-sm-6 col-6"
							style={{
								backgroundColor: '#D3FCCE',
								borderTopRightRadius: '50px',
								borderBottomRightRadius: '50px',
							}}
						>
							<div className={`${styles.resultAmoutAreaPart}`}>
								<p className={`${styles.resultAmoutSummaryText}`}>Gain (Tk):</p>
								<p className={`${styles.resultAmoutSummaryAmount}`}>
									{formatNumberWithCommasAndInt(totalGain)}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="d-flex justify-content-center align-items-center mb-1 mb-lg-3">
					<Image src={strategy} alt="strategy" className={`${styles.strategyImage}`} />
					<p className={`${styles.strategy} mb-0`}>Choose Your Strategy</p>
				</div>

				<div className="d-flex justify-content-center mb-3">
              {
                selectedOption === "0.09" &&
                <>
                  <div className={`${styles.card} p-0`} style={{ cursor:'pointer' }} onClick={()=>handlePageRedirect('themematic')}>
                    <div className={`${styles.customCardbody} card-body`}>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <Image
                          src={thematic}
                          alt="BRAC EPL Investments"
                          layout="responsive"
                          className={`${styles.productImageSize}`}
                        />
                        <p
                          className={`${styles.ProductThematicTitle} ${styles.ProductStocksTitleSize}`}
                        >
                          Investment Themes
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles.customCardFooter} card-footer w-100 text-center`}
                    >
                      <Image
                        src={brac}
                        alt="company"
                        layout=""
                        className={`${styles.footerCompanySize}`}
                      />
                    </div>
                  </div>

                  <div className={`${styles.card} p-0`} style={{ cursor:'pointer' }} onClick={()=>handlePageRedirect('mutual')}>
                    <div className={`${styles.customCardbody} card-body`}>
                      <div className="d-flex justify-content-center align-items-center flex-column">
                        <Image
                          src={mutual}
                          alt="Mutual Funds"
                          layout=""
                          className={`${styles.productImageSize}`}
                        />
                        <p
                          className={`${styles.ProductMutualTitle} ${styles.ProductStocksTitleSize}`}
                        >
                          Mutual Funds
                        </p>
                      </div>
                    </div>
                    <div
                      className={`${styles.customCardFooter} card-footer w-100 text-center`}
                    >
                      <Image
                        src={fplannerMutual}
                        alt="company"
                        layout=""
                        className={`${styles.footerCompanySize}`}
                      />
                    </div>
                  </div>
                </>
              }
					
              {
                selectedOption === "0.10" &&
                <div className={`${styles.card} p-0`} style={{ cursor:'pointer' }} onClick={()=>handlePageRedirect('stocks')}>
                  <div className={`${styles.customCardbody} card-body`}>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <Image
                        src={stock}
                        alt="Stocks"
                        layout=""
                        className={`${styles.productImageSize}`}
                      />
                      <p className={`${styles.ProductStocksTitle} ${styles.ProductStocksTitleSize}`}>Stocks</p>
                    </div>
                  </div>
                  <div
                    className={`${styles.customCardFooter} card-footer w-100 text-center`}
                  >
                    <Image
                      src={fplannerStock}
                      alt="company"
                      layout=""
                      className={`${styles.footerCompanySize}`}
                    />
                  </div>
                </div>

              }

					

              {
                selectedOption === "0.07" &&
                <div className={`${styles.card} p-0`} style={{ cursor:'pointer' }} onClick={()=>handlePageRedirect('saving')}>
                  <div className={`${styles.customCardbody} card-body`}>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <Image
                        src={planner}
                        alt="Savings"
                        layout="responsive"
                        className={`${styles.productImageSize}`}
                      />
                      <p
                        className={`${styles.ProductMutualTitle} ${styles.ProductStocksTitleSize}`} style={{ color: "#5c5959"}}
                      >
                        Savings
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${styles.customCardFooter} card-footer w-100 text-center`}
                  >
                    <Image
                      src={blank}
                      alt="company"
                      layout=""
                      className={`${styles.footerCompanySize}`}
                    />
                  </div>
                </div>
              }

				</div>

				<p className={`${styles.disclaimer} pb-lg-3`}>
					Disclaimer: Estimated figures are based on hypothetical assumptions
					about investment performance or returns. The figures shown above may
					be subject to government taxes and other charges applied by financial
					service providers. All investments are subject to risk of financial
					loss and past performance does not indicate future returns. Estimated
					figures shown above are for educational purposes and Jomma will not
					bear any liability for financial losses experienced by investors based
					on their own investment decisions.
				</p>
			</div>
		</div>
	);
};

export default InvestCalculator;
