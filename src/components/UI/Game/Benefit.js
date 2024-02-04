import OperatorCard from "@/components/Shared/OperatorCard";
import RechargeCard from "@/components/Shared/RechargeCard";
import { useEffect, useState } from "react";
import airtel from "../../../assets/images/airtel.svg";
import banglalink from "../../../assets/images/banglalink.svg";
import grameenphone from "../../../assets/images/grameenphone.svg";
import robi from "../../../assets/images/robi.svg";
import skitto from "../../../assets/images/skitto.svg";
import taletalk from "../../../assets/images/taletalk.svg";
import { useGetRechargeOptionsQuery, useRechargeByPointsMutation } from "@/redux/api/apiSlice";
import { toast } from "react-toastify";
import CustomToast from "./CustomToast";
import { useDispatch } from "react-redux";
import { refetchApi } from "@/redux/features/customRefetch/customRefetchSlice";
import Swal from "sweetalert2";

const Benefit = ({bonusValue}) => {
  const [selectedOperator, setSelectedOperator] = useState("3");
  const [selectedOption, setSelectedOption] = useState(null);
	const [selectedPoints, setSelectedPoints] = useState(null);
	const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedRadioOption, setSelectedRadioOption] = useState("prepaid");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);


  const handleOperatorChange = (value) => {
    setSelectedOperator(value);
  };
  const handleSelect = (option) => {
    setSelectedRadioOption(option);
  };

  const handleInputMobileNumber = (event) => {
    let number = event.target.value.replace(/[^0-9]/g, "");
    if (number.length <= 11) {
      setMobileNumber(number);
    }
  };



  const{data} = useGetRechargeOptionsQuery();

  useEffect(() =>{
		setSelectedOption(data?.data[0]?.OPTION_ID)
		setSelectedPoints(data?.data[0]?.OPTION_POINTS)
		setSelectedAmount(data?.data[0]?.OPTION_VALUE)
	}, [data])


  const handleRadioChange = (optionId, points, amount) => {
		setSelectedOption(optionId);
		setSelectedPoints(points);
		setSelectedAmount(amount);
	  };


    const [rechargeByPoints, { isLoading, isError, isSuccess }] = useRechargeByPointsMutation();
    const dispatch = useDispatch();

  const handleRedeem = async() => {
    if(parseInt(selectedPoints) > parseInt(bonusValue)){
      toast.error('You have not enough bonus points');
      return 0;
    }
    if(mobileNumber.length !== 11){
      toast.error('Please provide valid mobile number');
      return 0;
    }
    setIsDisabled(true);
    const options = {
			data: {
				selected_option_id: selectedOption,
				selected_operator_id: parseInt(selectedOperator),
				selected_connection_type: selectedRadioOption,
				selected_amount: selectedAmount,
				selected_points: selectedPoints,
				mobile_number: mobileNumber,
        trans_type: 1,
				trans_remarks: 'Game Claim Benefit',
			},
		};

    const response = await rechargeByPoints(options);

    if ("data" in response) {
        setShowToast(true);
        dispatch(refetchApi());
        setMobileNumber('')
        setMessage(`Tk ${selectedAmount} recharge successfully`);
        setIsDisabled(false);
      return 0;
    }
		if ('error' in response) {
			Swal.fire({
				position: 'center',
				icon: 'error',
				text: `${response?.error?.data?.message}`,
				showConfirmButton: false,
				timer: 2000,
        allowOutsideClick: false,
				allowEscapeKey: false,
			});
      setIsDisabled(false);
			return 0;
		}

  };


  return (
    <>
    {showToast && <CustomToast setShowToast={setShowToast} message={message} />}
      <div className="d-flex justify-content-center mb-3 mb-lg-5 mt-4">
      {
					data?.data?.map((items) => (
						<RechargeCard
						key={items?.OPTION_ID} 
						points={items?.OPTION_POINTS}
						amount={items?.OPTION_VALUE}
						value={items?.OPTION_ID}
						checked={selectedOption === items?.OPTION_ID}
						onChange={() => handleRadioChange(items?.OPTION_ID, items?.OPTION_POINTS, items?.OPTION_VALUE)}
						/>
				))
				}

      </div>

      <p
        className="text-center bonus-title mb-2 mt-3"
        style={{ fontWeight: "600" }}
      >
        Choose Operator
      </p>

      <div className="d-flex justify-content-center operator-card-area mb-4">
        <OperatorCard
          image={robi}
          isFirstElement={true}
          operatorName={"robi"}
          value="3"
          checked={selectedOperator === "3"}
          onChange={handleOperatorChange}
        />
        <OperatorCard
          image={grameenphone}
          operatorName={"grameenphone"}
          value="1"
          checked={selectedOperator === "1"}
          onChange={handleOperatorChange}
        />

        <OperatorCard
          image={banglalink}
          operatorName={"banglalink"}
          isBanglalink={true}
          value="2"
          checked={selectedOperator === "2"}
          onChange={handleOperatorChange}
        />
        <OperatorCard
          image={airtel}
          operatorName={"airtel"}
          isAirtel={true}
          value="6"
          checked={selectedOperator === "6"}
          onChange={handleOperatorChange}
        />
        <OperatorCard
          image={taletalk}
          operatorName={"taletalk"}
          isLastElement={true}
          value="5"
          checked={selectedOperator === "5"}
          onChange={handleOperatorChange}
        />
      </div>

      <div className="operator-package-area">
		<div className="radio-container">
			<input
			type="radio"
			id="prepaid"
			className="operator-package"
			checked={selectedRadioOption === "prepaid"}
			onChange={() => handleSelect("prepaid")}
			name="payment"
			value="prepaid"
			/>
			<label htmlFor="prepaid" className="operator-package-label">
			Prepaid
			</label>

			<input
			type="radio"
			id="postpaid"
			className="operator-package"
			checked={selectedRadioOption === "postpaid"}
			onChange={() => handleSelect("postpaid")}
			name="payment"
			value="postpaid"
			/>
			<label htmlFor="postpaid" className="operator-package-label">
			Postpaid
			</label>
		</div>
	  </div>



      <p className="text-center bonus-title mb-2 mt-4">Enter Phone Number</p>
      <div className="bonus-amount-input-area">
        <input
          type="text"
          className="bonus-amount-input"
          placeholder="eg. 01xxxxxxxxx"
          value={mobileNumber}
          onChange={handleInputMobileNumber}
        />
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          role="button"
          onClick={handleRedeem}
          className="game-detail-btn"
          style={{ border: "none" }}
          disabled={isDisabled}
        >
          Redeem
        </button>
      </div>
    </>
  );
};

export default Benefit;
