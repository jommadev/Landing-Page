import styles from '@/styles/prefund/prefund.module.css';
import { useEffect, useState } from 'react';
import BankTransfer from './BankTransfer/BankTransfer';
import Bkash from './Bkash/Bkash';
import OnlinePayment from './OnlinePayment/OnlinePayment';
import { ClientID, calculatePercentage } from '@/utils/prefundUtils';
const PrefundDetails = ({ isMobileView, clientId, data }) => {
	const [amount, setAmount] = useState('');
	const [netPrefundAmountByBkash, setNetPrefundAmountByBkash] = useState(0);
	const [bkashTransFee, setBkashTransFee] = useState(0);
	const [netPrefundAmountByOnlinePayment, setNetPrefundAmountByOnlinePayment] = useState(0);
	const [onlinePaymentFee, setOnlinePaymentFee] = useState(0);
	const [netPrefundAmountByCard, setNetPrefundAmountByCard] = useState(0);
	const [cardPaymentFee, setCardPaymentFee] = useState(0);
	const [netPrefundAmountBybankTransfer, setNetPrefundAmountBybankTransfer] = useState(0);
	const [activeTab, setActiveTab] = useState('pills-bkash');



	const handleTabClick = (tabId) => {
		setActiveTab(tabId);
	};

	const handleAmount = (event) => {
		const inputAmount = event.target.value.replace(/[^0-9.]/g, '');
		setAmount(inputAmount);
		setNetPrefundAmountBybankTransfer(inputAmount)
		setNetPrefundAmountByBkash(inputAmount - calculatePercentage(inputAmount, 1))
		setBkashTransFee(calculatePercentage(inputAmount, 1));

		setNetPrefundAmountByOnlinePayment(inputAmount - calculatePercentage(inputAmount, 1.95))
		setOnlinePaymentFee(calculatePercentage(inputAmount, 1.95))

		setNetPrefundAmountByCard(inputAmount - calculatePercentage(inputAmount, 2.2))
		setCardPaymentFee(calculatePercentage(inputAmount, 2.2))

		//setNetPrefundAmountBybankTransfer(calculatePercentage(inputAmount, 0))
	};

	

	return (
		<>
			<p className="text-center mb-2">Prefund Amount (Tk)</p>

			<div className={`${styles.amountInptArea}`}>
				<input
					type="text"
					placeholder="Enter Amount"
					className={`${styles.searchInput} text-center`}
					value={amount}
					onChange={handleAmount}
				/>
				<p className="mt-2 mb-1" style={{ color: '#E4572E', fontSize: '12px' }}>
					Minimum Prefund Amount: Tk 1000
				</p>
				<p className="mb-1" style={{ color: '#6A6A6E', fontSize: '12px' }}>
					Reference Number: {clientId}
				</p>
			</div>

			<div className="container">
				<div
					className="tab-content my-lg-4 my-4 course_web_view"
					id="pills-tabContent"
				>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-bkash' ? 'show active' : ''
						}`}
						id="pills-bkash"
						role="tabpanel"
						aria-labelledby="pills-bkash-tab"
					>
						<p className={`${styles.refundTitle}`}>Broker Refund policy</p>
						<div className="bank-info-divider my-2"></div>
						<p className={`${styles.refundDiscription}`}>
							The Broker will credit funds to your BO account upon successful
							settlement of your payment/deposit to the Broker’s bank account,
							which may take up to 2 working days. In case of payment/deposit
							settlement failure to the Broker’s bank account, your funds will
							be returned to your relevant financial account according to
							Bangladesh Electronic Funds Transfer Network (BEFTN) rules. <br />{' '}
							The Broker does not offer refunds for payments/deposits made to
							add funds to your BO Account. Once funds are credited to your BO
							account, you may place a BO account fund ‘Withdrawal’ request to
							the Broker.
						</p>
					</div>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-online-payment' ? 'show active' : ''
						}`}
						id="pills-online-payment"
						role="tabpanel"
						aria-labelledby="pills-online-payment-tab"
					>
						<p className={`${styles.refundTitle}`}>Broker Refund policy</p>
						<div className="bank-info-divider my-2"></div>
						<p className={`${styles.refundDiscription}`}>
							The Broker will credit funds to your BO account upon successful
							settlement of your payment/deposit to the Broker’s bank account,
							which may take up to 2 working days. In case of payment/deposit
							settlement failure to the Broker’s bank account, your funds will
							be returned to your relevant financial account according to
							Bangladesh Electronic Funds Transfer Network (BEFTN) rules. <br />{' '}
							The Broker does not offer refunds for payments/deposits made to
							add funds to your BO Account. Once funds are credited to your BO
							account, you may place a BO account fund ‘Withdrawal’ request to
							the Broker.
						</p>
					</div>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-bank-transfer' ? 'show active' : ''
						}`}
						id="pills-bank-transfer"
						role="tabpanel"
						aria-labelledby="pills-bank-transfer-tab"
					>
						<p className={`${styles.refundTitle}`}>Broker Refund policy</p>
						<div className="bank-info-divider my-2"></div>
						<p className={`${styles.refundDiscription}`}>
							The Broker will credit funds to your BO account upon successful
							settlement of your payment/deposit to the Broker’s bank account,
							which may take up to 2 working days. In case of payment/deposit
							settlement failure to the Broker’s bank account, your funds will
							be returned to your relevant financial account according to
							Bangladesh Electronic Funds Transfer Network (BEFTN) rules. <br />{' '}
							The Broker does not offer refunds for payments/deposits made to
							add funds to your BO Account. Once funds are credited to your BO
							account, you may place a BO account fund ‘Withdrawal’ request to
							the Broker.
						</p>
					</div>
				</div>

				<ul
					className="nav nav-pills my-2 custom-active-bar web-nav-tabs-view"
					id="pills-tab"
					role="tablist"
				>
					<li className="nav-item" role="presentation">
						<button
							className={`nav-link custom-nav-link py-1 ${
								activeTab === 'pills-bkash' ? 'active' : ''
							}`}
							onClick={() => handleTabClick('pills-bkash')}
							type="button"
							role="tab"
							aria-selected={activeTab === 'pills-bkash'}
						>
							bKash
						</button>
					</li>
					<li className="nav-item px-lg-4 px-2" role="presentation">
						<button
							className={`nav-link custom-nav-link py-1 ${
								activeTab === 'pills-online-payment' ? 'active' : ''
							}`}
							onClick={() => handleTabClick('pills-online-payment')}
							type="button"
							role="tab"
							aria-selected={activeTab === 'pills-online-payment'}
						>
							Online Payment
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button
							className={`nav-link custom-nav-link py-1 ${
								activeTab === 'pills-bank-transfer' ? 'active' : ''
							}`}
							onClick={() => handleTabClick('pills-bank-transfer')}
							type="button"
							role="tab"
							aria-selected={activeTab === 'pills-bank-transfer'}
						>
							Bank Transfer
						</button>
					</li>
				</ul>

				<div
					className="tab-content mt-lg-4 mt-3 mb-2 course_web_view"
					id="pills-tabContent"
				>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-bkash' ? 'show active' : ''
						}`}
						id="pills-bkash"
						role="tabpanel"
						aria-labelledby="pills-bkash-tab"
					>
						<Bkash 
						isMobileView={isMobileView} 
						netPrefundAmountByBkash = {netPrefundAmountByBkash} 
						data={data} 
						clientId={clientId}
						bkashTransFee={bkashTransFee}
						amount={amount}
						/>
					</div>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-online-payment' ? 'show active' : ''
						}`}
						id="pills-online-payment"
						role="tabpanel"
						aria-labelledby="pills-online-payment-tab"
					>
						<OnlinePayment 
						isMobileView={isMobileView} 
						netPrefundAmountByOnlinePayment={netPrefundAmountByOnlinePayment} 
						netPrefundAmountByCard={netPrefundAmountByCard}
						data={data}  
						amount={amount}
						clientId={clientId}
						onlinePaymentFee={onlinePaymentFee}
						cardPaymentFee={cardPaymentFee}
						/>
					</div>
					<div
						className={`tab-pane fade ${
							activeTab === 'pills-bank-transfer' ? 'show active' : ''
						}`}
						id="pills-bank-transfer"
						role="tabpanel"
						aria-labelledby="pills-bank-transfer-tab"
					>
						<BankTransfer 
						isMobileView={isMobileView} 
						netPrefundAmountBybankTransfer={netPrefundAmountBybankTransfer} 
						data={data}  
						amount={amount} 
						clientId={clientId}/>
					</div>
				</div>
			</div>
		</>
	);
};

export default PrefundDetails;
