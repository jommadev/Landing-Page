import Image from "next/image";
import React, { useEffect, useState } from "react";
import down from "../../../../assets/images/dropdown-drop-icon.svg";
import TransactionHistory from "./Transaction/TransactionHistory";
import HistoryBoPrefund from "./BoPrefund/HistoryBoPrefund";

const options = [
  {
    label: "Transaction",
    value: 1,
  },
  {
    label: "BO Prefund",
    value: 2,
  },
  {
    label: "BO Withdraw",
    value: 3,
  },
];

const HistoryDetails = () => {
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

  return (
    <>
      <div className="market-dropdown-section mb-lg-4 mb-3">
        <div className="container p-lg-2 pb-lg-2 px-3 pt-2 pb-3">
          <div className="dropdown stocks-item-dropdown w-100">
            <div
              className="dropdown-toggle p-0"
              onClick={toggleDropdown}
              role="button"
              style={{ height: "35px" }}
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
        </div>
      </div>

      {selectedOptionValue === 1 ? (
        <TransactionHistory isMobileView={isMobileView} />
      ) : (
        <HistoryBoPrefund
          isMobileView={isMobileView}
          selectedOptionValue={selectedOptionValue}
        />
      )}
    </>
  );
};

export default HistoryDetails;
