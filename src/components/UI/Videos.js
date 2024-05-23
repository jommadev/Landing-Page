import next from '@/assets/images/trading-next.svg';
import previous from '@/assets/images/trading-previous.svg';
import { useGetJommaVideosQuery } from '@/redux/api/apiSlice';
import styles from '@/styles/home/home.module.css';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import VideoShowModal from '../Shared/Modals/VideoShowModal';

const Videos = ({ isMobileView }) => {
	const sliderRef = useRef(null);
	const [videoModalShow, setVideoModalShow] = useState(false);
	const [dataForModal, setDataForModal] = useState();
	const [sliderLoaded, setSliderLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (sliderRef.current) {
			setSliderLoaded(true);
		}
	}, [sliderRef]);
	const openVideoModal = (videoLink) => {
		console.log(videoLink);
		setDataForModal(videoLink);
		setVideoModalShow(true);
	};

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 3.2,
		prevArrow: false,
		nextArrow: false,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3.2,
					slidesToScroll: 1,
					infinite: false,
					dots: false,
					initialSlide: 0,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2.5,
					slidesToScroll: 1,
					initialSlide: 0,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1.5,
					slidesToScroll: 1,
					prevArrow: false,
					nextArrow: false,
					initialSlide: 0,
				},
			},
		],
		afterChange: (current) => {
			setCurrentSlide(current);
		},
	};

	const { data, isLoading, error } = useGetJommaVideosQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	if (!data || !data.data || data.data.length === 0) {
		return <div>No data available</div>;
	}

	return (
		<>
        <h1 className="text-center video-section-header mt-5">Videos for You</h1>
			<div className="container py-lg-3 ">
				<div className="slider-container position-relative">
					{!isMobileView ? (
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
						{data?.data?.map((video) => (
							<div
								key={video?.VIDEO_ID}
								onClick={() => openVideoModal(video?.VIDEO_LINK)}
							>
								<div
									className={`video-body d-flex justify-content-center align-items-center`}
									style={{ cursor: 'pointer' }}
								>
									<Image
										src={video?.VIDEO_IMAGE}
										layout="responsive"
										width={355}
										height={120}
										alt="video"
										className={`working-image-size`}
									/>
								</div>
							</div>
						))}
					</Slider>
					{!isMobileView ? (
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
									currentSlide === data.data?.length - settings.slidesToShow
										? 'none'
										: 'block',
							}}
						/>
					) : null}
				</div>
			</div>

			{/* Graph Modal */}
			{videoModalShow && (
				<VideoShowModal
					data={dataForModal}
					show={videoModalShow}
					onHide={() => setVideoModalShow(false)}
				/>
			)}
		</>
	);
};

export default Videos;
