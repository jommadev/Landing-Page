import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import TopSectionInfo from '../../Shared/TopSectionInfo';

const MobileView = ({ data }) => {
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
        slidesToShow: 2.2,
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
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
                },
            },
        ],
        afterChange: (current) => {
            setCurrentSlide(current);
        },
    };

    return (
        <div className=" py-2" >
            <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link newsFilter active"
                        id="pills-indexs-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-indexs"
                        type="button"
                        role="tab"
                        aria-controls="pills-indexs"
                        aria-selected="true"
                    >
                        Stocks
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link newsFilter"
                        id="pills-top-stocks-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-top-stocks"
                        type="button"
                        role="tab"
                        aria-controls="pills-top-stocks"
                        aria-selected="false"
                    >
                        Top 3 Stocks
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className="nav-link newsFilter"
                        id="pills-top-mutual-funds-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-top-mutual-funds"
                        type="button"
                        role="tab"
                        aria-controls="pills-top-mutual-funds"
                        aria-selected="false"
                    >
                        Top 3 Mutual Funds
                    </button>
                </li>
            </ul>


            <div className="tab-content mt-1 mb-0 " id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-indexs" role="tabpanel" aria-labelledby="pills-indexs-tab">
                    <div className="slider-container position-relative">
                        <Slider {...settings} ref={sliderRef}>
                            {data?.data?.index?.map((item, index) => (
                                <div key={index}>
                                    <TopSectionInfo item={item} />
                                </div>
                            ))}
                        </Slider>
						
                    </div>
                </div>

                <div className="tab-pane fade" id="pills-top-stocks" role="tabpanel" aria-labelledby="pills-top-stocks-tab">
                    <div className="slider-container position-relative">
                        <Slider {...settings} ref={sliderRef}>
                            {data?.data?.stocks?.map((item, index) => (
                                <div key={index}>
                                    <TopSectionInfo item={item} />
                                </div>
                            ))}
                        </Slider>
						
                    </div>
                </div>

                <div className="tab-pane fade" id="pills-top-mutual-funds" role="tabpanel" aria-labelledby="pills-top-mutual-funds-tab">
                    <div className="slider-container position-relative">
                        <Slider {...settings} ref={sliderRef}>
                            {data?.data?.mutual_funds?.map((item, index) => (
                                <div key={index}>
                                    <TopSectionInfo item={item} />
                                </div>
                            ))}
                        </Slider>
						
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileView;
