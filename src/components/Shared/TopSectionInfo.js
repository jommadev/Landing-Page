import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

const TopSectionInfo = ({ data }) => {
	const sliderRef = useRef(null);
	const [sliderLoaded, setSliderLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (sliderRef.current) {
			setSliderLoaded(true);
		}
	}, [sliderRef]);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3.5,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2.3,
					slidesToScroll: 1,
				},
			},
		],
		afterChange: (current) => {
			setCurrentSlide(current);
		},
	};
	return (
		<>
			<div className="py-2">
				<div className="slider-container position-relative">
					<Slider {...settings} ref={sliderRef}>
					{
						data?.map((item, index) => (

							<div key={index}>
							<div
								className="indexs-info"
								style={{ backgroundColor: item?.MONTH_TO_DATE === 0 ? null : item?.MONTH_TO_DATE > 0 ? '#D7EAD4' : '#F7CFCF' }}
							>
								<div className="d-flex justify-content-between align-items-center mb-1" style={{fontWeight:'500'}}>
                                    <p className='mb-0'>{item?.TRADE_CODE}</p>
                                    <p className='mb-0 top-section-value-color' style={{ color: item?.MONTH_TO_DATE === 0 ? null : item?.MONTH_TO_DATE > 0 ? '#389429' : '#D60D0D' }}>{formatNumberWithCommasAndDecimal(item?.MONTH_TO_DATE)}%</p>
                                </div>
								<div className="d-flex justify-content-between align-items-center" style={{fontWeight:'400'}}>
                                    <p className='mb-0'>{formatNumberWithCommasAndDecimal(item?.CURRENT_PRICE)}</p>
									{
										item?.DIFFERENCE_AMOUNT &&
                                    <p className='mb-0 top-section-value-color' style={{ color: item?.DIFFERENCE_AMOUNT === 0 ? null : item?.DIFFERENCE_AMOUNT > 0 ? '#389429' : '#D60D0D' }}>{formatNumberWithCommasAndDecimal(item?.DIFFERENCE_AMOUNT)}</p>
									}
                                </div>
							</div>
						</div>
						))
					}
						
					</Slider>
				</div>
			</div>
		</>
	);
};

export default TopSectionInfo;
