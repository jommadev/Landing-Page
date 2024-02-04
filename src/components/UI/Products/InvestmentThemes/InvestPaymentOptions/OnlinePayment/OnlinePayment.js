import ButtonPrimary from "@/components/UI/ButtonPrimary";
import {
  useGetUserInfoQuery,
  useThematicOnlinePaymentMutation,
} from "@/redux/api/apiSlice";
import { formatNumberWithCommasAndDecimal } from "@/utils/formatNumberWithCommasAndDecimal";
import { generateAuthorizationHeader } from "@/utils/prefundUtils";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const OnlinePayment = ({
  isMobileView,
  data,
  payoutType,
  cardPaymentFee,
  onlinePaymentFee,
  orderId,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const [onlinePayment, { isLoading, isError, isSuccess }] =
    useThematicOnlinePaymentMutation();
  const {
    data: userInfo,
    isLoadingUserInfo,
    errorUserInfo,
    refetchUserInfo,
  } = useGetUserInfoQuery();

  const handleOnlinePayment = async () => {
    setIsDisabled(true);

    const investmentThemes = new FormData();
    investmentThemes.append("payout_type", payoutType);
    investmentThemes.append("BROKER_CHARGE", 0);
    investmentThemes.append("FIN_ID", data?.FIN_ID);
    investmentThemes.append("FIN_PROD_ID", data?.FIN_PROD_ID);
    investmentThemes.append("INVEST_AMOUNT", data?.TOTAL_AMOUNT);
    investmentThemes.append("ORDER_AMOUNT", data?.TOTAL_AMOUNT);
    investmentThemes.append("ORDER_REQ_ID", orderId);
    investmentThemes.append("TRANS_UNIT", data?.TRANS_UNIT);
    investmentThemes.append("UNIT_PRICE", data?.UNIT_PRICE);
    investmentThemes.append("PAYMENT_GATEWAY_CHARGE", 0);
    investmentThemes.append("PAY_AMT", data?.TOTAL_AMOUNT);
    investmentThemes.append("payment_status", "O");
    investmentThemes.append("P15_SELECT_PAY", 4);

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/saved-buyInvestmentThemes`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            authorization: `${getCookies("accessToken").accessToken}`,
          },
          body: investmentThemes,
        }
      );

      if (response.ok) {
        const payNo = await response.json();
        const options = {
          data: {
            amount: data?.TOTAL_AMOUNT,
            order_id: orderId,
            payNo: payNo?.data?.pay_no,
            user_name: userInfo?.data?.USER_F_NAME,
            user_email: userInfo?.data?.USER_EMAIL,
            user_phone: userInfo?.data?.USER_PHONE,
            address: userInfo?.data?.USER_ADDRESS1,
            district: userInfo?.data?.USER_ADD_DISTRICT,
            division: userInfo?.data?.USER_ADD_DIVISION,
            post_code: userInfo?.data?.USER_ADD_POSTCODE,
          },
        };
        const responseForPayment = await onlinePayment(options);

        if ("data" in responseForPayment) {
          router.push(responseForPayment?.data?.data?.data?.action?.url);
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
      } else {
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

    /* const response = await payment(options);

      if ("data" in response) {
        sessionStorage.setItem('token',response?.data?.data?.tokenResponse);
        router.push(response?.data?.data?.paymentCreate?.bkashURL);
      }
  
      if ("error" in response) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: `${response?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } */
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
              <th className="table-header-history">
                Online Payment Convenience Fee
              </th>
              <th className="table-header-history">Transaction Fee (Tk)</th>
              <th className="table-header-history">Net Prefund Amount (Tk)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-tr-padding profile-value-td text-center">
                MFS & Net Bank: 1.95%
              </td>
              <td className="table-tr-padding profile-value-td text-center">
                1
              </td>
              <td className="table-tr-padding profile-value-td text-center">
                {data?.TOTAL_AMOUNT
                  ? formatNumberWithCommasAndDecimal(
                      data?.TOTAL_AMOUNT - onlinePaymentFee
                    )
                  : 0}
              </td>
            </tr>
            <tr className="custom-border-bottom">
              <td className="table-tr-padding profile-value-td text-center">
                All Cards (Except Amex): 2.2%
              </td>
              <td className="table-tr-padding profile-value-td text-center">
                1
              </td>
              <td className="table-tr-padding profile-value-td text-center">
                {data?.TOTAL_AMOUNT
                  ? formatNumberWithCommasAndDecimal(
                      data?.TOTAL_AMOUNT - cardPaymentFee
                    )
                  : 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <p></p>
        <ButtonPrimary
          onClick={handleOnlinePayment}
          size={!isMobileView ? "custom-small" : "custom-medium"}
          isDisabled={isDisabled}
        >
          Confirm Order
        </ButtonPrimary>
      </div>
    </>
  );
};

export default OnlinePayment;
