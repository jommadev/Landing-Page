import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import close from "../../assets/images//btn_close.svg";
import CloseEye from "../../assets/images/close-eye.svg";
import OpenEye from "../../assets/images/open-eye.svg";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ButtonSecondary from "./ButtonSecondary";
import ButtonPrimary from "./ButtonPrimary";
import { toast } from "react-toastify";
import { useChangePasswordFromModalMutation } from "@/redux/api/apiSlice";
import Swal from "sweetalert2";

const PasswordChangeModal = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobileView(false);
      } else {
        setIsMobileView(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };
  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const handleNewConfirmPassword = (event) => {
    setNewConfirmPassword(event.target.value);
  };

  const [
    changePassword,
    { isChangePasswordLoading, isChangePasswordError, isChangePasswordSuccess },
  ] = useChangePasswordFromModalMutation();

const haldleChangePass = async() => {
  if(!currentPassword && props?.data){
    toast.error("Current Password can't be empty");
    return 0
  }
  if(!newPassword){
    toast.error("New Password can't be empty");
    return 0
  }
  if(!newConfirmPassword){
    toast.error("Confirm New Password can't be empty");
    return 0
  }

  if(newPassword !== newConfirmPassword){
    toast.error("New Password and  Confirm New Password must be equal");
    return 0
  }
  const options = {
    data: {
      currentPassword,
      newPassword
    },
  };
  const response = await changePassword(options);
  //props.onHide();
  if ("data" in response) {
    Swal.fire({
      position: "center",
      icon: "success",
      text: `${response?.data?.message}`,
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false,
				allowEscapeKey: false,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        props.onHide();
        setCurrentPassword('');
        setNewPassword('')
        setNewConfirmPassword('');
      }
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
  
}


const handelCloseModal = () => {
  props.onHide();
        setCurrentPassword('');
        setNewPassword('')
        setNewConfirmPassword('');
}


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="custom-modal-header py-2">
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        {props?.data ? (
          <div
            type=""
            className="close"
            aria-label="Close"
            onClick={handelCloseModal}
          >
            <Image
              src={close}
              alt="Close"
              style={{ width: "20px", height: "20px", cursor: "pointer" }}
            />
          </div>
        ) : null}
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="modal-title">
          {props?.data ? (
            <p className="text-center" style={{ fontSize: "20px" }}>Change Password</p>
          ) : (
            <p className="text-center" style={{ fontSize: "20px" }}>Your password has expired. Please Update your password.</p>
          )}
        </div>
        <div className="modal-title-divider"></div>

        <>
          {props?.data ? (
            <>
              <p className="mb-1">Current Password</p>
              <div className="password-container mb-3">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter Current Password"
                  value={currentPassword}
                  onChange={handleCurrentPassword}
                  style={{
                    fontSize: "16px",
                    height: "55px",
                    padding: "10px 20px",
                  }}
                />
                <Image
                  src={passwordVisible ? CloseEye : OpenEye}
                  alt={passwordVisible ? "Hide Password" : "Show Password"}
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                />
              </div>
            </>
          ) : ''}

          <p className="mb-1">New Password</p>
          <div className="password-container mb-3">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Password"
              value={newPassword}
              onChange={handleNewPassword}
              style={{ fontSize: "16px", height: "55px", padding: "10px 20px" }}
            />
            <Image
              src={passwordVisible ? CloseEye : OpenEye}
              alt={passwordVisible ? "Hide Password" : "Show Password"}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
          <p className="mb-1">Confirm New Password</p>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Re-enter New Password"
              value={newConfirmPassword}
              onChange={handleNewConfirmPassword}
              style={{ fontSize: "16px", height: "55px", padding: "10px 20px" }}
            />
            <Image
              src={passwordVisible ? CloseEye : OpenEye}
              alt={passwordVisible ? "Hide Password" : "Show Password"}
              onClick={togglePasswordVisibility}
              className="password-toggle"
            />
          </div>
        </>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer d-flex justify-content-center py-3">
        <>
          {props?.data ? (
            <ButtonSecondary
              onClick={handelCloseModal}
              size={!isMobileView ? "custom-small" : "custom-medium"}
            >
              Close
            </ButtonSecondary>
          ) : null}
          <ButtonPrimary
            onClick={haldleChangePass}
            size={!isMobileView ? "custom-small" : "custom-medium"}
          >
            Change Password
          </ButtonPrimary>
        </>
      </Modal.Footer>
    </Modal>
  );
};

export default PasswordChangeModal;
