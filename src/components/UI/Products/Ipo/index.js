import styles from "@/styles/products/products.module.css";
import {
  formatNumberWithCommasAndDecimal,
  formatNumberWithCommasAndInt,
} from "@/utils/formatNumberWithCommasAndDecimal";
import {
  calculatePercentageCompletion,
  ipoDateFormat,
  isDateOver,
} from "@/utils/productUtils";
import ButtonPrimary from "../../ButtonPrimary";
import { useJoinIpoMutation } from "@/redux/api/apiSlice";

const Ipo = ({ isMobileView, ipo, refetch }) => {

  const ipoBoTitleClassName = `${styles.IpoPortfolioTitle} ${
    isDateOver(ipo?.CUT_OFF_DATE) &&
    ipo?.JOINED &&
    calculatePercentageCompletion(
      parseFloat(ipo?.USER_PORTFOLIO),
      parseFloat(ipo?.MIN_INVEST_AMOUNT)
    ).needMore === 0
      ? null
      : styles.DisableIpo
  }`;

  const ipoBoValueClassName = `${styles.IpoPortfolioValue} ${
    isDateOver(ipo?.CUT_OFF_DATE) &&
    ipo?.JOINED &&
    calculatePercentageCompletion(
      parseFloat(ipo?.USER_PORTFOLIO),
      parseFloat(ipo?.MIN_INVEST_AMOUNT)
    ).needMore === 0
      ? null
      : styles.DisableIpo
  }`;

  const ipoAmountInvestClassName = `${styles.AmountInvestMore} ${
    isDateOver(ipo?.CUT_OFF_DATE) &&
    ipo?.JOINED &&
    calculatePercentageCompletion(
      parseFloat(ipo?.USER_PORTFOLIO),
      parseFloat(ipo?.MIN_INVEST_AMOUNT)
    ).needMore === 0
      ? null
      : styles.DisableIpo
  }`;

  const ipoCustomeProgressClassName = `${styles.IpoCustomeProgress} progress ${
    isDateOver(ipo?.CUT_OFF_DATE) &&
    ipo?.JOINED === 1 &&
    calculatePercentageCompletion(
      parseFloat(ipo?.USER_PORTFOLIO),
      parseFloat(ipo?.MIN_INVEST_AMOUNT)
    ).needMore === 0
      ? null
      : styles.DisableIpoCustomeProgress
  }`;
  const ipoCustomeProgressBarClassName = `${
    styles.customeProgressBar
  } progress-bar ${
    isDateOver(ipo?.CUT_OFF_DATE) &&
    ipo?.JOINED === 1 &&
    calculatePercentageCompletion(
      parseFloat(ipo?.USER_PORTFOLIO),
      parseFloat(ipo?.MIN_INVEST_AMOUNT)
    ).needMore === 0
      ? null
      : styles.DisableIpocustomeProgressBar
  }`;

 
  const [joinIpo, { isLoading, isError, isSuccess }] =
	useJoinIpoMutation();
  const handleJoinNow = async() => {
    const options = {
			data: {
        IPO_ID: ipo?.IPO_ID,
        USER_BO_BALANCE: ipo?.USER_BO_BALANCE,
        USER_PORTFOLIO: ipo?.USER_PORTFOLIO
			},
		  };
	  
		  const response = await joinIpo(options);
	  
		  if ("data" in response) {
        refetch()
		  }
	  
		  if ("error" in response) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: `${response?.error?.data?.message}`,
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
				allowEscapeKey: false,
        });
		  }
    
  };

  return (
    <div className={isMobileView ? "my-3 container" : "my-3"}>
      <div className={`${styles.IpoSection}`}>
        <div className={`${styles.TitleArea}`}>
          <div className="d-flex justify-content-between align-items-center">
            <div className={`${styles.TitleAreaMobile}`}>
              <p className={`${styles.IpoOnGoin} mb-1`}>Ongoing IPO</p>
              <p className={`${styles.IpoProductName}`}>{ipo?.IPO_NAME}</p>
            </div>

            <div>
              {ipo?.JOINED ? (
                <p className={`${styles.InProgress} mb-0 text-center`}>
                  {" "}
                  In Progress
                </p>
              ) : (
                <ButtonPrimary
                  onClick={
                    calculatePercentageCompletion(
                      parseFloat(ipo?.USER_PORTFOLIO),
                      parseFloat(ipo?.MIN_INVEST_AMOUNT)
                    ).needMore == 0
                      ? handleJoinNow
                      : null
                  }
                  size={!isMobileView ? "custom-small" : "custom-medium"}
                  isDisabled={
                    calculatePercentageCompletion(
                      parseFloat(ipo?.USER_PORTFOLIO),
                      parseFloat(ipo?.MIN_INVEST_AMOUNT)
                    ).needMore == 0
                      ? false
                      : true
                  }
                >
                  Join Now
                </ButtonPrimary>
              )}


              {/* <p className={`${styles.InProgress} mb-0 text-center`}> In Progress</p> */}
              {/* <p className={`${styles.Ineligible} mb-0 text-center`}>Ineligible</p> */}
            </div>
          </div>
        </div>

        {ipo?.VERIFIED_YN === 0 ? (
          <>
            <div className={`${styles.DetailsArea}`}>
              <div>
                <p
                  className={`${styles.IpoPortfolioTitle} ${
                    isDateOver(ipo?.CUT_OFF_DATE) && ipo?.JOINED == 0
                      ? styles.DisableIpo
                      : null
                  }`}
                >
                  Min. Portfolio Value
                </p>
                <p
                  className={`${styles.IpoPortfolioValue} ${
                    isDateOver(ipo?.CUT_OFF_DATE) && ipo?.JOINED == 0
                      ? styles.DisableIpo
                      : null
                  }`}
                >
                  Tk. {formatNumberWithCommasAndInt(ipo?.MIN_INVEST_AMOUNT)}
                </p>
              </div>
              <div>
                <p
                  className={`${styles.IpoPortfolioTitle} ${
                    isDateOver(ipo?.CUT_OFF_DATE) && ipo?.JOINED == 0
                      ? styles.DisableIpo
                      : null
                  }`}
                >
                  Cut-off Date
                </p>
                <p
                  className={`${styles.IpoPortfolioValue} ${
                    isDateOver(ipo?.CUT_OFF_DATE) && ipo?.JOINED == 0
                      ? styles.DisableIpo
                      : null
                  } text-center`}
                >
                  {ipoDateFormat(ipo?.CUT_OFF_DATE)}
                </p>
              </div>
              {/* <p>{formatNumberWithCommasAndInt(calculatePercentageCompletion(
										parseFloat(ipo?.USER_PORTFOLIO),
										parseFloat(ipo?.MIN_INVEST_AMOUNT)
									).needMore)}</p> */}

              {isDateOver(ipo?.CUT_OFF_DATE) && ipo?.JOINED == 0 ? (
                <p className={`${styles.ExpiredTitle} mb-0 text-center`}>
                  Expired
                </p>
              ) : calculatePercentageCompletion(
                  parseFloat(ipo?.USER_PORTFOLIO),
                  parseFloat(ipo?.MIN_INVEST_AMOUNT)
                ).needMore !== 0 ? (
                <div>
                  <p className={`${styles.AmountInvestMore}`}>
                    Invest Tk{" "}
                    {formatNumberWithCommasAndDecimal(
                      calculatePercentageCompletion(
                        parseFloat(ipo?.USER_PORTFOLIO),
                        parseFloat(ipo?.MIN_INVEST_AMOUNT)
                      ).needMore
                    )}{" "}
                    more
                  </p>
                  <div className={`${styles.IpoCustomeProgress} progress`}>
                    <div
                      className={`${styles.customeProgressBar} progress-bar`}
                      role="progressbar"
                      aria-valuenow={
                        calculatePercentageCompletion(
                          parseFloat(ipo?.USER_PORTFOLIO),
                          parseFloat(ipo?.MIN_INVEST_AMOUNT)
                        ).percentageCompletion
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      //style={{ width: `70%` }}
                      style={{
                        width: `${
                          calculatePercentageCompletion(
                            parseFloat(ipo?.USER_PORTFOLIO),
                            parseFloat(ipo?.MIN_INVEST_AMOUNT)
                          ).percentageCompletion
                        }%`,
                      }}
                    >
                      <div />
                    </div>
                  </div>
                </div>
              ) : (
                <p className={`${styles.CompletedTitle} mb-0 text-center`}>
                  Completed
                </p>
              )}
            </div>

            <div
              className=""
              style={{
                width: "99%",
                height: "1px",
                backgroundColor: "#dcdcdd",
                margin: "0 auto",
              }}
            ></div>

            <div className={`${styles.DetailsArea}`}>
              <div>
                <p className={ipoBoTitleClassName}>Min. BO Balance</p>
                <p className={ipoBoValueClassName}>
                  Tk. {formatNumberWithCommasAndInt(ipo?.MIN_BO_AMOUNT)}
                </p>
              </div>
              <div className="ps-4">
                <p className={ipoBoTitleClassName}>Subscription Period</p>
                <p className={ipoBoValueClassName}>
                  {ipoDateFormat(ipo?.SUBS_ST_DATE)} -{" "}
                  {ipoDateFormat(ipo?.SUBS_END_DATE)}
                </p>
              </div>

              {isDateOver(ipo?.SUBS_END_DATE) &&
              calculatePercentageCompletion(
                parseFloat(ipo?.USER_BO_BALANCE),
                parseFloat(ipo?.MIN_BO_AMOUNT)
              ).needMore !== 0 ? (
                <p className={`${styles.ExpiredTitle} mb-0 text-center`}>
                  Expired
                </p>
              ) : !isDateOver(ipo?.SUBS_END_DATE) &&
                calculatePercentageCompletion(
                  parseFloat(ipo?.USER_BO_BALANCE),
                  parseFloat(ipo?.MIN_BO_AMOUNT)
                ).needMore !== 0 ? (
                <div>
                  <p className={ipoAmountInvestClassName}>
                    Prefund Tk{" "}
                    {formatNumberWithCommasAndDecimal(
                      calculatePercentageCompletion(
                        parseFloat(ipo?.USER_BO_BALANCE),
                        parseFloat(ipo?.MIN_BO_AMOUNT)
                      ).needMore
                    )}{" "}
                    more
                  </p>
                  <div className={ipoCustomeProgressClassName}>
                    <div
                      className={ipoCustomeProgressBarClassName}
                      role="progressbar"
                      aria-valuenow={
                        calculatePercentageCompletion(
                          parseFloat(ipo?.USER_BO_BALANCE),
                          parseFloat(ipo?.MIN_BO_AMOUNT)
                        ).percentageCompletion
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      //style={{ width: `70%` }}
                      style={{
                        width: `${
                          calculatePercentageCompletion(
                            parseFloat(ipo?.USER_BO_BALANCE),
                            parseFloat(ipo?.MIN_BO_AMOUNT)
                          ).percentageCompletion
                        }%`,
                      }}
                    >
                      <div />
                    </div>
                  </div>
                </div>
              ) : (
                <p className={`${styles.CompletedTitle} mb-0 text-center`}>
                  Completed
                </p>
              )}

              {/* <div className={ipoCustomeProgressClassName}>
							<div
								className={ipoCustomeProgressBarClassName}
								role="progressbar"
								aria-valuenow={
									calculatePercentageCompletion(
										parseFloat(ipo?.USER_BO_BALANCE),
										parseFloat(ipo?.MIN_BO_AMOUNT)
									).percentageCompletion
								}
								aria-valuemin="0"
								aria-valuemax="100"
								//style={{ width: `70%` }}
								style={{
									width: `${
										calculatePercentageCompletion(
											parseFloat(ipo?.USER_BO_BALANCE),
											parseFloat(ipo?.MIN_BO_AMOUNT)
										).percentageCompletion
									}%`,
								}}
							>
								<div />
							</div>
						</div> */}
            </div>
          </>
        ) : (
          <div className={`${styles.ApprovedArea}`}>
            <p className="text-center mb-0">
              IPO Application:{" "}
              {ipo?.VERIFIED_YN === 1 ? (
                <span className={`${styles.Approved}`}>Approved</span>
              ) : (
                <span className={`${styles.Declined}`}>Declined</span>
              )}
            </p>
          </div>
        )}

        {/* <div
					className=""
					style={{
						width: '99%',
						height: '1px',
						backgroundColor: '#dcdcdd',
						margin: '0 auto',
					}}
				></div>

				<div className="mt-1" style={{ fontSize: '3px' }}>
					&nbsp;
				</div> */}

        {/* <div className={`${styles.ApprovedArea}`}>
                <p className="text-center mb-0">IPO Application: <span>Approved</span></p>
            </div> */}
      </div>
    </div>
  );
};

export default Ipo;
