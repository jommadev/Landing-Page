import Image from "next/image";
import React, { useState } from "react";
import down from "../../../../assets/images/dropdown-drop-icon.svg";

import UserInformation from "./UserInformation/UserInformation";
import BankInformation from "./BankInformation/BankInformation";

const options = [
  {
    label: "User Information",
    value: 1,
  },
  {
    label: "Bank Information",
    value: 2,
  },
];
const InformationDetails = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptionValue, setSelectedOptionValue] = useState(
    options[0].value
  );
  const selectOption = (option) => {
    setSelectedOption(option);
    setSelectedOptionValue(option.value);
    
    setDropdownOpen(false);
  };


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <div className="market-dropdown-section">
        {/* <div className="container p-4">
          <div className="dropdown stocks-item-dropdown w-100">
            <div
              className="dropdown-toggle"
              onClick={toggleDropdown}
              role="button"
              style={{ height: "55px" }}
            >
              <span className="dropdown-option-label stocks-item-dropdown-menu-selected w-100">
                {selectedOption ? selectedOption.label : "Select an option"}
              </span>
              <span className="dropdown-caret">
                <Image
                  src={down}
                  alt="down"
                  className="dropdown-option-image"
                />
              </span>
            </div>
            <ul
              className={`dropdown-menu stocks-item-dropdown-menu ${
                isDropdownOpen ? "show" : ""
              }`}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => selectOption(option)}
                  style={{
                    borderBottom:
                      index === options.length - 1
                        ? "transparent"
                        : "1px solid #B6B6B8",
                  }}
                >
                  <span className="dropdown-option-label ps-2">
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    {
        selectedOptionValue === 1 ? <UserInformation/> : <BankInformation/>
    }
      {/* <UserInformation/> */}

      {/* <BankInformation/> */}
    </>
  );
};

export default InformationDetails;
