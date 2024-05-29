/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-page-custom-font */
import Instagram from "@/assets/images/Instagram_icon.svg";
import Facebook from "@/assets/images/facebook_icon.svg";
import LinkedIn from "@/assets/images/linkedin_icon.svg";
import PhoneIcon from "@/assets/images/phone_icon.svg";
import Twitter from "@/assets/images/twitter_icon.svg";
import hambuger from "@/assets/images/hamburger_icon.svg";
import logo from "@/assets/images/jomma_logo.svg";
import { deleteCookie, getCookie, getCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invest from "../../assets/images/Invest.svg";
import Login from "../../assets/images/login.svg";
import Markets from "../../assets/images/markets.svg";
import Mobilelogo from "../../assets/images/mobile_jomma_logo.svg";
import Mutualfunds from "../../assets/images/mutualfunds.svg";
import Prefund from "../../assets/images/prefund.svg";
import Signup from "../../assets/images/signup.svg";
import ButtonPrimary from "../UI/ButtonPrimary";
import ButtonSecondary from "../UI/ButtonSecondary";
import { useGetGlobalInfoQuery } from "@/redux/api/apiSlice";

import { useSelector } from "react-redux";

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [dataForModal, setDataForModal] = useState("");
  const [boModalShow, setBoModalShow] = useState(false);
  const token = useSelector((state) => state?.auth?.accessToken?.accessToken);
  const { data, isLoading, error, refetch } = useGetGlobalInfoQuery(undefined, {
    skip: !token
  });
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        await refetch();
      }
    };

    fetchData();
  }, [token, refetch]);
  /* const { data, isLoading, error, refetch } = useGetGlobalInfoQuery(); */
  const handleCheckBoComplete = () => {
    router.push(`${process.env.NEXT_PUBLIC_PREFUND_URL}`);
  };

  const handleCheckBoCompleteMobile = () => {
    closeOffcanvasProgrammatically();
    handleCheckBoComplete();
  };


  useEffect(() => {
    if (getCookies("accessToken").accessToken) setIsLogin(true);
    if (router.query.isModalOpen == "true") setModalShow(true);
    else setModalShow(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCookies("accessToken").accessToken]);



  const navigateSignUpPage = () => {
    router.push(`${process.env.NEXT_PUBLIC_SIGNUP_URL}`);
  };
  const navigateLogInPage = () => {
    router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
  };

  function closeOffcanvasProgrammatically() {
    const closeOffcanvasButton = document.getElementById(
      "closeOffcanvasButton"
    );
    if (closeOffcanvasButton) {
      closeOffcanvasButton.click(); // Simulate a click
    }
  }

  const handelLogoutMobileView = async () => {
    handelLogOut();
    closeOffcanvasProgrammatically();
  };

 

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      if (router.pathname === "/login") {
        await router.push(`${process.env.NEXT_PUBLIC_SIGNUP_URL}`);
      } else {
        await router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };


  return (
    <>
     
      <Head>
        {/* <link
					href="https://fonts.googleapis.com/css2?family=Arimo:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@100;300;400;500;600;700;800;900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"
				/> */}
      </Head>
      <div className="root-div-section">

        {/* Navber section */}
        <nav className="navbar navbar-expand-lg navbar-light sticky-top bg-white">
          <div className="container navbar-padding">
            <div className="d-flex justify-content-center align-items-center">
              
              <Link href="/">
                <Image
                  src={Mobilelogo}
                  alt="Jomma Logo"
                  className="show-logo-mobile ps-1"
                />
                <Image src={logo} alt="Jomma Logo" className="show-logo-tab ps-1" />
              </Link>
            </div>

            <div
              className="offcanvas offcanvas-start offcanvas-radius"
              tabIndex="-1"
              id="offcanvasDrawerMenu"
              aria-labelledby="offcanvasDrawerMenuLabel"
            >
              
              
            </div>

            <Link className="navbar-brand" href={'/'}>
              <Image src={logo} alt="logo-icon-jomma" className="show-logo-pc" />
              <div className="show-logo-mobile show-logo-tab">
               {
                  <ButtonSecondary
                    onClick={handleButtonClick}
                    size="custom-small"
                  >
                    {`${router.pathname === "/login" ? "Signup" : "Login"}`}
                  </ButtonSecondary>}
              </div>
            </Link>

            <div
              className="collapse navbar-collapse custom-active-bar"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                
              </ul>
              <div className="d-flex align-items-center">
               
                  <>
                    <div className="me-3">
                      <ButtonSecondary
                        onClick={navigateLogInPage}
                        size="custom-small"
                      >
                        Login
                      </ButtonSecondary>
                    </div>

                    <ButtonPrimary
                      onClick={navigateSignUpPage}
                      size="custom-small"
                    >
                      Sign Up
                    </ButtonPrimary>
                  </>
              </div>
            </div>
          </div>
        </nav>

        <section className="child-div-section">{children}</section>

        <ToastContainer className="global-toast-container" />

        {/* Footer Section */}
        <footer className="footer-gradient-color mt-5">
          <div className="container">
            <div className="row py-lg-5 pt-5 pb-3">
              <div className="col-lg-3 col-md-3 col-sm-12 mb-0 mb-md-0">
                <div className="mb-3 footer-font-size">
                  <Link
                    href={"https://www.facebook.com/jomma.online"}
                    target="_blank"
                  >
                    <Image className="me-4" src={Facebook} alt="facebook-icon-jomma" />
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/company/jomma_online/"}
                    target="_blank"
                  >
                    <Image className="me-4" src={LinkedIn} alt="linkedin-icon-jomma" />
                  </Link>
                  <Link
                    href={"https://twitter.com/jomma_online"}
                    target="_blank"
                  >
                    <Image className="me-4" src={Twitter} alt="twitter-icon-jomma" />
                  </Link>
                  <Link
                    href={"https://www.instagram.com/jomma_online/"}
                    target="_blank"
                  >
                    <Image className="me-4" src={Instagram} alt="instagram-icon-jomma" />
                  </Link>
                </div>
                <Link
                  href={`${process.env.NEXT_PUBLIC_PRIVACY_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_TERMS_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Terms & Conditions
                </Link>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <Link
                  href={`${process.env.NEXT_PUBLIC_STOCKS_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Stocks
                </Link>

                <Link
                  href={`${process.env.NEXT_PUBLIC_STOCKS_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Investment Themes
                </Link>

                
                <Link
                  href={`${process.env.NEXT_PUBLIC_FUND_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Mutual Funds
                </Link>
              </div>
              <div className="col-lg-3 col-md-3 col-12 mb-0 mb-md-0">
              <Link
                  href={`${process.env.NEXT_PUBLIC_BOND_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Private Bonds
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_MARKET_URL}`}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Markets
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_PREFUND_URL}`}
                  className="d-block mb-lg-3 mb-2 px-0 footer-font-size text-white text-decoration-none"
                >
                  BO Prefund & Withdraw
                </Link>
                
                {/* <Link
									href={''}
									className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
								>
									FAQs
								</Link> */}
              </div>
              <div className="col-lg-4 col-md-3 col-sm-12">
                <p className="mb-lg-4 mb-3 text-white footer-text">
                  Write to Us with your questions
                </p>
                <Link
                  href={`${process.env.NEXT_PUBLIC_HELP_URL}`}
                  className="text-white text-decoration-none footer-home-button footer-text"
                >
                  Go to Help Page
                </Link>

                <Link
                  href={"tel:09613826566"}
                  className="d-flex align-items-center mt-4 text-decoration-none"
                >
                  <Image src={PhoneIcon} alt="phone-icon" />
                  <p className="font-18 text-white mb-0 ms-2 footer-text">
                    09613826566
                  </p>
                </Link>
              </div>
            </div>

            <p className="text-center mb-0 footer-bottom-text text-white mt-2">
              Jomma is a service of Jomma Limited, a private limited company
              registered under the Companies Act 1994. Trade License:
              TRAD/DSCC/000223/2020
            </p>
            <p className="text-center mb-0 pb-3 footer-bottom-text text-white mt-0">
              Ventura Iconia, Level 3, House 37, Road 11, Block H, Banani, Dhaka
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default RootLayout;
