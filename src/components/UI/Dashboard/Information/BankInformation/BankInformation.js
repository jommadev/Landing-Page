import Image from "next/image";
import React, { useEffect, useState } from "react";
import copy from "../../../../../assets/images/btn-copy.svg";
import { toast } from "react-toastify";

const BankInformation = () => {
    const [tooltipText, setTooltipText] = useState('Copy!');
  const copyText = (entryText) => {
    navigator.clipboard.writeText(entryText);
    toast.success("Copied!")
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center py-2 px-3">
        <p className="bank-information-title">
          Account Name: &nbsp;
          <span className="bank-information-title-span">
            Midway Securities Limited
          </span>
        </p>
        <Image
          src={copy}
          alt="btnCopy"
          className="btn-copy-text"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={tooltipText}
          onClick={() => copyText("Midway Securities Limited")}
        />
      </div>
      <div className="bank-info-divider"></div>
      <div className=" py-2 px-3">
        <p className="bank-information-title">
          Bank Name: &nbsp;
          <span className="bank-information-title-span">
            The City Bank
          </span>
        </p>
      </div>
      <div className="bank-info-divider"></div>
      <div className="d-flex justify-content-between align-items-center py-2 px-3">
        <p className="bank-information-title">
          Bank Account Number: &nbsp;
          <span className="bank-information-title-span">
            3101093011001
          </span>
        </p>
        <Image
          src={copy}
          alt="btnCopy"
          className="btn-copy-text"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={tooltipText}
          onClick={() => copyText("3101093011001")}
        />
      </div>
      <div className="bank-info-divider"></div>
      <div className=" py-2 px-3">
        <p className="bank-information-title">
          Bank Branch Name: &nbsp;
          <span className="bank-information-title-span">
            Dhaka South, Principal Branch
          </span>
        </p>
      </div>
      <div className="bank-info-divider"></div>
      <div className="d-flex justify-content-between align-items-center  py-2 px-3">
        <p className="bank-information-title">
          Routing Number: &nbsp;
          <span className="bank-information-title-span">
            22527535
          </span>
        </p>
        <Image
          src={copy}
          alt="btnCopy"
          className="btn-copy-text"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title={tooltipText}
          onClick={() => copyText("22527535")}
        />
      </div>
      <div className="bank-info-divider"></div>
    </div>
  );
};

export default BankInformation;
