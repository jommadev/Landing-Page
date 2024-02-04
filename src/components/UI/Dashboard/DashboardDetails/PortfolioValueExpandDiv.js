import { formatNumberWithCommasAndDecimal, formatNumberWithCommasAndInt } from '@/utils/formatNumberWithCommasAndDecimal';
import React, { useState } from 'react';


const PortfolioValueExpandDiv = ({ items }) => {
    return (
        <div>
          {items?.map((item, index) => (
            <div key={index} className="mb-3 mobile-portfolio-name" style={{ padding: "8px 16px", borderRadius: "4px", backgroundColor: parseInt(index) % 2 === 0 ? '#E1F3F3' : null }}>
              <p className='' >{item.PROD_NAME}</p>
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
          <div className="d-flex justify-content-between">
            <p className='mb-1'>Portfolio Value:</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content.PORTFOLIO_BALANCE)}</p>

          </div>
          <div className="d-flex justify-content-between">
            <p className='mb-1'>Gain/Loss:</p>
            <p className='mb-1' style={{color: parseInt(content.GAIN_LOSS) < 0 ? '#D60D0D' : '#389429'}}>{formatNumberWithCommasAndDecimal(content.GAIN_LOSS)}</p>
          </div>
          <div
            className={`content-transition ${showMore ? 'expanded' : ''}`}
          >
            <div className="d-flex justify-content-between">
              <p className='mb-1'>Gain/Loss:</p>
            <p className='mb-1' style={{color: parseInt(content.GAIN_LOSS_PERC) < 0 ? '#D60D0D' : '#389429'}}>{formatNumberWithCommasAndDecimal(content.GAIN_LOSS_PERC)}%</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className='mb-1'>Total Unit:</p>
            <p className='mb-1'>{formatNumberWithCommasAndInt(content.UNITS)}</p>                  
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

export default PortfolioValueExpandDiv;