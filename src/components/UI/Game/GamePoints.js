import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import close from "../../../assets/images/game-modal-close.svg";
import { useRedeemedBonusPointsMutation } from "@/redux/api/apiSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { refetchApi } from "@/redux/features/customRefetch/customRefetchSlice";
import CustomToast from "./CustomToast";
import { toast } from "react-toastify";

const GamePoints = ({ isMobileView, bonusValue }) => {
  const [inputBonusPoints, setInputBonusPoints] = useState("");
  const [inputpointsInModal, setInputpointsInModal] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputBonusPoints = (event) => {
    const points = event.target.value.replace(/[^0-9]/g, "");
    setInputBonusPoints(points);
  };
  const [
    redeemedBonusPoints,
    { isLoading, isError, isSuccess },
  ] = useRedeemedBonusPointsMutation();

  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const handleRedeem = async() => {
    
    if(!inputBonusPoints){
      toast.error('Enter amount of bonus points');
      return 0;
    }
    if(parseInt(inputBonusPoints) > parseInt(bonusValue)){
      toast.error('You have not enough bonus points');
      return 0;
    }
    setInputpointsInModal(inputBonusPoints)
    const options = {
        data: {
          points: inputBonusPoints,
        },
      };

  
      const response = await redeemedBonusPoints(options);
  
      if ("data" in response) {
        setShowToast(true);
        dispatch(refetchApi());
        setInputBonusPoints("");
        return 0;
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
        return 0;
      }
  };
  return (
    <>
    {showToast && <CustomToast setShowToast={setShowToast} message={`${inputpointsInModal} points added in your game points!`} />}
      <p className="text-center bonus-title mb-2 mt-3">Enter Amount</p>
      <div className="bonus-amount-input-area">
        <input
          type="text"
          className="bonus-amount-input"
          placeholder="eg. 100"
          value={inputBonusPoints}
          onChange={handleInputBonusPoints}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          role="button"
          onClick={handleRedeem}
          className="game-detail-btn"
          style={{ border: "none" }}
        >
          Add to Game Points
        </button>
      </div>

      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        contentClassName="custom-modal-container game-modal-background"
        centered
      >
        <Modal.Header className="custom-modal-header">
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>

          <div
            type=""
            className="close"
            aria-label="Close"
            onClick={handleClose}
          >
            <Image
              src={close}
              alt="Close"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
          </div>
        </Modal.Header>

        <Modal.Body className="pt-0">
          <div style={{ padding: "0rem" }}>
            <p className="text-center" style={{ color: "#FFD981" }}>
              Jomma Game Bonus Points T&C
            </p>
            <ol className="text-white" style={{ fontSize:'14px' }}>
              <li>
                Jomma reserves the absolute discretion to determine the
                allocation of the game bonus point for each transaction made by
                any gamer within the game.
              </li>
              <li>
                Jomma reserves the exclusive authority to determine the method
                for calculating the game bonus points for each gamer, the ranks
                in the game as well as the redemption of the game bonus points.
              </li>
              <li>
                Jomma shall, at its sole discretion, establish the process and
                procedures for the claim of game bonus points by each gamer and
                specify the offers that are available.
              </li>
              <li>
                Jomma reserves the absolute right to suspend and/or terminate
                the game bonus points redemption program at any point of time
                and without any prior notification.
              </li>
              <li>
                Jomma reserves the absolute right to change and/or modify the
                terms and conditions for the game bonus points at its sole
                discretion at any point of time without any prior notification.
              </li>
              <li>
                Jomma holds exclusive ownership of all the copyright rights in
                and to the Jomma game points rewards program materials.
              </li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer"></Modal.Footer>
      </Modal>

      <p className="text-white text-center mt-4" style={{ fontSize: "14px" }}>
        See terms and conditions:{" "}
        <span
          style={{ color: "#FFD981", cursor: "pointer" }}
          onClick={handleShow}
        >
          Click Here
        </span>{" "}
      </p>
    </>
  );
};

export default GamePoints;
