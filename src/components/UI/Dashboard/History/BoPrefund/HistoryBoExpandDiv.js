import { formatDateWithDate } from '@/utils/formatDate';
import { formatNumberWithCommasAndDecimal, formatNumberWithCommasAndInt } from '@/utils/formatNumberWithCommasAndDecimal';
import React, { useState } from 'react';


const HistoryBoExpandDiv = ({ items }) => {
    return (
        <div className='mt-3'>
          {items?.map((item, index) => (
            <div key={index} className="mb-3 mobile-portfolio-details" style={{ padding: "8px 16px", borderRadius: "4px", backgroundColor: parseInt(index) % 2 === 1 ? '#E1F3F3' : null }}>
              
              <div className='d-flex justify-content-between align-items-center mb-2 pt-1'>
                <p className='mb-0'>{formatDateWithDate(item?.REQUEST_TIME)}</p>
                <p className={`${item?.VERIFIED_YN === "Confirmed" ? "transection-status-success" : item?.VERIFIED_YN === "Declined" ? "transection-status-rejected" : "transection-status-pending"}`}>{item?.VERIFIED_YN === "Confirmed" ? 'Confirmed' : item?.VERIFIED_YN === "Declined" ? 'Declined' : 'Pending'}</p>
                <p className='mb-0 transection-order-type'>{item?.REQUEST_TYPE === 'A' ? 'Prefund' : 'Withdraw' }</p>
              </div>
              <ContentWithShowMore content={item} />
            </div>
          ))}
        </div>
      );
    };
    
    const ContentWithShowMore = ({ content }) => {
      const [showMore, setShowMore] = useState(false);
    
      return (
        <div className='mobile-portfolio-details'>
          <div className="d-flex justify-content-between align-items-center">
            <p className='mb-1'>Request Amount (Tk):</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content?.PREFUND_AMOUNT)}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className='mb-1'>Transaction Fee (Tk):</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content?.TRANS_FEE)}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className='mb-1'>Net Amount (Tk):</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content?.NET_AMOUNT)}</p>
          </div>
          <div
            className={`content-transition ${showMore ? 'expanded' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Payment Type:</p>
            <p className='mb-1'>{(content.PAYMENT_TYPE)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Invoice/TrxID:</p>
            <p className='mb-1'>{content?.INVOICE_ID  ? (content?.INVOICE_ID) : '-'}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Reference No:</p>
            <p className='mb-1'>{content.TRANS_REF_NO}</p>                  
            </div>
          </div>
          {Object.keys(content).length > 2 && (
            <p
              className="mb-0 text-end"
              style={{ textDecoration: "underline", fontWeight:"600", fontSize:"14px", cursor:"pointer" }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </p>
          )}
        </div>
  );
};

export default HistoryBoExpandDiv;