import Image from "next/image";
import React, { useState } from "react";
import Bonds from "../../../../assets/images/bonds-color.svg";
import CalenderIcon from "../../../../assets/images/calender_icon.svg";
import mutualFund from "../../../../assets/images/mutual-color.svg";
import Stocks from "../../../../assets/images/stock-color.svg";
import down from '../../../../assets/images/dropdown-drop-icon.svg';
import { formatDate } from "@/utils/formatDate";
import PortfolioValueTable from "./PortfolioValueTable";
import { useGetPortfolioValueQuery } from "@/redux/api/apiSlice";
import PortfolioGraphView from "./PortfolioGraphView";

const options = [
  {
    label: "Stocks",
    image: Stocks,
    value: 5,
  },
  {
    label: "Bonds",
    image: Bonds,
    value: 6,
  },
  {
    label: "Mutual Funds",
    image: mutualFund,
    value: 4,
  },
];




const DashboardDetails = ({isMobileView}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOptionValue, setSelectedOptionValue] = useState(
    options[0].value
  );
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
		searchTerm: '',
		fin_id: selectedOptionValue,
		page: '',
		limit: '15',
		sortBy: '',
		sortOrder: '',
	});

  const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};


  const selectOption = (option) => {
		setSelectedOption(option);
		setSelectedOptionValue(option.value);
		setSearchInfo((prevInfo) => ({
			...prevInfo,
			fin_id: option.value,
			page: 0
		  }));
		setCurrentPage(0);
		setDropdownOpen(false);
		
	};


  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (e) => {
    e.preventDefault(); // Prevent the default link behavior (scrolling to the top)
    setExpanded(!expanded);
  };

  const { data, isLoading, error, refetch } =
	useGetPortfolioValueQuery(searchInfo);


  return (
    <>
      <div className="market-dropdown-section">
        <div className="container p-lg-2 pb-lg-2 px-3 pt-2 pb-3">
        <p className="text-left market-place-date-mobile mb-0" style={{ fontWeight: "500", fontSize: "14px", textAlign: 'right' }}>
                  {formatDate()}
                </p>
          <div className="dropdown-section">
            <div className="dropdown stocks-item-dropdown">
              <div
                className="dropdown-toggle pt-lg-0 "
                onClick={toggleDropdown}
                role="button"
                style={{ height:"40px" }}
              >
                {selectedOption && (
                  <Image
                    src={selectedOption.image}
                    alt={selectedOption.label}
                    className="dropdown-option-image"
                    height={30}
                    width={40}
                  />
                )}
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
                {options.map((option, index, array) => (
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
                    <Image
                      src={option.image}
                      alt={option.label}
                      className="dropdown-option-image"
                      height={30}
                      width={40}
                    />
                    <span className="dropdown-option-label ps-2">
                      {option.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="market-place-date-pc">
              <div className="d-flex align-items-center">
                <Image src={CalenderIcon} alt="calender-icon" />
                <span style={{ fontWeight: "500", paddingLeft: "5px" }}>
                  {formatDate()}
                </span>
              </div>
            </div>
          </div>
          {/* <div className="market-place-date-mobile mt-3">
            <div className="d-flex align-items-center">
              <Image src={CalenderIcon} alt="calender-icon" />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  paddingLeft: "3px",
                }}
              >
                {formatDate()}
              </span>
            </div>
          </div> */}
        </div>
      </div>

      <ul
          className="nav nav-pills mt-3 mt-lg-4 custom-active-bar"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link custom-nav-link py-1 active"
              id="pills-portfolio-value-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-portfolio-value"
              type="button"
              role="tab"
              aria-controls="pills-portfolio-value"
              aria-selected="true"
            >
              Portfolio Value
            </button>
          </li>
          <li className="nav-item ps-4" role="presentation">
            <button
              className="nav-link custom-nav-link py-1"
              id="pills-portfolio-performance-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-portfolio-performance"
              type="button"
              role="tab"
              aria-controls="pills-portfolio-performance"
              aria-selected="false"
            >
              Portfolio Performance
            </button>
          </li>
        </ul>



        <div
          className="tab-content mt-1 mb-5 course_web_view"
          id="pills-tabContent"
        >
          <div
            className="tab-pane fade show active"
            id="pills-portfolio-value"
            role="tabpanel"
            aria-labelledby="pills-portfolio-value-tab"
          >
          <PortfolioValueTable  
          isMobileView={isMobileView} 
          searchInfo={searchInfo}
				  setSearchInfo={setSearchInfo}
          currentPage={currentPage}
				  setCurrentPage={setCurrentPage}
          data= {data}

          />
          </div>
          <div
            className="tab-pane fade"
            id="pills-portfolio-performance"
            role="tabpanel"
            aria-labelledby="pills-portfolio-performance-tab"
          >
          {
            data?.data?.data?.graph.length > 0 ?
            <PortfolioGraphView data= {data?.data?.data}/>
            :
            <h3 className="text-center mt-4">No Data Found</h3>
          }
          </div>
        </div>


      

    </>
  );
};

export default DashboardDetails;
