/* eslint-disable react-hooks/exhaustive-deps */
import styles from '@/styles/home/home.module.css';
import { useEffect, useState } from 'react';
import BoPayment from './SpeciaNoticeItems/BoPayment';
import BoProfileComplete from './SpeciaNoticeItems/BoProfileComplete';
import ClaimVoucher from './SpeciaNoticeItems/ClaimVoucher';
const SpecialNoticebar = ({ isMobileView, data, specialNotice }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [sliderLength, setSliderLength] = useState(0);

    useEffect(() => {
        let intervalId;
		setSliderLength(specialNotice?.LENGTH)
        if (sliderLength > 1) {
          intervalId = setInterval(() => {
            handleNext();
          }, 8000);
        }
      
        return () => {
          clearInterval(intervalId);
        };
      }, [currentIndex, sliderLength]);

	const handleNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderLength);
	};

	const handlePrev = () => {
		setCurrentIndex(
			(prevIndex) => (prevIndex - 1 + sliderLength) % sliderLength
		);
	};


	return (
		<>
			<div className={`${styles.boProfileSection} pt-1 pb-2`}>
				<div className="container">
					<div className={`${styles.sliderContainer}`}>
						<div
                        className={`${styles.sliderWrapper}`}
							style={{ transform: `translateX(${-currentIndex * 100}%)` }}
						>
                        {
                            specialNotice?.COMPLETE_YN == 0 &&
							<div className={`${styles.customSlideClass}`}>
								<BoProfileComplete
									isMobileView={isMobileView}
									data={data}
									handleNext={handleNext}
                                    handlePrev={handlePrev}
                                    sliderLength={sliderLength}
                                    currentIndex={currentIndex+1}
								/>
							</div>
                        }
						{
							specialNotice?.COMPLETE_YN == 1 && specialNotice?.BO_PAID_FLAG == 0 &&
                        <div className={`${styles.customSlideClass}`}>
								<BoPayment
									isMobileView={isMobileView}
									handleNext={handleNext}
									handlePrev={handlePrev}
                                    sliderLength={sliderLength}
                                    currentIndex={currentIndex+1}
								/>
							</div>
						}

						{
							specialNotice?.VOUCHER_COUNT == 1 &&
							<div className={`${styles.customSlideClass}`}>
								<ClaimVoucher
									isMobileView={isMobileView}
									handleNext={handleNext}
                                    handlePrev={handlePrev}
                                    sliderLength={sliderLength}
                                    currentIndex={currentIndex+1}
								/>
							</div>
						}
							
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SpecialNoticebar;
