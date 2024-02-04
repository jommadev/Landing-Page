import ButtonPrimary from '@/components/UI/ButtonPrimary';
import { useOnlinePaymentMutation } from '@/redux/api/apiSlice';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import { generateAuthorizationHeader } from '@/utils/prefundUtils';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const OnlinePayment = ({isMobileView, netPrefundAmountByCard, netPrefundAmountByOnlinePayment, data,amount, clientId}) => {
//console.log(data?.data)
  const [ onlinePayment, { isLoading, isError, isSuccess }] = useOnlinePaymentMutation();
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);


    const handleOnlinePayment = async() =>{
      if(!amount){
        toast.error("Amount can't be empty")
        return 0;
      }
      if(parseFloat(amount) < 1000){
        Swal.fire({
          position: "center",
          icon: "error",
          text: 'Minimum prefund amount: 1000 Tk',
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
				allowEscapeKey: false,
        });
        return 0;
      }
      
      if(!data?.data?.BO_ACC_NO){
        Swal.fire({
          position: "center",
          icon: "error",
          text: 'Your BO Account has not yet been opened. Please initiate pre-fund after BO account opening, which can take 1-2 working days.',
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
				allowEscapeKey: false,
        });
        return 0
      }
      setIsDisabled(true);

      const options = {
        data: {
          trans_ref_no: clientId,
          request_type: 'A',
          user_name: data?.data?.USER_F_NAME,
          user_email: data?.data?.USER_EMAIL,
          user_phone: data?.data?.USER_PHONE,
          address: data?.data?.USER_ADDRESS1,
          user_bank_name: data?.data?.BANK_NAME,
          user_bank_branch: data?.data?.BANK_BRANCH,
          user_bank_ac_no: data?.data?.BANK_AC_NO,
          current_balance: data?.data?.ACC_BALANCE,
          user_bo_account: data?.data?.BO_ACC_NO,
          prefund_amount: parseFloat(amount),
          payment_mode: 4,
          pay_bank_name: 'Midway Securities Ltd',
          pay_bank_branch:'Graphics Building Branch, Motijheel',
          pay_bank_acc_no:'1513204465100001',
          entry_by: data?.data?.USER_PHONE,
          bank_code: data?.data?.BANK_CODE,
          dist_code: data?.data?.DIST_CODE,
          branch_code: data?.data?.BRANCH_CODE,
          district: data?.data?.USER_ADD_DISTRICT,
          division: data?.data?.USER_ADD_DIVISION,
          post_code: data?.data?.USER_ADD_POSTCODE,
          
          }
      };


      //console.log(options)
      const response = await onlinePayment(options);
      if ("data" in response) {
        router.push(response?.data?.data?.data?.action?.url);
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
        setIsDisabled(false);
      }
      /* const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/prefund/online-banking`,
        {
          method: "POST",
      headers: {
        authorization: `${getCookies('accessToken').accessToken}`,
      },
          body: financialInfo,
        }
      ); */


    }
    return (
        <>

<div className="table-responsive container mt-3 px-0">
        <table className="table table-striped custom-stripe" id="my-custom-table">
          <thead style={{ backgroundColor: "#2C7C7A" }}>
            <tr>
              <th
                className="table-header-history"
                style={{ padding: "12px 16px" }}
              >
                Online Payment Convenience Fee
              </th>
              <th className="table-header-history">Transaction Fee (Tk)</th>
              <th className="table-header-history">Net Prefund Amount (Tk)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 profile-value-td text-center">MFS & Net Bank: 1.95%</td>
              <td className="p-3 profile-value-td text-center">1</td>
              <td className="p-3 profile-value-td text-center">{formatNumberWithCommasAndDecimal(netPrefundAmountByOnlinePayment > 0 ? netPrefundAmountByOnlinePayment - 1 : 0)}</td>
            </tr>
            <tr className='custom-border-bottom'>
              <td className="p-3 profile-value-td text-center">All Cards (Except Amex): 2.2%</td>
              <td className="p-3 profile-value-td text-center">1</td>
              <td className="p-3 profile-value-td text-center">{formatNumberWithCommasAndDecimal(netPrefundAmountByCard > 0 ? netPrefundAmountByCard - 1 : 0)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <ButtonPrimary
          onClick={handleOnlinePayment}
          size={!isMobileView ? "custom-small" : "custom-medium"}
        >
          Agree & Proceed
        </ButtonPrimary>
      </div>
            
        </>
    );
};

export default OnlinePayment;