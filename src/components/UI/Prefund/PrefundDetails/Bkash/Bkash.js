import Image from "next/image";
import React, { useState } from "react";
import bkash from "../../../../../assets/images/bkash.svg";
import ButtonPrimary from "@/components/UI/ButtonPrimary";
import { useBkashPaymentMutation } from "@/redux/api/apiSlice";
import { formatNumberWithCommasAndDecimal } from "@/utils/formatNumberWithCommasAndDecimal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/router";


const Bkash = ({
  isMobileView,
  netPrefundAmountByBkash,
  data,
  clientId,
  bkashTransFee,
  amount,
}) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const [payment, { isLoading, isError, isSuccess }] =
  useBkashPaymentMutation();

  const handleBkash = async () => {
    if (!amount) {
      toast.error("Amount can't be empty");
      return 0;
    }
    if (parseFloat(amount) < 1000) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Minimum prefund amount: 1000 Tk",
        showConfirmButton: false,
        timer: 2000,
        allowOutsideClick: false,
				allowEscapeKey: false,
      });
      return 0;
    }

    if (!data?.data?.BO_ACC_NO) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Your BO Account has not yet been opened. Please initiate pre-fund after BO account opening, which can take 1-2 working days.",
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
        request_type: "A",
        user_bank_name: data?.data?.BANK_NAME,
        user_bank_branch: data?.data?.BANK_BRANCH,
        user_bank_ac_no: data?.data?.BANK_AC_NO,
        current_balance: data?.data?.ACC_BALANCE,
        user_bo_account: data?.data?.BO_ACC_NO,
        trans_fee: bkashTransFee,
        prefund_amount: parseFloat(amount),
        payment_mode: 5,
        payment_amount: netPrefundAmountByBkash,
        pay_bank_name: "Midway Securities Ltd",
        pay_bank_branch: "Graphics Building Branch, Motijheel",
        pay_bank_acc_no: "1513204465100001",
        entry_by: data?.data?.USER_PHONE,
        bank_code: data?.data?.BANK_CODE,
        dist_code: data?.data?.DIST_CODE,
        branch_code: data?.data?.BRANCH_CODE,
      },
    };

    const response = await payment(options);

    if ("data" in response) {
      sessionStorage.setItem("token", response?.data?.data?.tokenResponse);
      router.push(response?.data?.data?.paymentCreate?.bkashURL);
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

    
  };



  return (
    <>

      <div className="table-responsive container mt-3 px-0">
        <table
          className="table table-striped custom-stripe"
          id="my-custom-table"
        >
          <thead style={{ backgroundColor: "#2C7C7A" }}>
            <tr>
              <th
                className="table-header-history"
                style={{ padding: "12px 16px" }}
              >
                Online Payment Convenience Fee
              </th>
              <th className="table-header-history">Net Prefund Amount (Tk)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="custom-border-bottom">
              <td className="p-3 profile-value-td text-center">1%</td>

              <td className="p-3 profile-value-td text-center">
                {netPrefundAmountByBkash
                  ? formatNumberWithCommasAndDecimal(netPrefundAmountByBkash)
                  : 0}
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ButtonPrimary
          onClick={handleBkash}
          size={!isMobileView ? "custom-small" : "custom-medium"}
          isDisabled={isDisabled}
        >
          Agree & Proceed
        </ButtonPrimary>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <Image src={bkash} alt="bkash" width={!isMobileView ? 150 : 200} /> 
      </div>
      
    </>
  );
};

export default Bkash;
