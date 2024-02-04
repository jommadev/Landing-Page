import { formatDateWithDate } from '@/utils/formatDate';
import { formatNumberWithCommasAndDecimal, formatNumberWithCommasAndInt } from '@/utils/formatNumberWithCommasAndDecimal';
import React, { useState } from 'react';


const TransactionExpandDiv = ({ items }) => {
    return (
        <div className='mt-3'>
          {items?.map((item, index) => (
            <div key={index} className="mb-3 mobile-portfolio-details" style={{ padding: "8px 16px", borderRadius: "4px", backgroundColor: parseInt(index) % 2 === 1 ? '#E1F3F3' : null }}>
              
              <div className='d-flex justify-content-between align-items-center mb-2 pt-1'>
                <p className='mb-0'>{formatDateWithDate(item?.TRANS_DATE)}</p>
                <p className={`mb-0 ${item?.ORDER_STATUS === "Confirmed" ? "transection-status-success" : item?.ORDER_STATUS === "Declined" ? "transection-status-rejected" : "transection-status-pending"}`}>{item?.ORDER_STATUS === "Confirmed" ? 'Confirmed' : item?.ORDER_STATUS === "Declined" ? 'Declined' : 'Pending'}</p>
                <p className='mb-0 transection-order-type'>{item?.ORDER_TYPE}</p>
              </div>
              <div className='d-flex justify-content-between  mb-3  transection-order-type' style={{backgroundColor: "#DCDCDD3D", borderRadius:"4px"}}>
                <p className='mb-0 '>{item?.PRODUCT}:</p>
                <p className='mb-0 text-end'>{item?.NAME}</p>
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
            <p className='mb-1'>Transaction Units:</p>
            <p className='mb-1'>{content?.ORDER_STATUS === "Pending" ? '-' : formatNumberWithCommasAndInt(content?.EXECUTE_QTY)}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className='mb-1'>Transaction Price (Tk):</p>
            <p className='mb-1'>{content?.ORDER_STATUS === "Pending" ? '-' : formatNumberWithCommasAndDecimal(content?.EXECUTE_PRICE)}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className='mb-1'>Transaction Amount (Tk):</p>
            <p className='mb-1'>{content?.ORDER_STATUS === "Pending" ? '-' : formatNumberWithCommasAndDecimal(content?.EXECUTE_AMOUNT)}</p>
          </div>
          <div
            className={`content-transition ${showMore ? 'expanded' : ''}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Order Units:</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content.ORDER_UNITS)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Order NAV (Tk):</p>
            <p className='mb-1'>{formatNumberWithCommasAndDecimal(content.ORDER_PRICE)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <p className='mb-1'>Order Amount (Tk):</p>
            <p className='mb-1'>{formatNumberWithCommasAndDecimal(content.ORDER_AMOUNT)}</p>                  
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

export default TransactionExpandDiv;