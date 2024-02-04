import styles from '@/styles/home/home.module.css';
import Image from 'next/image';
import next from '../../../../assets/images/special-notice-next.svg';
import previous from '../../../../assets/images/special-notice-previous.svg';
import ButtonPrimary from '../../ButtonPrimary';
import { useRouter } from 'next/router';

const BoPayment = ({
	isMobileView,
	handleNext,
	handlePrev,
	sliderLength,
	currentIndex,
}) => {
    const router = useRouter();
    const handleGoToPayment = () =>{
        router.push('/onboarding/due-payment');
    }
	return (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<div className="d-flex justify-content-center align-items-center">
					{sliderLength !== 1 && (
						<Image
							src={previous}
							alt="previous"
							className="me-3"
							onClick={handlePrev}
							style={{ cursor: 'pointer' }}
						/>
					)}
					<p className={`${styles.customeSliderCount} mb-0`}>
						{currentIndex} of {sliderLength}
					</p>
					{sliderLength !== 1 && (
						<Image
							src={next}
							alt="next"
							className="ms-3"
							onClick={handleNext}
							style={{ cursor: 'pointer' }}
						/>
					)}
				</div>
				<span className={`${styles.noticeInfo} mb-lg-2`} style={{color:'#D60D0D'}}>
				If you don’t pay, your BO a/c will be on hold
				
				</span>
			</div>

			<div className="d-flex justify-content-between align-items-center">
				<p className={`${styles.boCompleted} mb-0`}>
					BO Account Fee: Tk 455/year
				</p>
				<div
					className={`${styles.btnCompleteBo} d-flex justify-content-end align-items-center h-100 pb-0`}
				>
					<ButtonPrimary
						onClick={handleGoToPayment}
						size={isMobileView ? 'custom-medium' : 'custom-small'}
					>
						Pay Now
					</ButtonPrimary>
				</div>
			</div>
		</>
	);
};

export default BoPayment;
