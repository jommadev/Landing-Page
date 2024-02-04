/* eslint-disable react-hooks/exhaustive-deps */
import NextActive from "@/assets/images/next-active-btn-game.svg";
import NextDisable from "@/assets/images/next_disable.svg";
import PreviousActive from "@/assets/images/previous-active-btn-game.svg";
import PreviousDisable from "@/assets/images/previous_disable.svg";
import sorting from "@/assets/images/sortingYTD.svg";
import GamePortfolioTableModal from "@/components/Shared/GamePortfolioTableModal";
import { useGetGamePortfolioTableValueQuery } from "@/redux/api/apiSlice";
import { isNegative } from "@/utils/flootNumberAndIsNegative";
import { formatNumberWithCommasAndDecimal } from "@/utils/formatNumberWithCommasAndDecimal";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useSelector } from "react-redux";

const UserGamePortfolioTable = ({ isMobileView }) => {
  const [pageCount, setpageCount] = useState(1);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortedIconShow, setSortedIconShow] = useState(1);

  const [searchInfo, setSearchInfo] = useState({
    searchTerm: "",
    page: "",
    limit: "",
    sortBy: "prod_name",
    sortOrder: "asc",
  });

  const customRefetchValue = useSelector((state) => state.customRefetch.value);

  const { data, isLoading, error, refetch } =
    useGetGamePortfolioTableValueQuery(searchInfo);

  useEffect(() => {
    refetch();
    setpageCount(data?.data?.meta?.pageCount);
    if (data?.data?.meta?.pageCount === 1) {
      setIsPreviousDisabled(true);
      setIsNextDisabled(true);
    }
  }, [data, customRefetchValue]);

  const handleSortingByProductName = () => {
    setSortedIconShow(1);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      sortBy: "prod_name",
      sortOrder: prevInfo.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const handleSortingByUnits = () => {
    setSortedIconShow(2);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      sortBy: "units_held",
      sortOrder: prevInfo.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const handleSortingByPortfolioValue = () => {
    setSortedIconShow(3);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      sortBy: "portfolio_value",
      sortOrder: prevInfo.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const handleSortingByGainLoss = () => {
    setSortedIconShow(4);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      sortBy: "gain_loss",
      sortOrder: prevInfo.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const handleSortingByGainLossPer = () => {
    setSortedIconShow(5);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      sortBy: "gain_loss_perc",
      sortOrder: prevInfo.sortOrder === "asc" ? "desc" : "asc",
    }));
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      page: selectedPage.selected + 1,
    }));

    const isPreviousDisabled = selectedPage.selected === 0;
    const isNextDisabled = selectedPage.selected === pageCount - 1;

    setIsPreviousDisabled(isPreviousDisabled);
    setIsNextDisabled(isNextDisabled);
  };

  const breakLabel = isMobileView ? (
    <span style={{ fontWeight: "bold", color: "#fff" }}>. .</span>
  ) : (
    <span style={{ fontWeight: "bold", color: "#fff" }}>. . .</span>
  );


  const [modalShow, setModalShow] = useState(false);
  const [dataForModal, setDataForModal] = useState({});
  const handlePortfolioModalShow = (item) =>{
	setDataForModal(item);
	setModalShow(true);
  }

  return (
    <>
      <div className="table-responsive container mt-5 px-0">
        <table
          className="table table-striped custom-game-stripe"
          id="my-custom-table"
        >
          <thead>
            <tr>
              <th
                className="table-game-header text-start"
                onClick={handleSortingByProductName}
                style={{ cursor: "pointer" }}
              >
                Product Name
                {sortedIconShow === 1 && (
                  <span>
                    <Image src={sorting} alt="sorting" />
                  </span>
                )}
              </th>

              {isMobileView ? (
                <th
                  className="table-game-header"
                  onClick={handleSortingByUnits}
                  style={{ cursor: "pointer" }}
                >
                  Units Held
                  {sortedIconShow === 2 && (
                    <span>
                      <Image src={sorting} alt="sorting" />
                    </span>
                  )}
                </th>
              ) : null}

              <th
                className="table-game-header"
                onClick={handleSortingByPortfolioValue}
                style={{ cursor: "pointer" }}
              >
                Portfolio Value
                {sortedIconShow === 3 && (
                  <span>
                    <Image src={sorting} alt="sorting" />
                  </span>
                )}
              </th>
              <th
                className="table-game-header"
                onClick={handleSortingByGainLoss}
                style={{ cursor: "pointer" }}
              >
                Gain/Loss
                {sortedIconShow === 4 && (
                  <span>
                    <Image src={sorting} alt="sorting" />
                  </span>
                )}
              </th>
              <th
                className="table-game-header"
                onClick={handleSortingByGainLossPer}
                style={{ cursor: "pointer" }}
              >
                Gain/Loss %
                {sortedIconShow === 5 && (
                  <span>
                    <Image src={sorting} alt="sorting" />
                  </span>
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.data?.data.length > 0 ? (
              data?.data?.data?.map((item) => (
                <tr key={item?.prod_name}>
                  <td className="game-value-td">
                    {isMobileView ? (
                      <p className="mb-0">{item?.prod_name}</p>
                    ) : (
                      <p
                        className="mb-0"
						onClick={() => handlePortfolioModalShow(item)}
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        {item?.trade_code}
                      </p>
                    )}
                  </td>

                  {isMobileView ? (
                    <td className="game-value-td text-center">
                      <p className="mb-0">{item?.units_held}</p>
                    </td>
                  ) : null}

                  <td className="game-value-td text-center">
                    <p className="mb-0">
                      {formatNumberWithCommasAndDecimal(item?.portfolio_value)}
                    </p>
                  </td>
                  <td className="game-value-td text-center">
                    <p
                      className="mb-0"
                      style={
                        !isNegative(item?.gain_loss)
                          ? item?.gain_loss == 0
                            ? null
                            : { color: "#66ea51" }
                          : { color: "#f26e6e" }
                      }
                    >
                      {formatNumberWithCommasAndDecimal(item?.gain_loss)}
                    </p>
                  </td>
                  <td
                    className="game-value-td text-center"
                    style={
                      !isNegative(item?.gain_loss_perc)
                        ? item?.gain_loss_perc == 0
                          ? null
                          : { color: "#66ea51" }
                        : { color: "#f26e6e" }
                    }
                  >
                    <p className="mb-0">
                      {formatNumberWithCommasAndDecimal(item?.gain_loss_perc)}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-white">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>

		{modalShow && (
				<GamePortfolioTableModal
					data={dataForModal}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
			)}


        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mt-3">
                {data?.data?.data.length > 0 && (
                  <Pagination
                    previousLabel={
                      <Image
                        src={
                          isPreviousDisabled ? PreviousDisable : PreviousActive
                        }
                        alt="previous"
                      />
                    }
                    nextLabel={
                      <Image
                        src={isNextDisabled ? NextDisable : NextActive}
                        alt="next"
                      />
                    }
                    breakLabel={breakLabel}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={isMobileView ? 5 : 3}
                    onPageChange={handlePageChange}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link game-page-link"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    initialPage={currentPage}
                    forcePage={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGamePortfolioTable;
