import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import Pagination from 'react-paginate';
import "react-datepicker/dist/react-datepicker.css";
import calender from "../../../../../assets/images/calender_icon.svg";
import filter from "../../../../../assets/images/filter-icon.svg";
import NextActive from '../../../../../assets/images/next_active.svg';
import NextDisable from '../../../../../assets/images/next_disable.svg';
import PreviousActive from '../../../../../assets/images/previous_active.svg';
import PreviousDisable from '../../../../../assets/images/previous_disable.svg';
import ButtonPrimary from "@/components/UI/ButtonPrimary";
import Image from 'next/image';
import { useGetBoPrefundWithdrawHistoryQuery } from '@/redux/api/apiSlice';
import { formatDateWithDate } from '@/utils/formatDate';
import HistoryBoExpandDiv from './HistoryBoExpandDiv';

const HistoryBoPrefund = ({isMobileView, selectedOptionValue}) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [pageCount, setpageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
	const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [searchInfo, setSearchInfo] = useState({
      startDate: '',
      endDate: '',
      requestType: '',
      page:''
    });
    const { data, isLoading, error, refetch } =
    useGetBoPrefundWithdrawHistoryQuery(searchInfo);

    //console.log(data?.data?.data)

    useEffect(() => {
      refetch();
      setpageCount(data?.data?.meta?.pageCount);
      if (data?.data?.meta?.pageCount === 1) {
        setIsPreviousDisabled(true);
        setIsNextDisabled(true);
      }
    }, [data]);
    useEffect(() => {
      setSearchInfo((prevInfo) => ({
        ...prevInfo,
        requestType: parseInt(selectedOptionValue),
        page: 0
      }))
    }, [selectedOptionValue]);

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
      setSearchInfo((prevInfo) => ({
        ...prevInfo,
        page: selectedPage.selected + 1,
      }));
  
      // Calculate disabled states based on the current page
      const isPreviousDisabled = selectedPage.selected === 0;
      const isNextDisabled = selectedPage.selected === pageCount - 1;
  
      // Update the disabled state
      setIsPreviousDisabled(isPreviousDisabled);
      setIsNextDisabled(isNextDisabled);
  
    };

    const breakLabel = isMobileView ? (
      <span style={{ fontWeight: 'bold' }}>. .</span>
    ) : (
      <span style={{ fontWeight: 'bold' }}>. . .</span>
    );

    
  
    const handleStartDateChange = (date) => {
      setStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setEndDate(date);
    };
  
    const handlefilter = () => {
      if(!startDate || !endDate){
        return 0
      }
      setSearchInfo((prevInfo) => ({
        ...prevInfo,
        startDate: formatDateMDY(startDate),
        endDate: formatDateMDY(endDate),
        page: 0
        }));
    };

   
    return (
        <>

<div className="row gx-lg-5 gy-3">
        <div className="col-lg-6 col-md-6 col-sm-6 col-6 pe-lg-3 pe-1">
          <p className="custom-datepicker-title">From</p>
          <div className="custom-datepicker">
            <div className="input-container">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="input-datepicker"
              />
              <Image src={calender} alt="Calendar" className="calendar-icon" width={15}/>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 col-6 ps-lg-3 ps-1">
          <p className="custom-datepicker-title">To</p>
          <div className="custom-datepicker">
            <div className="input-container">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select a date"
                className="input-datepicker"
              />
              <Image src={calender} alt="Calendar" className="calendar-icon" width={15}/>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <ButtonPrimary
          onClick={handlefilter}
          size={!isMobileView ? "custom-small" : "custom-medium"}
        >
          <div className="d-flex justify-content-center align-items-center">
            <Image src={filter} alt="icon" className="me-1" />
            Filter
          </div>
        </ButtonPrimary>
      </div>

      <div className="bank-info-divider mt-3"></div>


       

      {
        isMobileView ?
        <div className="table-responsive container mt-4 px-0">
        <table className="table table-striped custom-stripe" id="my-custom-table">
          <thead style={{ backgroundColor: "#2C7C7A" }}>
            <tr>
              <th className="table-header-history">Request Time</th>
              <th className="table-header-history">Request For</th>
              <th className="table-header-history">Reference No</th>
              <th className="table-header-history">Request Amount (Tk)</th>
              <th className="table-header-history">Transaction Fee (Tk)</th>
              <th className="table-header-history">Net Amount (Tk)</th>
              <th className="table-header-history">Payment Type</th>
              <th className="table-header-history">Invoice/ TrxID</th>
              <th className="table-header-history">Status</th>
            </tr>
          </thead>
          <tbody>

          {
            data?.data?.data.length > 0 ? 
            data?.data?.data?.map((value, index, array) => (
              <tr key={index} className={index === array.length - 1 ? 'custom-border-bottom' : ''}>
              <td className="p-3 profile-value-td-history text-center">{formatDateWithDate(value?.REQUEST_TIME)}</td>
              <td className="p-3 profile-value-td-history text-center">
                <p className="transection-order-type">
                     {value?.REQUEST_TYPE === 'A' ? 'Prefund' : 'Withdraw' }
                </p>
              </td>
              <td className="p-3 profile-value-td-history text-center">{value?.TRANS_REF_NO}</td>
              <td className="p-3 profile-value-td-history text-center">{value?.PREFUND_AMOUNT}</td>
              
              <td className="p-3 profile-value-td-history text-center">{value?.TRANS_FEE}</td>
              <td className="p-3 profile-value-td-history text-center">{value?.NET_AMOUNT}</td>
              <td className="p-3 profile-value-td-history text-center">{value?.PAYMENT_TYPE}</td>
              <td className="p-3 profile-value-td-history text-center">{value?.INVOICE_ID  ? (value?.INVOICE_ID) : '-'}</td>
              <td className="p-3 profile-value-td-history text-center">
              {/* <p className="transection-status-success">
                    Confirmed
                </p> */}
                <p className={`${value?.VERIFIED_YN === "Confirmed" ? "transection-status-success" : value?.VERIFIED_YN === "Declined" ? "transection-status-reject" : "transection-status-pending"}`}>{value?.VERIFIED_YN === "Confirmed" ? 'Confirmed' : value?.VERIFIED_YN === "Declined" ? 'Rejected' : 'Pending'}</p>
              </td>
            </tr>
            ))
            :
							<tr>
								<td colSpan={9} className='text-center'>No Data Found</td>
							</tr>
          }
          </tbody>
        </table>
      </div> 

      :

      <HistoryBoExpandDiv items={data?.data?.data}/>
      }  


      {/* <HistoryBoPrefund /> */}

      {data?.data?.meta?.total > 0 && (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mt-3">
                {1 > 0 && (
                  <Pagination
                    previousLabel={
                      <Image
                        src={
                          isPreviousDisabled ? PreviousDisable : PreviousActive
                        }
                        alt="previous"
                      />
                    }
                    nextLabel={
                      <Image
                        src={isNextDisabled ? NextDisable : NextActive}
                        alt="next"
                      />
                    }
                    breakLabel={breakLabel}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={!isMobileView ? 3 : 5}
                    onPageChange={handlePageChange}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    initialPage={currentPage}
                    forcePage={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
            
        </>
    );
};

export default HistoryBoPrefund;