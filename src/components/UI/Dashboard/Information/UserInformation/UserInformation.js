import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import edit from "../../../../../assets/images/edit-icon.svg";
import image from "../../../../../assets/images/dummyImageDashboardInfo.svg";
import UserEditModal from "./EditModal/UserEditModal";
import Swal from "sweetalert2";
import ImageEditModal from "./EditModal/ImageEditModal";
import {
  useGetOnboardingBanksQuery,
  useGetUserImageQuery,
  useGetUserInfoQuery,
} from "@/redux/api/apiSlice";
import { formatDateWithDate } from "@/utils/formatDate";



const UserInformation = () => {
  const [modalShow, setModalShow] = useState(false);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [dataForModal, setDataForModal] = useState("");
  const [imageForModal, setImageForModal] = useState("");

  const [emaiAddress, setEmailAddress] = useState("");
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nidNumber, setNidNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [etinNumber, setEtinNumber] = useState("");
  const [boAccountNumber, setBoAccountNumber] = useState("");

  const [bankOption, setBankOption] = useState([]);
  const [districtOption, setDistrictOption] = useState([]);
  const [branchOption, setBranchOption] = useState([]);
  const [bankName, setBankName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [bankAccountNo, setBankAccountNo] = useState("");
  const [nomineeName, setNomineeName] = useState("");
  const [NomineeRelation, setNomineeRelation] = useState("");
  const [etinMimeType, setEtinMimeTpe] = useState("");
  const [etinBlobe, setEtinBlobe] = useState("");

  const [userImager, setUserImage] = useState(image);
  const [userSignatureImage, setUserSignatureImage] = useState(image);
  const [userNidFontImage, setUserNidFontImage] = useState(image);
  const [userEtinImage, setUserEtinImage] = useState(image);
  const [nomineeImage, setNomineeImage] = useState(image);


  const relationship = useMemo(
		() => [
			{ value: '1', label: 'Adult Son/Daughter' },
			{ value: '2', label: 'Father/Mother' },
			{ value: '3', label: 'Brother/Sister' },
			{ value: '4', label: 'Spouse' },
			{ value: '5', label: 'Other' },
		],
		[]
	);

  const {
    data: userInfoData,
    isLoading: isUserInfoLoading,
    error: userInfoError,
    refetch: userInfoRefetch,
  } = useGetUserInfoQuery();


  const {
    data: dataOption,
    isLoading: isOptionLoading,
    error: errorOption,
    refetch: refetchOption,
  } = useGetOnboardingBanksQuery();

  const {
    data: imageBlob,
    isLoading: isImageBlobLoading,
    error: errorImageBlob,
    refetch: refetchImageBlob,
  } = useGetUserImageQuery();


  /* set user information */
  useEffect(() => {
    setEmailAddress(
      userInfoData?.data?.USER_EMAIL ? userInfoData?.data?.USER_EMAIL : ""
    );
    setName(
      userInfoData?.data?.USER_F_NAME ? userInfoData?.data?.USER_F_NAME : ""
    );
    setFatherName(
      userInfoData?.data?.FATHER_HUSBAND_NAME
        ? userInfoData?.data?.FATHER_HUSBAND_NAME
        : ""
    );
    setMotherName(
      userInfoData?.data?.MOTHER_NAME ? userInfoData?.data?.MOTHER_NAME : ""
    );
    setPhoneNumber(
      userInfoData?.data?.USER_PHONE ? userInfoData?.data?.USER_PHONE : ""
    );
    setOccupation(
      userInfoData?.data?.USER_OCCUPATION
        ? userInfoData?.data?.USER_OCCUPATION
        : ""
    );
    setGender(
      userInfoData?.data?.GENDER
        ? userInfoData?.data?.GENDER === "M"
          ? "Male"
          : userInfoData?.data?.GENDER === "F"
          ? "Female"
          : "Other"
        : ""
    );
    setBirthDate(
      userInfoData?.data?.DOB ? formatDateWithDate(userInfoData?.data?.DOB) : ""
    );
    setNidNumber(userInfoData?.data?.NID ? userInfoData?.data?.NID : "");
    setAddress(
      userInfoData?.data?.USER_ADDRESS1 ? userInfoData?.data?.USER_ADDRESS1 : ""
    );
    setCountry(
      userInfoData?.data?.USER_ADDR_COUNTRY
        ? userInfoData?.data?.USER_ADDR_COUNTRY
        : ""
    );
    setNationality(
      userInfoData?.data?.NATIONALITY ? userInfoData?.data?.NATIONALITY : ""
    );
    setEtinNumber(
      userInfoData?.data?.USER_ETIN_NUMBER
        ? userInfoData?.data?.USER_ETIN_NUMBER
        : ""
    );
    setBoAccountNumber(
      userInfoData?.data?.BO_ACC_NO
        ? userInfoData?.data?.BO_ACC_NO
        : ""
    );
    setBankAccountNo(
      userInfoData?.data?.BANK_AC_NO ? userInfoData?.data?.BANK_AC_NO : ""
    );
    setNomineeName(userInfoData?.data?.NOMINEE_NAME ? userInfoData?.data?.NOMINEE_NAME : "");
    setBankAccountNo(
      userInfoData?.data?.BANK_AC_NO ? userInfoData?.data?.BANK_AC_NO : ""
    );
  }, [userInfoData]);

  /* set options */
  useEffect(() => {
    setBankOption(dataOption?.data?.bank);
    setDistrictOption(dataOption?.data?.district);
    setBranchOption(dataOption?.data?.branch);
  }, [dataOption]);

  /* set image */
  useEffect(()=>{
    setEtinMimeTpe(imageBlob?.data?.USER_ETIN_MIMETYPE ? imageBlob?.data?.USER_ETIN_MIMETYPE: '')
    setEtinBlobe(imageBlob?.data?.USER_ETIN_BLOB ? imageBlob?.data?.USER_ETIN_BLOB: image)
    setUserImage( imageBlob?.data?.USER_PHOTO_BLOB ? `data:application/pdf;base64,${imageBlob?.data?.USER_PHOTO_BLOB}` : image);
    setUserSignatureImage( imageBlob?.data?.USER_SIGN_BLOB ? `data:application/pdf;base64,${imageBlob?.data?.USER_SIGN_BLOB}` : image);
    setUserNidFontImage( imageBlob?.data?.USER_NID_BLOB ? `data:application/pdf;base64,${imageBlob?.data?.USER_NID_BLOB}` : image);
    setNomineeImage( imageBlob?.data?.USER_STATEMENT_BLOB ? `data:application/pdf;base64,${imageBlob?.data?.USER_STATEMENT_BLOB}` : image);
    if (imageBlob?.data?.USER_ETIN_MIMETYPE === "application/pdf") {
      setUserEtinImage(
        imageBlob?.data?.USER_ETIN_BLOB
          ? `data:application/pdf;base64,${imageBlob?.data?.USER_ETIN_BLOB}`
          : image
      );
    } else {
      setUserEtinImage(
        imageBlob?.data?.USER_ETIN_BLOB
          ? `data:image/jpeg;base64,${imageBlob?.data?.USER_ETIN_BLOB}`
          : image
      );
    }


  },[imageBlob])


  /* Bank Select */
  useEffect(() => {
    const selectedBankOption = bankOption?.find(
      (option) => option.bank_code === userInfoData?.data?.BANK_CODE
    );
    setBankName(
      selectedBankOption?.bank_name ? selectedBankOption?.bank_name : ""
    );

    const selectedDistrictOption = districtOption?.find(
      (option) => option.district_code === userInfoData?.data?.DIST_CODE
    );
    setDistrictName(
      selectedDistrictOption?.district_name
        ? selectedDistrictOption?.district_name
        : ""
    );

    const selectedBranchOption = branchOption?.find(
      (option) => option.branch_code === userInfoData?.data?.BRANCH_CODE
    );
    setBranchName(
      selectedBranchOption?.branch_name ? selectedBranchOption?.branch_name : ""
    );

    const selectedRelationOption = relationship?.find(
			(option) => option.value == userInfoData?.data?.NOMINEE_RELATION
		);
		setNomineeRelation(selectedRelationOption?.label ? selectedRelationOption?.label : "");
  }, [bankOption, districtOption, branchOption, userInfoData, relationship]);

  const handleOpenUserInfoEditModal = () => {
    const editUserInfo = {
      name,
      fatherName,
      motherName,
      occupation,
      address,
      country,
      nationality,
      etinNumber
    }
    setDataForModal(editUserInfo);
    setModalShow(true);
  };
  const handleOpenUserImageEditModal = () => {
    const editUserImage = {
      etinMimeType,
      etinBlobe
    }
    setImageForModal(editUserImage);
    setImageModalShow(true);
  };

  const handleFinancialInfo = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      text: "Please contact with Jomma for update Financial Information",
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false,
				allowEscapeKey: false,
    });
  };
  const handleNominee = () => {
    Swal.fire({
      position: "center",
      icon: "info",
      text: "Please contact with Jomma for update Nominee",
      showConfirmButton: false,
      timer: 2000,
      allowOutsideClick: false,
				allowEscapeKey: false,
    });
  };
  return (
    <>
      <div className="informatio-edit-title">
        <p className="">Personal Information</p>
        <Image
          src={edit}
          alt="edit-icon"
          role="button"
          onClick={handleOpenUserInfoEditModal}
        />
      </div>

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
            disabled
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
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Mother’s Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={motherName}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Phone Number&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={phoneNumber}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Email Address&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={emaiAddress}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Gender&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={gender}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Date of Birth&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={birthDate}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            National ID Card Number&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={nidNumber}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Occupation&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={occupation}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            E-TIN Number(Optional)
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={etinNumber}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            BO Account Number&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={boAccountNumber}
            disabled
          />
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <p className="information-input-title">
            Address&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={address}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Country&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={country}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Nationality&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={nationality}
            disabled
          />
        </div>
      </div>

      <div className="informatio-edit-title">
        <p className="">Financial Information</p>
        <Image
          src={edit}
          alt="edit-icon"
          role="button"
          onClick={handleFinancialInfo}
        />
      </div>

      <div className="row mb-4">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <p className="information-input-title">
            Bank Account Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            name="fatherName"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={name}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Bank Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={bankName}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Bank District Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={districtName}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Bank Branch Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={branchName}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Bank Account Number&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={bankAccountNo}
            disabled
          />
        </div>
      </div>

      <div className="informatio-edit-title">
        <p className="">Nominee&apos;s Information</p>
        <Image
          src={edit}
          alt="edit-icon"
          role="button"
          onClick={handleNominee}
        />
      </div>

      <div className="row mb-4">
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Nominess&apos;s Name&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={nomineeName}
            disabled
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <p className="information-input-title">
            Nominess&apos;s Relation&nbsp;<span>*</span>
          </p>
          <input
            type="text"
            className="information-input-title-input w-100"
            autoComplete="off"
            value={NomineeRelation}
            disabled
          />
        </div>
      </div>

      <div className="informatio-edit-title">
        <p className="">Uploaded Files</p>
        <Image
          src={edit}
          alt="edit-icon"
          role="button"
          onClick={ handleOpenUserImageEditModal}
        />
      </div>

      <div className="row gy-4">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <p className="mb-2">Photo</p>
          <Image
            src={userImager}
            alt="upload image"
            layout="responsive"
            className="information-show-image"
            height={200}
            width={200}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <p className="mb-2">Signature</p>
          <Image
            src={userSignatureImage}
            alt="upload image"
            layout="responsive"
            className="information-show-image signature-bacground"
            height={350}
            width={200}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <p className="mb-2">NID</p>
          <Image
            src={userNidFontImage}
            alt="upload image"
            layout="responsive"
            className="information-show-image"
            height={350}
            width={200}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <p className="mb-2">Nominee&apos;s Photo</p>
          <Image
            src={nomineeImage}
            alt="upload image"
            layout="responsive"
            className="information-show-image"
            height={350}
            width={200}
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <p className="mb-2">E-TIN</p>

{imageBlob?.data?.USER_ETIN_MIMETYPE === "application/pdf" ? 
    
      <iframe
        src={userEtinImage}
        title="PDF Viewer"
        width="100%"
        height="500"
      ></iframe>

      :

      <Image
        src={userEtinImage}
        alt="upload e-tin"
        layout="responsive"
        className={`information-show-image`}
        height={350}
        width={200}
      />
    
}
        </div>
        
      </div>

      <UserEditModal
        data={dataForModal}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ImageEditModal
        data={imageForModal}
        show={imageModalShow}
        refetchImageBlob={refetchImageBlob}
        onHide={() => setImageModalShow(false)}
      />
    </>
  );
};

export default UserInformation;
