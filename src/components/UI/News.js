/* eslint-disable @next/next/no-page-custom-font */
import NewsCard from "@/components/Shared/NewsCard";
import ShowMoreButton from "@/components/Shared/ShowMoreButton";
import { useGetAllNewsQuery } from "@/redux/api/apiSlice";
import styles from "@/styles/markets/news.module.css";
import Head from "next/head";
import { useState } from "react";
import Slider from "react-slick";
/* import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'; */

const News = () => {
  const [activeTab, setActiveTab] = useState("Bengali News");
  const [activeEnNewTab, setActiveEnNewTab] = useState(0);
  const [showBnAll, setShowBnAll] = useState(false);
  const [showEnAll, setShowEnAll] = useState(false);

  const [searchInfo, setSearchInfo] = useState({
    PAPER_TYPE: "BN",
  });

  const { data, isLoading, error, refetch } = useGetAllNewsQuery(searchInfo);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.9,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const handleShowBanglaNews = (tabId) => {
    setActiveTab(tabId);
    setSearchInfo((prevInfo) => ({
      PAPER_TYPE: "BN",
    }));
    document.getElementById("pills-all-bangla-news-tab").click();
  };
  const handleShowEnglishNews = (tabId) => {
    setActiveTab(tabId);
    setSearchInfo((prevInfo) => ({
      PAPER_TYPE: "EN",
    }));
    document.getElementById("pills-all-english-news-tab").click();
    setActiveEnNewTab(0);
  };

  const handleTabClick = (index) => {
    setActiveEnNewTab(index);
    if (index != 0) {
      const tabId = `pills-EN_paper_${
        data?.data?.papers_name[index - 1]?.PAPER_ID
      }-tab`;
      document.getElementById(tabId)?.click();
    } else {
      document.getElementById("pills-all-english-news-tab").click();
    }
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wdth,wght@100,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <>
        {/* nav and tabs section */}
        <div className=" row mt-4 new-nav-area mb-4">
          <div className="col-lg-6 col-6 px-0">
            <div
              className={`nav-link custom-new-nav-link ${
                activeTab === "Bengali News" ? "active" : ""
              }`}
              onClick={() => handleShowBanglaNews("Bengali News")}
            >
              Bengali News
            </div>
          </div>
          <div className="col-lg-6 col-6 px-0">
            <div
              className={`nav-link custom-new-nav-link ${
                activeTab === "English News" ? "active" : ""
              }`}
              onClick={() => handleShowEnglishNews("English News")}
            >
              English News
            </div>
          </div>
        </div>

        <div className="tab-content mb-4" id="pills-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === "Bengali News" ? "show active" : ""
            }`}
            style={{ fontFamily: "Noto Sans Bengali" }}
          >
            <div className={`${styles.newsContentLength}`}>
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link active newsFilter`}
                    id="pills-all-bangla-news-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-all-bangla-news"
                    type="button"
                    role="tab"
                    aria-controls="pills-all-bangla-news"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>

                {data?.data?.papers_name?.map((paper_name) => {
                  return (
                    <li
                      className="nav-item"
                      role="presentation"
                      key={paper_name?.PAPER_ID}
                    >
                      <button
                        className={`nav-link newsFilter `}
                        id={`pills-BN_paper_${paper_name?.PAPER_ID}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-BN_paper_${paper_name?.PAPER_ID}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-BN_paper_${paper_name?.PAPER_ID}`}
                        aria-selected="true"
                      >
                        {paper_name?.PAPER_NAME}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="tab-content mt-3 mb-0" id="pills-tabContent">
                <div
                  className={`tab-pane fade show active`}
                  id="pills-all-bangla-news"
                  role="tabpanel"
                  aria-labelledby="pills-all-bangla-news-tab"
                >
                  {data?.data?.news
                    .slice(0, showBnAll ? data?.data?.news?.length : 3)
                    .map((newsItem, index) => (
                      <NewsCard key={index} newsItem={newsItem} />
                    ))}

                  {data?.data?.news?.length > 3 && (
                    <ShowMoreButton
                      showAll={showBnAll}
                      setShowAll={setShowBnAll}
                    />
                  )}
                </div>

                {data?.data?.papers_name?.map((paper_name, index) => {
                  return (
                    <div
                      className={`tab-pane fade`}
                      id={`pills-BN_paper_${paper_name?.PAPER_ID}`}
                      role="tabpanel"
                      aria-labelledby={`pills-BN_paper_${paper_name?.PAPER_ID}-tab`}
                      key={index}
                    >
                      {data?.data?.news?.map((newsItem, index) => {
                        if (newsItem?.PAPER_ID === paper_name?.PAPER_ID) {
                          return <NewsCard key={index} newsItem={newsItem} />;
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "English News" ? "show active" : ""
            }`}
          >
            <div className={`${styles.newsContentLength}`}>
              <ul
                className="nav nav-pills show-pc"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link active newsFilter`}
                    id="pills-all-english-news-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-all-english-news"
                    type="button"
                    role="tab"
                    aria-controls="pills-all-english-news"
                    aria-selected="true"
                  >
                    All
                  </button>
                </li>

                {data?.data?.papers_name?.map((paper_name) => {
                  return (
                    <li
                      className="nav-item"
                      role="presentation"
                      key={paper_name?.PAPER_ID}
                    >
                      <button
                        className={`nav-link newsFilter`}
                        id={`pills-EN_paper_${paper_name?.PAPER_ID}-tab`}
                        data-bs-toggle="pill"
                        data-bs-target={`#pills-EN_paper_${paper_name?.PAPER_ID}`}
                        type="button"
                        role="tab"
                        aria-controls={`pills-EN_paper_${paper_name?.PAPER_ID}`}
                        aria-selected="true"
                      >
                        {paper_name?.PAPER_NAME}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <Slider
                {...settings}
                className="slick-slider-container show-mobile"
              >
                <div className={activeEnNewTab === 0 ? "active" : ""}>
                  <button
                    className={`nav-link ${
                      activeEnNewTab === 0 ? "active" : ""
                    } newsFilter`}
                    id="pills-all-english-news-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-all-english-news"
                    type="button"
                    role="tab"
                    aria-controls="pills-all-english-news"
                    aria-selected={activeEnNewTab === 0}
                    onClick={() => handleTabClick(0)}
                    style={{ border: "none" }}
                  >
                    All
                  </button>
                </div>
                {data?.data?.papers_name?.map((paper_name, index) => (
                  <div
                    key={paper_name?.PAPER_ID}
                    className={activeEnNewTab === index + 1 ? "active" : ""}
                  >
                    <button
                      className={`nav-link ${
                        activeEnNewTab === index + 1 ? "active" : ""
                      } newsFilter`}
                      id={`pills-EN_paper_${paper_name?.PAPER_ID}-tab`}
                      data-bs-toggle="pill"
                      data-bs-target={`#pills-EN_paper_${paper_name?.PAPER_ID}`}
                      type="button"
                      role="tab"
                      aria-controls={`pills-EN_paper_${paper_name?.PAPER_ID}`}
                      aria-selected={activeEnNewTab === index + 1}
                      onClick={() =>
                        handleTabClick(index + 1, paper_name?.PAPER_ID)
                      }
                      style={{ border: "none" }}
                    >
                      {paper_name?.PAPER_NAME}
                    </button>
                  </div>
                ))}
              </Slider>

              <div className="tab-content mt-2 mb-0" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-all-english-news"
                  role="tabpanel"
                  aria-labelledby="pills-all-english-news-tab"
                >
                  {data?.data?.news
                    .slice(0, showBnAll ? data?.data?.news?.length : 3)
                    .map((newsItem, index) => (
                      <NewsCard key={index} newsItem={newsItem} />
                    ))}

                  {data?.data?.news?.length > 3 && (
                    <ShowMoreButton
                      showAll={showBnAll}
                      setShowAll={setShowBnAll}
                    />
                  )}
                </div>

                {data?.data?.papers_name?.map((paper_name, index) => {
                  return (
                    <div
                      className={`tab-pane fade`}
                      id={`pills-EN_paper_${paper_name?.PAPER_ID}`}
                      role="tabpanel"
                      aria-labelledby={`pills-EN_paper_${paper_name?.PAPER_ID}-tab`}
                      key={index}
                    >
                      {data?.data?.news?.map((newsItem, index) => {
                        if (newsItem?.PAPER_ID === paper_name?.PAPER_ID) {
                          return <NewsCard key={index} newsItem={newsItem} />;
                        }
                        return null;
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default News;
