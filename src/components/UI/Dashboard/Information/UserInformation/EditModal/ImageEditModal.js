/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import close from "../../../../../../assets/images/btn_close.svg";
import uploadImageIcon from "../../../../../../assets/images/uploadImageIcon.svg";
import replaceImageIcon from "../../../../../../assets/images/replaceImageIcon.svg";
import { useEffect, useId, useState } from "react";
import { useGetOnboardingOptionsQuery, useSaveBlobImageDashboardMutation } from "@/redux/api/apiSlice";
import styles from "@/styles/onBoarding/onBoarding.module.css";
import ButtonSecondary from "@/components/UI/ButtonSecondary";
import ButtonPrimary from "@/components/UI/ButtonPrimary";
import { getCookies } from "cookies-next";
import { base64ToFile, base64ToPDF } from "@/utils/convertImage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ImageEditModal = (props) => {
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


  const [eTinPhoto, setETinPhoto] = useState(null);
  const [createETinObjectURL, setCreateETinObjectURL] = useState(null);

  const uploadToClientETin = (event) => {
    if (event.target.files && event.target.files[0]) {
      const eTinImage = event.target.files[0];

      setETinPhoto(eTinImage);

      if (eTinImage.type === "application/pdf") {
        setCreateETinObjectURL(URL.createObjectURL(eTinImage));
      } else {
        setCreateETinObjectURL(URL.createObjectURL(eTinImage));
      }
    }
  };


  /* useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/getBlobimage`,
        {
          headers: {
            authorization: `${getCookies("accessToken").accessToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data?.data?.USER_ETIN_BLOB)
      
      if (data?.data?.USER_ETIN_MIMETYPE === "application/pdf") {
        setCreateETinObjectURL(
          data?.data?.USER_ETIN_BLOB
            ? `data:application/pdf;base64,${data?.data?.USER_ETIN_BLOB}`
            : null
        );
        setETinPhoto(base64ToPDF(data?.data?.USER_ETIN_BLOB));
      } else {
        setCreateETinObjectURL(
          data?.data?.USER_ETIN_BLOB
            ? `data:image/jpeg;base64,${data?.data?.USER_ETIN_BLOB}`
            : null
        );
        setETinPhoto(base64ToFile(data?.data?.USER_ETIN_BLOB));
      }
    };

    fetchData();
  }, []); */



  useEffect(() => {
    
      
      if (props?.data?.etinMimeType === "application/pdf") {
        setCreateETinObjectURL(
          props?.data?.etinBlobe
            ? `data:application/pdf;base64,${props?.data?.etinBlobe}`
            : null
        );
        setETinPhoto(base64ToPDF(props?.data?.etinBlobe));
      } else {
        setCreateETinObjectURL(
          props?.data?.etinBlobe
            ? `data:image/jpeg;base64,${props?.data?.etinBlobe}`
            : null
        );
        setETinPhoto(base64ToFile(props?.data?.etinBlobe));
      }
  }, [props]);


  
  const handleSave = async() =>{
    if(!eTinPhoto){
      toast.error("E-tin can't be empty");
      return 0;
  }
    const financialInfo = new FormData();
      financialInfo.append("e_tin", eTinPhoto);


  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/dashboard/dashboard-image`,
      {
        method: "POST",
		headers: {
			authorization: `${getCookies('accessToken').accessToken}`,
		},
        body: financialInfo,
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      props.refetchImageBlob();
      props.onHide();
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
    }
  } catch (error) {
    Swal.fire({
      position: "center",
      icon: "error",
      text: "An error occurred while processing your request.",
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false,
				allowEscapeKey: false,
    });
  }
}


  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header className="custom-modal-header">
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>

        <div
          type=""
          className="close"
          aria-label="Close"
          onClick={props.onHide}
        >
          <Image
            src={close}
            alt="Close"
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="modal-title">
          <h3 className="text-center">Edit Uploaded Files</h3>
        </div>
        <div className="modal-title-divider"></div>
        <div className="">


        <div className="d-flex align-items-center mb-3">
          <p className={`${styles.onBoardingInputTitle} mb-0`}>
            Upload Your E-TIN
          </p>

          <input
            type="file"
            name="myImage"
            id="fontNID"
            onChange={uploadToClientETin}
            hidden
          />
          <label
            htmlFor="fontNID"
            className={`${styles.customFileUpload} ms-2`}
          >
            {!eTinPhoto ? (
              <span>
                <Image
                  src={uploadImageIcon}
                  alt="upload file"
                  className="mb-1"
                />{" "}
                Upload
              </span>
            ) : (
              <span>
                <Image src={replaceImageIcon} alt="upload file" className="" />{" "}
                Replace
              </span>
            )}
          </label>
        </div>

        {eTinPhoto && (
          <div>
            {eTinPhoto.type.startsWith("image/") ? (
              <Image
                src={createETinObjectURL}
                alt="upload e-tin"
                layout="responsive"
                className={`${styles.nidCardResponsive}`}
                height={350}
                width={200}
              />
            ) : eTinPhoto.type === "application/pdf" ? (
              <iframe
                src={createETinObjectURL}
                width="100%"
                height="500"
              ></iframe>
            ) : null}
          </div>
        )}

        </div>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer d-flex justify-content-center pb-3">
        {/* <ButtonSecondary
          onClick={props.onHide}
          size={!isMobileView ? "custom-small" : "custom-medium"}
        >
          Close
        </ButtonSecondary> */}

        <ButtonPrimary
        onClick={handleSave}
          size={!isMobileView ? "custom-small" : "custom-medium"}
        >
          Save
        </ButtonPrimary>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageEditModal;
