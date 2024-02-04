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
import { Dropdown } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invest from "../../assets/images/Invest.svg";
import Home from "../../assets/images/home.svg";
import Bonds from "../../assets/images/bonds.svg";
import Dashboard from "../../assets/images/dashboard.svg";
import InvestmentThemes from "../../assets/images/investment-themes.svg";
import Login from "../../assets/images/login.svg";
import Logout from "../../assets/images/logout.svg";
import Markets from "../../assets/images/markets.svg";
import Mobilelogo from "../../assets/images/mobile_jomma_logo.svg";
import Mutualfunds from "../../assets/images/mutualfunds.svg";
import Prefund from "../../assets/images/prefund.svg";
import Signup from "../../assets/images/signup.svg";
import Stocks from "../../assets/images/stocks.svg";
import UserIconDrop from "../../assets/images/user-dropdown.svg";
import UserIcon from "../../assets/images/user-icon.svg";
import ButtonPrimary from "../UI/ButtonPrimary";
import ButtonSecondary from "../UI/ButtonSecondary";
import PasswordChangeModal from "../UI/PasswordChangeModal";
import { useGetGlobalInfoQuery } from "@/redux/api/apiSlice";
import OpenBoModal from "../Shared/Modals/OpenBoModal";
import { userInformation } from "@/redux/features/userInformation/userInformationSlice";
import { useAppDispatch } from "@/redux/hooks";
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
    if (isLogin) {
      if (data?.data?.COMPLETE_YN) {
        router.push("/prefund");
      } else {
        setBoModalShow(true);
      }
    } else {
      router.push("/prefund");
    }
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

  const openChangeModal = (conformation) => {
    setDataForModal(conformation);
    setModalShow(true);
  };

  const navigateSignUpPage = () => {
    router.push("/signup");
  };
  const navigateLogInPage = () => {
    router.push("/login");
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

  /*   useEffect(() => {
    window.sessionStorage.isMySessionActive = "true";
    const isMySessionActive = window.sessionStorage.getItem('isMySessionActive');
    if(isMySessionActive && isMyProjectStart){
      console.log('enter')
      deleteCookie('userId');
  deleteCookie('mobileNumber');
  deleteCookie('accessToken');
      window.sessionStorage.isMySessionActive = "false";
      setIsMyProjectStart(false);
    }
   
  }, []); */

  /* deleteCookie('userId');
  deleteCookie('mobileNumber');
  deleteCookie('accessToken'); */

  const handelLogOut = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/logout`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      deleteCookie("accessToken");
      setIsLogin(false);
      const baseUrl = window.location.origin;
      window.location.href = `${baseUrl}/login`;
      //router.push('/login');
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    try {
      if (router.pathname === "/login") {
        await router.push("/signup");
      } else {
        await router.push("/login");
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const userInfoRefetchApi = useSelector((state) => state.userInfo.value);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookies("accessToken").accessToken; // Assuming you have a function to get the access token.

      if (accessToken) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,
          {
            headers: {
              authorization: `${getCookies("accessToken").accessToken}`,
            },
          }
        );
        const information = await response.json();
        dispatch(userInformation(information?.data));
      }
    };
    fetchData();
  }, [getCookies("accessToken").accessToken, userInfoRefetchApi]);

  return (
    <>
      <PasswordChangeModal
        data={dataForModal}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
              <button
                className="navbar-toggler p-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasDrawerMenu"
                aria-controls="offcanvasDrawerMenu"
              >
                <div className="d-flex align-items-center">
                  <Image src={hambuger} alt="" className="hamburger-size" />
                </div>
              </button>
              <Link href="/home">
                <Image
                  src={Mobilelogo}
                  alt=""
                  className="show-logo-mobile ps-1"
                />
                <Image src={logo} alt="" className="show-logo-tab ps-1" />
              </Link>
            </div>

            <div
              className="offcanvas offcanvas-start offcanvas-radius"
              tabIndex="-1"
              id="offcanvasDrawerMenu"
              aria-labelledby="offcanvasDrawerMenuLabel"
            >
              <div className="offcanvas-header">
                <h5
                  className="offcanvas-title"
                  id="offcanvasDrawerMenuLabel"
                ></h5>
                <button
                  type="button"
                  className="btn-close text-reset text-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  id="closeOffcanvasButton"
                ></button>
              </div>
              <div className="offcanvas-body ps-4">
                {isLogin ? (
                  <>
                    <Link
                      href={"/home"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image src={Home} alt="" width={20} height={20} />
                      </div>
                      <p className="mb-0 text-white">Home</p>
                    </Link>
                    <Link
                      href={"/stocks"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image src={Stocks} alt="" width={20} height={20} />
                      </div>
                      <p className="mb-0 text-white">Stocks</p>
                    </Link>
                    <Link
                      href={"/investment-themes"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image
                          src={InvestmentThemes}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="mb-0 text-white">Investment Themes</p>
                    </Link>
                    <Link
                      href={"/mutual-funds"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image
                          src={Mutualfunds}
                          alt=""
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className="mb-0 text-white">Mutual Funds</p>
                    </Link>
                    <Link
                      href={"/bonds"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image src={Bonds} alt="" width={20} height={20} />
                      </div>
                      <p className="mb-0 text-white">Private Bonds</p>
                    </Link>

                    <div
                      className="my-5"
                      style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#DCDCDD",
                      }}
                    ></div>

                    <Link
                      href={"/dashboard"}
                      className="d-flex align-items-center mobile-drawer-image-link mb-4"
                      onClick={closeOffcanvasProgrammatically}
                    >
                      <div className="mobile-drawer-image-area">
                        <Image src={Dashboard} alt="" width={20} height={20} />
                      </div>
                      <p className="mb-0 text-white">Dashboard</p>
                    </Link>
                  </>
                ) : (
                  <Link
                    href={"/home"}
                    className="d-flex align-items-center mobile-drawer-image-link mb-4"
                    onClick={closeOffcanvasProgrammatically}
                  >
                    <div className="mobile-drawer-image-area">
                      <Image src={Invest} alt="" width={20} height={20} />
                    </div>
                    <p className="mb-0 text-white">Invest</p>
                  </Link>
                )}

                <Link
                  href={"/markets"}
                  className="d-flex align-items-center mobile-drawer-image-link mb-4"
                  onClick={closeOffcanvasProgrammatically}
                >
                  <div className="mobile-drawer-image-area">
                    <Image src={Markets} alt="" width={20} height={20} />
                  </div>
                  <p className="mb-0 text-white">Markets</p>
                </Link>
                <button
                  style={{ border: "none", backgroundColor: "transparent" }}
                  className="d-flex align-items-center mobile-drawer-image-link mb-4 p-0"
                  onClick={handleCheckBoCompleteMobile}
                >
                  <div style={{ marginRight:'20px' }}>
                    <Image src={Prefund} alt="" width={20} height={20} />
                  </div>
                  <p className="mb-0 text-white">BO Prefund & Withdraw</p>
                </button>

                <div className="fixed-bottom p-4">
                  {isLogin ? (
                    <>
                      {/* <Link
												href={''}
												className="d-flex align-items-center mobile-drawer-image-link mb-4"
												onClick={closeOffcanvasProgrammatically}
											>
												<div className="mobile-drawer-image-area">
													<Image src={Setting} alt="" width={20} height={20} />
												</div>
												<p className="mb-0 text-white">Setting</p>
											</Link> */}

                      <Link
                        href={"/login"}
                        className="d-flex align-items-center mobile-drawer-image-link mb-4"
                        onClick={handelLogoutMobileView}
                      >
                        <div className="mobile-drawer-image-area">
                          <Image src={Logout} alt="" width={20} height={20} />
                        </div>
                        <p className="mb-0 text-white">Logout</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href={"/signup"}
                        className="d-flex align-items-center mobile-drawer-image-link mb-4"
                        onClick={closeOffcanvasProgrammatically}
                      >
                        <div className="mobile-drawer-image-area">
                          <Image src={Signup} alt="" width={20} height={20} />
                        </div>
                        <p className="mb-0 text-white">Signup</p>
                      </Link>
                      <Link
                        href={"/login"}
                        className="d-flex align-items-center mobile-drawer-image-link mb-4"
                        onClick={closeOffcanvasProgrammatically}
                      >
                        <div className="mobile-drawer-image-area">
                          <Image src={Login} alt="" width={20} height={20} />
                        </div>
                        <p className="mb-0 text-white">Login</p>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link className="navbar-brand" href="/home">
              <Image src={logo} alt="" className="show-logo-pc" />
              <div className="show-logo-mobile show-logo-tab">
                {isLogin ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      className="custom-dropdown-toggle"
                      id="dropdown-basic"
                    >
                      <div className="mb-1">
                        <Image src={UserIcon} alt="fsdfds" />
                        <Image
                          src={UserIconDrop}
                          width={14}
                          height={12}
                          alt="fsdfds"
                        />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ padding: "0" }}>
                      <Link className="dropdown-item" href="/help">
                        <p className="mb-0 py-2">Help</p>
                      </Link>
                      <div
                        style={{
                          width: "100%",
                          height: "0.5px",
                          backgroundColor: "#DCDCDD",
                        }}
                      ></div>
                      <div
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => openChangeModal("isClickedChangePass")}
                      >
                        <p className="mb-0 py-2">Change Password</p>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "0.5px",
                          backgroundColor: "#DCDCDD",
                        }}
                      ></div>
                      <div
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={handelLogOut}
                      >
                        <p className="mb-0 py-2">Logout</p>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <ButtonSecondary
                    onClick={handleButtonClick}
                    size="custom-small"
                  >
                    {`${router.pathname === "/login" ? "Signup" : "Login"}`}
                  </ButtonSecondary>
                )}
              </div>
            </Link>

            <div
              className="collapse navbar-collapse custom-active-bar"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li
                  className={`${
                    router.pathname === "/home" ? "active-nav-link" : ""
                  } nav-item`}
                >
                  <Link
                    className={`${
                      router.pathname === "/home"
                        ? "active-nav-link"
                        : "text-dark"
                    } nav-link px-4 font-w-400`}
                    aria-current="page"
                    href={"/home"}
                  >
                    {isLogin ? "Home" : "Invest"}
                  </Link>
                  <div className="underline"></div>
                </li>

                <li
                  className={`${
                    router.pathname === "/markets" ? "active-nav-link" : ""
                  } nav-item`}
                >
                  <Link
                    className={`${
                      router.pathname === "/markets"
                        ? "active-nav-link"
                        : "text-dark"
                    } nav-link  px-4 font-w-400`}
                    aria-current="page"
                    href={"/markets"}
                  >
                    Markets
                  </Link>
                  <div className="underline"></div>
                </li>

                {isLogin ? (
                  <li
                    className={`${
                      router.pathname === "/dashboard" ? "active-nav-link" : ""
                    } nav-item`}
                  >
                    <Link
                      className={`${
                        router.pathname === "/dashboard"
                          ? "active-nav-link"
                          : "text-dark"
                      } nav-link px-4 font-w-400`}
                      aria-current="page"
                      href={"/dashboard"}
                    >
                      Dashboard
                    </Link>
                    <div className="underline"></div>
                  </li>
                ) : null}

                <li
                  className={`${
                    router.pathname === "/prefund" ? "active-nav-link" : ""
                  } nav-item`}
                >
                  <button
                    className={`${
                      router.pathname === "/prefund"
                        ? "active-nav-link"
                        : "text-dark"
                    } nav-link px-4 font-w-400`}
                    aria-current="page"
                    style={{ border: "none", backgroundColor: "transparent" }}
                    onClick={handleCheckBoComplete}
                  >
                    BO Prefund & Withdraw
                  </button>
                  <div className="underline"></div>
                </li>
                {boModalShow && (
                  <OpenBoModal
                    data={data?.data}
                    show={boModalShow}
                    onHide={() => setBoModalShow(false)}
                  />
                )}
              </ul>
              <div className="d-flex align-items-center">
                {isLogin ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      className="custom-dropdown-toggle"
                      id="dropdown-basic"
                    >
                      <div className="mb-1">
                        <Image src={UserIcon} alt="fsdfds" />
                        <Image
                          src={UserIconDrop}
                          width={14}
                          height={12}
                          alt="fsdfds"
                        />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ padding: "0" }}>
                      <Link className="dropdown-item" href="/help">
                        <p className="mb-0 py-2">Help</p>
                      </Link>
                      <div
                        style={{
                          width: "100%",
                          height: "0.5px",
                          backgroundColor: "#DCDCDD",
                        }}
                      ></div>
                      <div
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={() => openChangeModal("isClickedChangePass")}
                      >
                        <p className="mb-0 py-2">Change Password</p>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "0.5px",
                          backgroundColor: "#DCDCDD",
                        }}
                      ></div>
                      <div
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={handelLogOut}
                      >
                        <p className="mb-0 py-2">Logout</p>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
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
                )}
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
                    <Image className="me-4" src={Facebook} alt="" />
                  </Link>
                  <Link
                    href={"https://www.linkedin.com/company/jomma_online/"}
                    target="_blank"
                  >
                    <Image className="me-4" src={LinkedIn} alt="" />
                  </Link>
                  <Link
                    href={"https://twitter.com/jomma_online"}
                    target="_blank"
                  >
                    <Image className="me-4" src={Twitter} alt="" />
                  </Link>
                  <Link
                    href={"https://www.instagram.com/jomma_online/"}
                    target="_blank"
                  >
                    <Image className="me-4" src={Instagram} alt="" />
                  </Link>
                </div>
                <Link
                  href={"/privacy-policy"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Privacy Policy
                </Link>
                <Link
                  href={"/terms-and-conditions"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Terms & Conditions
                </Link>
              </div>
              <div className="col-lg-2 col-md-3 col-12">
                <Link
                  href={"/stocks"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Stocks
                </Link>

                <Link
                  href={"/bonds"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Private Bonds
                </Link>
                <Link
                  href={"/mutual-funds"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Mutual Funds
                </Link>
              </div>
              <div className="col-lg-3 col-md-3 col-12 mb-0 mb-md-0">
                <Link
                  href={"/markets"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Markets
                </Link>
                <button
                  onClick={handleCheckBoComplete}
                  style={{ border: "none", backgroundColor: "transparent" }}
                  className="d-block mb-lg-3 mb-2 px-0 footer-font-size text-white text-decoration-none"
                >
                  BO Prefund & Withdraw
                </button>
                <Link
                  href={"/investment-themes"}
                  className="d-block mb-lg-3 mb-2 footer-font-size text-white text-decoration-none"
                >
                  Investment Themes
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
                  href={"/help"}
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
