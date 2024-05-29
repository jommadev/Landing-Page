import searchIcon from '@/assets/images/search_icon.svg';
import next from '@/assets/images/trading-next.svg';
import previous from '@/assets/images/trading-previous.svg';
import TradingTuesdayImg from '@/assets/images/trading_tuesday.svg';
import { useGetNewsVideosQuery, useGetTradingTuesdayListQuery } from '@/redux/api/apiSlice';
import styles from '@/styles/home/home.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
const PcTradingTuesday = () => {
	const sliderRef = useRef(null);
	const [sliderLoaded, setSliderLoaded] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isMobileView, setIsMobileView] = useState(false);
	const [openSearchList, setOpenSearchList] = useState(true);
	const [input, setInput] = useState('');
	const [results, setResults] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const [searchInfo, setSearchInfo] = useState({
		searchTerm: '',
		sortBy: 'doc_date',
		sortOrder: 'desc',
	});

	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 768) {
				setIsMobileView(false);
			} else {
				setIsMobileView(true);
			}
		}

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const { data, isLoading, isSuccess,refetch } = useGetTradingTuesdayListQuery(searchInfo);
	useEffect(() => {
		refetch();
		setSearchItem(data?.data?.searchTitle);
	}, [data,refetch]);

	useEffect(() => {
		if (sliderRef.current) {
			setSliderLoaded(true);
		}
	}, [sliderRef]);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 1,
		initialSlide: 0,
		afterChange: (current) => {
			setCurrentSlide(current);
		}
	};

	const mobileSettings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 2.3,
		slidesToScroll: 1,
		initialSlide: 0,
		afterChange: (current) => {
			setCurrentSlide(current);
		}
	};

	const handleChange = (value) => {
		setInput(value);
		setOpenSearchList(true);
		searchList(value);
	};

	const handleSelectSearchItem = (value, code) => {
		setInput(value);
		searchList(value);
		
		setSearchInfo((prevInfo) => ({
			...prevInfo,
			searchTerm: code.toLowerCase(),
		}));
		setOpenSearchList(false);

		
	};

	const searchList = (value) => {
		const filteredResults = searchItem.filter((item) => {
			const searchValueLower = value.toLowerCase();
			return (
			  item &&
			  ((item.PROD_NAME && item.PROD_NAME.toLowerCase().includes(searchValueLower)) ||
			   (item.TRADE_CODE && item.TRADE_CODE.toLowerCase().includes(searchValueLower)))
			);
		  });
		  
		  setResults(filteredResults);
	};

	const [selectedValue, setSelectedValue] = useState('Newest');

	const handleSelectedValue = (event) => {
		setSelectedValue(event.target.value);
	};

	return (
		<>
			<div className="px-2 px-md-3" >
				<div className="row align-items-center">
					<div className="col-lg-8 col-7">
						<div className="d-flex justify-content-end">
							<div className={`${styles.searchBarContainer}`}>
								<div className="mt-0 d-flex justify-content-center align-items-center">
									<div className={`${styles.searchContainer} w-100`}>
										<Image
											src={searchIcon}
											alt="Search Icon"
											className={`${styles.searchIcon}`}
										/>
										<input
											type="text"
											placeholder={`Search`}
											className={`${styles.searchInput}`}
											value={input}
											onChange={(e) => handleChange(e.target.value)}
										/>
									</div>
								</div>
								{input && openSearchList && results && results.length > 0 && (
					<div className={styles.resultsList}>
						{results.map((result) => (
							<div
								style={{ cursor: 'pointer' }}
								className={styles.searchResult}
								key={result?.FIN_PROD_ID}
								onClick={() => {
									handleSelectSearchItem(result?.PROD_NAME, result?.TRADE_CODE);
								}}
							>
								{result?.PROD_NAME} - {result?.TRADE_CODE}
							</div>
						))}
					</div>
				)}
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-5">
						<div className="d-flex justify-content-end w-100">
							<div className="dropdown dropdown-custom">
								<select
									className="form-select custom-form-selector"
									aria-label="Default select example"
									onChange={handleSelectedValue}
									value={selectedValue}
									style={{ cursor: 'pointer' }}
								>
									<option
										value="Newest"
									>
										Newest
									</option>
									<option
										value="Oldest"
									>
										Oldest
									</option>
									<option
										value="MostPopular"
									>
										Most Popular
									</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container px-0 ">
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
					{
						data?.data?.data?.map((item, index) => (
							<div key={item?.DOC_ID} className="" style={{ border: 'none' }}>
							<Link href={item?.DOC_LINK} target='_blank'>
							<Image
								src={item?.DOC_IMAGE}
								alt="Jomma Trading Tuesday"
								width={250}
								height={250}
								className="pe-2 pe-lg-4 pb-0" style={{cursor:'pointer'}}
							/>
							</Link>
						</div>
						))

					}
						
						
					</Slider>


					
					
					{isMobileView ? (
						<Image
							src={next}
							alt="next"
							className="position-absolute end-0 top-50 translate-middle-y"
							onClick={
								currentSlide === data?.data?.data?.length - settings.slidesToShow
									? null
									: () => sliderRef.current.slickNext()
							}
							style={{
								cursor: 'pointer',
								zIndex: 1,
								marginRight: '-10px',
								boxShadow: ' -10px -10px 10px 0px rgba(44, 124, 122, 0.12)',
								borderRadius: '50%',
								display:
									currentSlide >= data?.data?.data?.length - settings.slidesToShow
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

export default PcTradingTuesday;
