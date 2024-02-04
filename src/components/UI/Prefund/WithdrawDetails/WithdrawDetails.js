import ButtonPrimary from '@/components/UI/ButtonPrimary';
import { useWithdrawPaymentMutation } from '@/redux/api/apiSlice';
import styles from '@/styles/prefund/prefund.module.css';
import { ClientID } from '@/utils/prefundUtils';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const WithdrawDetails = ({ isMobileView, data }) => {
	const [amount, setAmount] = useState('');
	const [clientId, setClientId] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	useEffect(()=>{
		setClientId(ClientID(data?.data?.MW_CLIENT_ID))
	  }, [data, amount]);

	const handleAmount = (event) => {
		const inputAmount = event.target.value.replace(/[^0-9]/g, '');
		setAmount(inputAmount);
	};



	const [ withdraw, { isLoading, isError, isSuccess }] = useWithdrawPaymentMutation();
	const handleWithdraw = async() => {
		if (!amount) {
			toast.error("Amount can't be empty");
			return 0;
		}

		if (parseFloat(amount) < 50) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: 'Minimum prefund amount: 50 Tk',
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}

		if (parseFloat(data?.data?.ACC_BALANCE) < parseFloat(amount)) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: "You don''t have enough balance to withdraw this amount!",
				showConfirmButton: false,
				timer: 2000,
				allowOutsideClick: false,
				allowEscapeKey: false,
			});
			return 0;
		}
		setIsDisabled(true);

		const options = {
			data: {
			  trans_ref_no: clientId,
			  request_type: 'W',
			  user_bank_name: data?.data?.BANK_NAME,
			  user_bank_branch: data?.data?.BANK_BRANCH,
			  user_bank_ac_no: data?.data?.BANK_AC_NO,
			  current_balance: data?.data?.ACC_BALANCE,
			  user_bo_account: data?.data?.BO_ACC_NO,
			  trans_fee: 0,
			  prefund_amount: parseFloat(amount),
			  payment_mode: 3,
			  payment_amount: parseFloat(amount),
			  pay_bank_name: 'Midway Securities Ltd',
			  pay_bank_branch:'Graphics Building Branch, Motijheel',
			  pay_bank_acc_no:'1513204465100001',
			  entry_by: data?.data?.USER_PHONE,
			  bank_code: data?.data?.BANK_CODE,
			  dist_code: data?.data?.DIST_CODE,
			  branch_code: data?.data?.BRANCH_CODE
			  }
		  };

		  const response = await withdraw(options);

      if ("data" in response) {
		setAmount('');
        Swal.fire({
			position: "center",
			icon: "success",
			text: `${response?.data?.message}`,
			showConfirmButton: false,
			timer: 2000,
			allowOutsideClick: false,
				allowEscapeKey: false,
		  });
      }
  
      if ("error" in response) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: `${response?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 2000,
		  allowOutsideClick: false,
				allowEscapeKey: false,
        });
      }

	  setIsDisabled(false);
		
	};
	return (
		<>
			<p className="text-center mb-2">Withdraw Amount (Tk)</p>

			<div className={`${styles.amountInptArea}`}>
				<input
					type="text"
					placeholder="Enter Amount"
					className={`${styles.searchInput} text-center`}
					value={amount}
					onChange={handleAmount}
				/>
				<p className="mt-2 mb-1" style={{ color: '#E4572E', fontSize: '12px' }}>
					Minimum withdraw amount: 50 Tk
				</p>
			</div>

			<div className="d-flex justify-content-center my-4">
				<ButtonPrimary
					onClick={handleWithdraw}
					size={!isMobileView ? 'custom-small' : 'custom-medium'}
					isDisabled={isDisabled}
				>
					Agree & Proceed
				</ButtonPrimary>
			</div>

			<p className={`${styles.refundTitle} mb-2 px-3`}>
				Withdrawal Amount will be sent to the following Bank account
			</p>
			<div className="bank-info-divider mb-4"></div>

			<div className="" style={{ color: '#909093' }}>
				<div className="d-flex justify-content-between align-items center mb-1 px-3">
					<p className="bank-information-title">
						Account Name: &nbsp;
						<span className="bank-information-title-span">
							{data?.data?.USER_F_NAME}
						</span>
					</p>
				</div>
				<div className="bank-info-divider mb-lg-4 my-2"></div>
				<div className="mb-2 px-3">
					<p className="bank-information-title">
						Bank Name: &nbsp;
						<span className="bank-information-title-span">{data?.data?.BANK_NAME}</span>
					</p>
				</div>
				<div className="bank-info-divider mb-lg-4 my-2"></div>
				<div className="d-flex justify-content-between align-items center mb- px-3">
					<p className="bank-information-title">
						Bank Account Number: &nbsp;
						<span className="bank-information-title-span">{data?.data?.BANK_AC_NO}</span>
					</p>
				</div>
				<div className="bank-info-divider mb-lg-4 my-2"></div>
				<div className="mb-2 px-3">
					<p className="bank-information-title">
						Bank Branch Name: &nbsp;
						<span className="bank-information-title-span">
						{data?.data?.BANK_BRANCH}
						</span>
					</p>
				</div>
				<div className="bank-info-divider mb-lg-4 my-2"></div>
				<div className="d-flex justify-content-between align-items center mb-1 px-3">
					<p className="bank-information-title">
						Routing Number: &nbsp;
						<span className="bank-information-title-span">{data?.data?.BANK_ROUTING_NUMBER}</span>
					</p>
				</div>
				<div className="bank-info-divider"></div>
			</div>
		</>
	);
};

export default WithdrawDetails;
