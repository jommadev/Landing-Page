import ButtonPrimary from '@/components/UI/ButtonPrimary';
import BankInformation from '@/components/UI/Dashboard/Information/BankInformation/BankInformation';
import styles from '@/styles/prefund/prefund.module.css';
import { convertImage } from '@/utils/convertImage';
import { getCookies } from 'cookies-next';
import Image from 'next/image';
import { useEffect, useId, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import uploadImageIcon from '@/assets/images/upload-icon-jomma-color.svg';
import { useRouter } from 'next/router';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import copy from '@/assets/images/btn-copy.svg';
import Select from 'react-select';
import stylesProducts from '@/styles/products/products.module.css';
import { useGetOnboardingBanksQuery } from '@/redux/api/apiSlice';

const BankTransfer = ({ isMobileView,data, payoutType, orderId }) => {
	const [bankReceiptImage, setbankReceiptImage] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState('');
	const [
		createbankReceipttImageObjectURL,
		setCreatebankReceipttImageObjectURL,
	] = useState();
	const [tooltipText, setTooltipText] = useState('Copy!');

	const [selectedBank, setSelectedBank] = useState(null);
	const [bankOptions, setBankOptions] = useState(null);
	const [isDisabled, setIsDisabled] = useState(false);


  const router = useRouter();

	const uploadToClientBankReceipt = (event) => {
		if (event.target.files && event.target.files[0]) {
			let singleFrontImage = event.target.files[0];
			setSelectedFileName(singleFrontImage.name);

			if (singleFrontImage.size < 500000) {
				//.5kb
				setbankReceiptImage(singleFrontImage);
				setCreatebankReceipttImageObjectURL(
					URL.createObjectURL(singleFrontImage)
				);
			} else {
				convertImage(singleFrontImage)
					.then((resizedBlob) => {
						setbankReceiptImage(resizedBlob);
						setCreatebankReceipttImageObjectURL(
							URL.createObjectURL(resizedBlob)
						);
					})
					.catch((error) => {
						// Handle errors here
						console.error('Error:', error);
					});
			}
		}
	};

	/* get all bank information */
	const {
		data: allBank,
		isLoading,
		error,
		refetch,
	} = useGetOnboardingBanksQuery();
	/* const { data: userInfo, isLoading: userInfoLoading, error: userInfoError } = useGetGlobalInfoQuery(); */

	/* set bank name in dropdown */
	useEffect(() => {
		setBankOptions(
			allBank?.data?.bank?.map((bank) => ({
				value: bank?.bank_code,
				label: bank?.bank_name,
			}))
		);
	}, [allBank]);

	/* set selected bank account */
	const handleBankChange = (bankName) => {
		setSelectedBank(bankName);
	};


	/* copy text */
	const copyText = (entryText) => {
		navigator.clipboard.writeText(entryText);
		toast.success('Copied!');
	};


	const handleBankTransfer = async () => {
		
		if (!selectedBank?.value) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Please select bank name.',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		if (!bankReceiptImage) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Please upload your Bank Rceipt.',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		setIsDisabled(true);

		const investmentThemes = new FormData();
		investmentThemes.append('bankTransferReceipt', bankReceiptImage);
		investmentThemes.append('payout_type', payoutType);
		investmentThemes.append('BROKER_CHARGE', 0);
		investmentThemes.append('FIN_ID', data?.FIN_ID);
		investmentThemes.append('FIN_PROD_ID', data?.FIN_PROD_ID);
		investmentThemes.append('INVEST_AMOUNT', data?.TOTAL_AMOUNT);
		investmentThemes.append('ORDER_AMOUNT', data?.TOTAL_AMOUNT);
		investmentThemes.append('ORDER_REQ_ID', orderId);
		investmentThemes.append('TRANS_UNIT', data?.TRANS_UNIT);
		investmentThemes.append('UNIT_PRICE', data?.UNIT_PRICE);
		investmentThemes.append('PAYMENT_GATEWAY_CHARGE', 0);
		investmentThemes.append('PAY_AMT', data?.TOTAL_AMOUNT);
		investmentThemes.append('BANK_CODE', selectedBank?.value);
		investmentThemes.append('payment_status', 'I');
		investmentThemes.append('P15_SELECT_PAY', 3);



		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/saved-buyInvestmentThemes`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						authorization: `${getCookies('accessToken').accessToken}`,
					},
					body: investmentThemes,
				}
			);
			
			if(response.ok){
				router.push('/product/success')
			}else{
				const errorData = await response.json();
				Swal.fire({
					position: "center",
					icon: "error",
					text: errorData.message,
					showConfirmButton: false,
					timer: 2000,
					allowOutsideClick: false,
				allowEscapeKey: false,
				});
				setIsDisabled(false);
			}
		};

		fetchData();



		/* const financialInfo = new FormData();

		financialInfo.append('receipt', bankReceiptImage);
		financialInfo.append('request_type', 'A');
		financialInfo.append('user_bank_name', data?.data?.BANK_NAME);
		financialInfo.append('user_bank_branch', data?.data?.BANK_BRANCH);
		financialInfo.append('user_bank_ac_no', data?.data?.BANK_AC_NO);
		financialInfo.append('current_balance', data?.data?.ACC_BALANCE);
		financialInfo.append('user_bo_account', data?.data?.BO_ACC_NO);
		financialInfo.append('trans_fee', 0);
		financialInfo.append('prefund_amount', parseFloat(amount));
		financialInfo.append('payment_mode', 3);
		financialInfo.append('payment_amount', parseFloat(amount));
		financialInfo.append('pay_bank_name', 'Midway Securities Ltd');
		financialInfo.append(
			'pay_bank_branch',
			'Graphics Building Branch, Motijheel'
		);
		financialInfo.append('pay_bank_acc_no', '1513204465100001');
		financialInfo.append('entry_by', data?.data?.USER_PHONE);
		financialInfo.append('bank_code', data?.data?.BANK_CODE);
		financialInfo.append('dist_code', data?.data?.DIST_CODE);
		financialInfo.append('branch_code', data?.data?.BRANCH_CODE); 

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_API_URL}/prefund/banktransfer`,
			{
				method: 'POST',
				headers: {
					authorization: `${getCookies('accessToken').accessToken}`,
				},
				body: financialInfo,
			}
		);

    if (response.ok) {
       router.push('/prefund/verify?status=ACCEPTED');
    } else {
      const errorData = await response.json();
      Swal.fire({
        position: "center",
        icon: "error",
        text: errorData.message, // Assuming the error message is in the 'message' property
        showConfirmButton: false,
        timer: 2000,
      });
    }*/



	};
	return (
		<>
			<div className="table-responsive container mt-3 px-0">
				<table className="table table-striped custom-stripe" id="my-custom-table">
					<thead style={{ backgroundColor: '#2C7C7A' }}>
						<tr>
							<th
								className="table-header-history"
							>
								Online Payment Convenience Fee
							</th>
							<th className="table-header-history">Net Prefund Amount (Tk)</th>
						</tr>
					</thead>
					<tbody>
						<tr className="custom-border-bottom">
							<td className="table-tr-padding profile-value-td text-center">0.00</td>

							<td className="table-tr-padding profile-value-td text-center">{data?.TOTAL_AMOUNT ? formatNumberWithCommasAndDecimal(data?.TOTAL_AMOUNT - 0) : 0}</td>
								
						</tr>
					</tbody>
				</table>
			</div>

			<p className={`${styles.refundTitle} px-3 py-2`}>
					Please transfer the total amount to the following bank account
				</p>
				<div className="bank-info-divider"></div>
				<>
					<div>
						<div className="d-flex justify-content-between align-items-center px-3 py-2">
							<p className="bank-information-title">
								Account Name: &nbsp;
								<span className="bank-information-title-span">
									{data?.ACCOUNT_NAME}
								</span>
							</p>
							<Image
								src={copy}
								alt="btnCopy"
								className="btn-copy-text"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title={tooltipText}
								onClick={() => copyText(data?.ACCOUNT_NAME)}
							/>
						</div>
						<div className="bank-info-divider"></div>
						<div className="px-3 py-2">
							<p className="bank-information-title">
								Bank Name: &nbsp;
								<span className="bank-information-title-span">
									{data?.BANK_NAME}
								</span>
							</p>
						</div>
						<div className="bank-info-divider"></div>
						<div className="d-flex justify-content-between align-items-center px-3 py-2">
							<p className="bank-information-title">
								Bank Account Number: &nbsp;
								<span className="bank-information-title-span">
									{data?.BANK_ACC_NO}
								</span>
							</p>
							<Image
								src={copy}
								alt="btnCopy"
								className="btn-copy-text"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title={tooltipText}
								onClick={() => copyText(data?.BANK_ACC_NO)}
							/>
						</div>
						<div className="bank-info-divider"></div>
						<div className="px-3 py-2">
							<p className="bank-information-title">
								Bank Branch Name: &nbsp;
								<span className="bank-information-title-span">
									{data?.BANK_BRANCH}
								</span>
							</p>
						</div>
						<div className="bank-info-divider"></div>
					</div>
				</>

			{/* <div
				className="mt-3"
				style={{
					padding: '16px 16px',
					borderRadius: '4px',
					backgroundColor: '#E1F3F3',
				}}
			>
				<p className="bank-information-title mb-2">
					Please Upload Bank Receipt&nbsp;<span className='text-danger'>*</span>
				</p>

				<input
					type="file"
					name="bankReceipt"
					id="bankReceipt"
					onChange={uploadToClientBankReceipt}
					accept="image/*"
					hidden
				/>
				<label htmlFor="bankReceipt" className={`${styles.customFileUpload}`}>
					<span>
						<Image src={uploadImageIcon} alt="upload file" className="mb-1" />{' '}
						Upload/ Take Photo
					</span>
				</label>
				{selectedFileName && (
					<p className="bank-information-title mb-0 mt-2">
						Selected file: {selectedFileName}
					</p>
				)}
			</div> */}

			<div className={`${stylesProducts.OrderConformationDetails} mt-4`}>
					<p className="bank-information-title text-center mb-1">
					Select the bank you  transferred from&nbsp;<span className="text-danger">*</span>
					</p>
					<Select
						styles={{
							control: (baseStyles, state) => ({
								...baseStyles,
								border: 0,
								boxShadow: 'none',
							}),
							option: (baseStyles, state) => ({
								...baseStyles,
								color: '#000',
								fontSize: '14px',
								backgroundColor: state.isFocused ? '#DEEAEA' : 'white',
								backgroundColor: state.isSelected ? '#2C7C7A' : 'white',
								color: state.isSelected ? '#fff' : '#000',
								':hover': {
									backgroundColor: '#DEEAEA',
								},
							}),
							singleValue: (baseStyles) => ({
								...baseStyles,
								color: '#000',
								fontSize: '14px',
								fontWeight: '400',
							}),
						}}
						className={`${stylesProducts.selecrCustomeDropDown}`}
						isClearable
						isSearchable
						name="bankName"
						id="bankName"
						placeholder={'Bank Name'}
						value={selectedBank}
						onChange={handleBankChange}
						options={bankOptions}
						instanceId={useId()}
					/>
				</div>

				<div
					className="mt-3"
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<div>
						<p className="bank-information-title text-center mb-2">
							Please upload bank transfer receipt&nbsp;
							<span className="text-danger">*</span>
						</p>

						<div
							className="d-flex justify-content-center "
							style={{ flexDirection: 'column' }}
						>
							<input
								type="file"
								name="bankReceipt"
								id="bankReceipt"
								onChange={uploadToClientBankReceipt}
								accept="image/*"
								hidden
							/>
							<label
								htmlFor="bankReceipt"
								className={`${styles.customFileUpload} text-center`}
							>
								<span>
									<Image
										src={uploadImageIcon}
										alt="upload file"
										className="mb-1"
									/>{' '}
									Upload Photo
								</span>
							</label>
							{selectedFileName && (
								<p className="bank-information-title mb-0 mt-2 text-center">
									Selected file: {selectedFileName}
								</p>
							)}
						</div>
					</div>
				</div>

			<div className="d-flex justify-content-center mt-5">
				<ButtonPrimary
					onClick={handleBankTransfer}
					size={!isMobileView ? 'custom-small' : 'custom-medium'}
					isDisabled={isDisabled}
				>
					Confirm Order
				</ButtonPrimary>
			</div>
		</>
	);
};

export default BankTransfer;
