import styles from '@/styles/home/home.module.css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import next from '../../../assets/images/next.svg';
import previous from '../../../assets/images/previous.svg';
import { useGetJommaVideosQuery } from '@/redux/api/apiSlice';
import VideoShowModal from './VideoShowModal';

const Working = () => {
	const sliderRef = useRef(null);
	const [videoModalShow, setVideoModalShow] = useState(false);
	const [dataForModal, setDataForModal] = useState();
	const openVideoModal = (videoLink) => {
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
			  slidesToShow: 1.8,
			  slidesToScroll: 1,
			  prevArrow: false,
			  nextArrow: false,
			  initialSlide: 0,
			},
		  },
		],
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
		<div className={`${styles.featuredSection}`} style={{ marginBottom:'-3rem' }}>

		<div className="container pb-lg-5 pt-lg-3 py-md-5 py-2" >
			<div className={`${styles.sliderButton}`}>
			<div className={`${styles.sliderButtonImage}`}></div>
				<div>
					<p className={`${styles.featuredTitle} ps-lg-5 mb-0 mb-lg-2`}>How It Works</p>
				</div>

				<div className={`${styles.sliderButtonImage}`}>
					<Image
						src={previous}
						alt="previous"
						className="me-2"
						onClick={() => sliderRef.current.slickPrev()}
						style={{ cursor: 'pointer' }}
					/>
					<Image
						src={next}
						alt="next"
						onClick={() => sliderRef.current.slickNext()}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			</div>

			<Slider className="my-custom-carousel"  ref={sliderRef} {...settings}>
				

				{
		data?.data?.map(video => 
		
			<div key={video?.VIDEO_ID} onClick={() => openVideoModal(video?.VIDEO_LINK) }>
		<div
			className={`${styles.workBody} d-flex justify-content-center align-items-center`} style={{ cursor:'pointer' }}
		>
			<Image
				src={video?.VIDEO_IMAGE}
				layout="responsive"
				width={355}
				height={120}
				alt="video"
				className={`${styles.workingImageSize}`}
			/>
		</div>
	</div>
		
		)
	} 
				
			</Slider>

			{/* Graph Modal */}
			{videoModalShow && (
				<VideoShowModal
					data={dataForModal}
					show={videoModalShow}
					onHide={() => setVideoModalShow(false)}
				/>
			)}
		</div>
		</div>
	);
};

export default Working;
