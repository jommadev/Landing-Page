import Image from "next/image";
import React, { useState } from "react";
import bkash from "../../../../../../assets/images/bkash.svg";
import ButtonPrimary from "@/components/UI/ButtonPrimary";
import { useThematicBkashPaymentMutation } from "@/redux/api/apiSlice";
import { formatNumberWithCommasAndDecimal } from "@/utils/formatNumberWithCommasAndDecimal";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";

const Bkash = ({isMobileView,data, bkashTransFee, payoutType, orderId}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
    const [ payment, { isLoading, isError, isSuccess }] = useThematicBkashPaymentMutation();
   

    const handleBkash = async() => {
      setIsDisabled(true);
      const investmentThemes = new FormData();
      investmentThemes.append('payout_type', payoutType);
      investmentThemes.append('BROKER_CHARGE', 0);
      investmentThemes.append('FIN_ID', data?.FIN_ID);
      investmentThemes.append('FIN_PROD_ID', data?.FIN_PROD_ID);
      investmentThemes.append('INVEST_AMOUNT', data?.TOTAL_AMOUNT);
      investmentThemes.append('ORDER_AMOUNT', (data?.TOTAL_AMOUNT-bkashTransFee));
      investmentThemes.append('ORDER_REQ_ID', orderId);
      investmentThemes.append('TRANS_UNIT', (data?.TRANS_UNIT-bkashTransFee));
      investmentThemes.append('UNIT_PRICE', data?.UNIT_PRICE);
      investmentThemes.append('PAYMENT_GATEWAY_CHARGE', bkashTransFee);
      investmentThemes.append('PAY_AMT', data?.TOTAL_AMOUNT);
      investmentThemes.append('payment_status', 'O');
      investmentThemes.append('P15_SELECT_PAY', 5);


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
          const payNo = await response.json();
          const options = {
            data: {
              amount: data?.TOTAL_AMOUNT,
              merchantInvoiceNumber: orderId,
              payNo: payNo?.data?.pay_no
              }
          };
              const responseForPayment = await payment(options);

              if ("data" in responseForPayment) {
                sessionStorage.setItem('token',responseForPayment?.data?.data?.tokenResponse);
                router.push(responseForPayment?.data?.data?.paymentCreate?.bkashURL);
              }
          
              if ("error" in responseForPayment) {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  text: `${responseForPayment?.error?.data?.message}`,
                  showConfirmButton: false,
                  timer: 2000,
                  allowOutsideClick: false,
				allowEscapeKey: false,
                });
                setIsDisabled(false);
              }
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

      

        
    }



  return (
    <>
      <div className="table-responsive container mt-3 px-0">
        <table className="table table-striped custom-stripe" id="my-custom-table">
          <thead style={{ backgroundColor: "#2C7C7A" }}>
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
              <td className="table-tr-padding profile-value-td text-center">1.50%</td>

              <td className="table-tr-padding profile-value-td text-center">{data?.TOTAL_AMOUNT ? formatNumberWithCommasAndDecimal(data?.TOTAL_AMOUNT - bkashTransFee) : 0}</td>
            </tr>
          </tbody>
        </table>
      </div>

      
      <div className="d-flex justify-content-center mt-3">
        <ButtonPrimary
          onClick={handleBkash}
          size={!isMobileView ? "custom-small" : "custom-medium"}
          isDisabled={isDisabled}
        >
          Confirm Order
        </ButtonPrimary>

      </div>
        <div className="d-flex justify-content-center mt-3">
        <Image src={bkash} alt="bkash" width={!isMobileView ? 150 : 200}/>
      </div>
    </>
  );
};

export default Bkash;
