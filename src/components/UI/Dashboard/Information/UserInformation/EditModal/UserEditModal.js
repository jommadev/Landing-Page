/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import close from "../../../../../../assets/images/btn_close.svg";
import { useEffect, useId, useState } from "react";
import { useGetOnboardingOptionsQuery, usePersonalInfoDashboardMutation } from "@/redux/api/apiSlice";
import styles from "@/styles/onBoarding/onBoarding.module.css";
import ButtonSecondary from "@/components/UI/ButtonSecondary";
import ButtonPrimary from "@/components/UI/ButtonPrimary";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UserEditModal = (props) => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [eTin, setETin] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");

  const [occupationOptions, setOccupationOptions] = useState([]);
  const [selectedOccupationOption, setSelectedOccupationOption] =
    useState(null);
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

  const { data, isLoading, error, refetch } = useGetOnboardingOptionsQuery();
  useEffect(() => {
    setOccupationOptions(data?.data?.occupation);
    setSelectedOccupationOption(selectedOccupationOption);
  }, [data]);
  useEffect(() => {
    setName(props?.data?.name ? props?.data?.name : '');
    setFatherName(props?.data?.fatherName ? props?.data?.fatherName : '');
    setMotherName(props?.data?.motherName ? props?.data?.motherName : '');
    setETin(props?.data?.etinNumber ? props?.data?.etinNumber : '');
    setAddress(props?.data?.address ? props?.data?.address : '');
    setCountry(props?.data?.country ? props?.data?.country : '');
    setNationality(props?.data?.nationality ? props?.data?.nationality : '');

    const selectedOccupationOption = occupationOptions?.find(
			(option) => option.value === props?.data?.occupation
		);
		setSelectedOccupationOption(selectedOccupationOption);
  }, [props]);

  const handelEtinNumber = (event) => {
    const getEtinNumber = event.target.value.replace(/[^0-9]/g, "");
    setETin(getEtinNumber);
  };

  const [personalInfoSaveDashboard, { isPesonalInfoLoading, isPesonalInfoError, isPesonalInfoSuccess }] = usePersonalInfoDashboardMutation();
  const handleSave = async() =>{
    if (!name) {
			toast.error("Name can't be empty");
			return 0;
		}
		if (!fatherName) {
			toast.error("Father Name can't be empty");
			return 0;
		}
		if (!motherName) {
			toast.error("Mother Name can't be empty");
			return 0;
		}
		if (!occupation) {
			toast.error("Occupation can't be empty");
			return 0;
		}
		if (!address) {
			toast.error("Address can't be empty");
			return 0;
		}
		if (!country) {
			toast.error("Country can't be empty");
			return 0;
		}
		if (!nationality) {
			toast.error("Nationality can't be empty");
			return 0;
		}

    const options = {
			data: {
			name,
			fatherName,
			motherName,
			selectedOccupationOption: selectedOccupationOption?.value,
			eTin,
			address,
			country,
			nationality,
			 },
		};

    console.log(options)
    const response = await personalInfoSaveDashboard(options);

    if ("data" in response) {
      props.onHide();
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
          <h3 className="text-center">Edit Personal Information</h3>
        </div>
        <div className="modal-title-divider"></div>
        <div className="">
          <div className="row mb-4">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p className="information-input-title">
                Full Name&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                name="name"
                className="information-input-title-input w-100"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                Father’s Name&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                name="fatherName"
                className="information-input-title-input w-100"
                autoComplete="off"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                Mother’s Name&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                name="motherName"
                className="information-input-title-input w-100"
                autoComplete="off"
                value={motherName}
                onChange={(e) => setMotherName(e.target.value)}
              />
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                Occupation&nbsp;<span>*</span>
              </p>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 0,
                    boxShadow: "none",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#000",
                    fontSize: "14px",
                    backgroundColor: state.isFocused ? "#DEEAEA" : "white",
                    backgroundColor: state.isSelected ? "#2C7C7A" : "white",
                    color: state.isSelected ? "#fff" : "#000",
                    ":hover": {
                      backgroundColor: "#DEEAEA",
                      color: "#000",
                    },
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "#000",
                    fontSize: "14px",
                    fontWeight: "400",
                  }),
                }}
                className={`${styles.selecrCustomeDropDown}`}
                isClearable
                isSearchable
                name="occupation"
                id="occupation"
                placeholder={"Choose Occupation"}
                value={selectedOccupationOption}
                onChange={setSelectedOccupationOption}
                options={occupationOptions}
                instanceId={useId()}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                E-TIN Number(Optional)
              </p>
              <input
                type="text"
                name="motherName"
                className="information-input-title-input w-100"
                autoComplete="off"
                value={eTin}
                onChange={handelEtinNumber}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <p className="information-input-title">
                Address&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                name="motherName"
                className="information-input-title-input w-100"
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                Country&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                name="motherName"
                className="information-input-title-input w-100 mb-lg-0 mb-3"
                autoComplete="off"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p className="information-input-title">
                Nationality&nbsp;<span>*</span>
              </p>
              <input
                type="text"
                className="information-input-title-input w-100 mb-0"
                autoComplete="off"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
          </div>
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

export default UserEditModal;
