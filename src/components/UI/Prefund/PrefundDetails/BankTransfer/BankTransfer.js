import ButtonPrimary from '@/components/UI/ButtonPrimary';
import BankInformation from '@/components/UI/Dashboard/Information/BankInformation/BankInformation';
import styles from '@/styles/prefund/prefund.module.css';
import { convertImage } from '@/utils/convertImage';
import { getCookies } from 'cookies-next';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import uploadImageIcon from '../../../../../assets/images/upload-icon-jomma-color.svg';
import { useRouter } from 'next/router';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';

const BankTransfer = ({
	isMobileView,
	netPrefundAmountBybankTransfer,
	data,
	clientId,
	amount,
}) => {
	const [bankReceipttImage, setbankReceiptImage] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const [
		createbankReceipttImageObjectURL,
		setCreatebankReceipttImageObjectURL,
	] = useState();
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
	const handleBankTransfer = async () => {
		if (!amount) {
			toast.error("Amount can't be empty");
			return 0;
		}
		if (parseFloat(amount) < 1000) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Minimum prefund amount: 1000 Tk',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		if (!bankReceipttImage) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Please upload your Bank Rceipt.',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		if (!data?.data?.BO_ACC_NO) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Your BO Account has not yet been opened. Please initiate pre-fund after BO account opening, which can take 1-2 working days.',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		setIsDisabled(true);

		const financialInfo = new FormData();

		financialInfo.append('receipt', bankReceipttImage);
		financialInfo.append('trans_ref_no', clientId);
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
		allowOutsideClick: false,
				allowEscapeKey: false,
      });
	  setIsDisabled(false);
    }
	};
	return (
		<>
			<div className="table-responsive container mt-3 px-0">
				<table className="table table-striped custom-stripe" id="my-custom-table">
					<thead style={{ backgroundColor: '#2C7C7A' }}>
						<tr>
							<th
								className="table-header-history"
								style={{ padding: '12px 16px' }}
							>
								Online Payment Convenience Fee
							</th>
							<th className="table-header-history">Net Prefund Amount (Tk)</th>
						</tr>
					</thead>
					<tbody>
						<tr className="custom-border-bottom">
							<td className="p-3 profile-value-td text-center">0.00</td>

							<td className="p-3 profile-value-td text-center">
								{formatNumberWithCommasAndDecimal(netPrefundAmountBybankTransfer ? netPrefundAmountBybankTransfer : 0)}
								
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p className={`${styles.refundTitle} mb-2 px-3`}>
				Please transfer the total amount to the following bank account
			</p>
			<div className="bank-info-divider"></div>

			<BankInformation />

			<div
				className="mt-3"
				style={{
					padding: '16px 16px',
					borderRadius: '4px',
					backgroundColor: '#E1F3F3',
				}}
			>
				<p className="bank-information-title mb-2">
					Please Upload Bank Receipt <span className='text-danger'>*</span>
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
			</div>

			<div className="d-flex justify-content-center mt-5">
				<ButtonPrimary
					onClick={handleBankTransfer}
					size={!isMobileView ? 'custom-small' : 'custom-medium'}
					isDisabled={isDisabled}
				>
					Agree & Proceed
				</ButtonPrimary>
			</div>
		</>
	);
};

export default BankTransfer;
