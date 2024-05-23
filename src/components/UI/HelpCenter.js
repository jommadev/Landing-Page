/* import brac from '@/assets/images/help-brac.png';
import broker from '@/assets/images/help-broker.svg';
import jomma from '@/assets/images/help-jomma.svg';
import mutual from '@/assets/images/help-mutual-fund.svg';
import stock from '@/assets/images/help-stock.svg';
import game from '@/assets/images/help-trading-game.svg'; */
import next from '@/assets/images/trading-next.svg';
import previous from '@/assets/images/trading-previous.svg';
import { useGetTopicListQuery } from '@/redux/api/apiSlice';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import TopicCard from '../Shared/TopicCard';

/* const data = [
	{
		id: 1,
		image: jomma,
		title_en: 'About Jomma',
		title_bn: 'জমা সম্পর্কে জেনে নিন',
		slug: 'about-jomma',
	},
	{
		id: 2,
		image: broker,
		title_en: 'Online Broker Account',
		title_bn: 'অনলাইনে ব্রোকার একাউন্ট সম্পর্কে জেনে নিন ',
		slug: 'online-broker-account',
	},
	{
		id: 3,
		image: stock,
		title_en: 'Stock Investment',
		title_bn: 'শেয়ার বাজারে বিনিয়োগ সম্পর্কে জেনে নিন ',
		slug: 'stock-investment',
	},
	{
		id: 4,
		image: mutual,
		title_en: 'Mutual Funds',
		title_bn: 'মিচ্যুয়াল ফান্ডে বিনিয়োগ সম্পর্কে জেনে নিন ',
		slug: 'mutual-funds',
	},
	{
		id: 5,
		image: brac,
		title_en: 'Brac EPL Wealth Management',
		title_bn: 'ব্র্যাক ইপিএল ওয়েলথ ম্যানেজমেন্ট সম্পর্কে জেনে নিন',
		slug: 'brac-epl-wealth-management',
	},
	{
		id: 6,
		image: game,
		title_en: 'Trading Simulation Game',
		title_bn: 'বিনিয়োগের সিমুলেশন গেইম সম্পর্কে জেনে নিন ',
		slug: 'trading-simulation-game',
	},
]; */

const HelpCenter = ({ isMobileView }) => {
	const sliderRef = useRef(null);
	const [sliderLoaded, setSliderLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (sliderRef.current) {
			setSliderLoaded(true);
		}
	}, [sliderRef]);

	const { data, isLoading, isSuccess } = useGetTopicListQuery();

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
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
			<h3 className="text-center mb-3">Populer Topics</h3>

			<div className="container  py-3 pb-lg-5">
				<div className="slider-container position-relative">
					{isMobileView ? (
						<Image
							src={previous}
							alt="previous"
							className="position-absolute start-0 top-50 start-0 translate-middle show-logo-pc"
							onClick={() => sliderRef.current.slickPrev()}
							style={{
								cursor: 'pointer',
								zIndex: 1,
								boxShadow: '10px 10px 10px 0px rgba(44, 124, 122, 0.12)',
								borderRadius: '50%',
								display: currentSlide === 0 ? 'none' : 'block',
							}}
						/>
					) : null}
					<Slider {...settings} ref={sliderRef}>
						{data?.data
							?.filter((item) => item.INFO_CAT_ID === 1)
							.map((item) => (
								<TopicCard key={item?.INFO_ID} item={item} /> 
							))}
					</Slider>
					{isMobileView ? (
						<Image
							src={next}
							alt="next"
							className="position-absolute end-0 top-50 translate-middle-y show-logo-pc"
							onClick={
								currentSlide === data?.data?.length - settings.slidesToShow
									? null
									: () => sliderRef.current.slickNext()
							}
							style={{
								cursor: 'pointer',
								zIndex: 1,
								marginRight: '-28px',
								boxShadow: ' -10px -10px 10px 0px rgba(44, 124, 122, 0.12)',
								borderRadius: '50%',
								display:
									currentSlide >= data?.data?.length - settings.slidesToShow
										? 'none'
										: 'block',
							}}
						/>
					) : null}
				</div>
			</div>
		</>
	);
};

export default HelpCenter;
