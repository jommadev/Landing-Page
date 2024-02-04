/* eslint-disable react-hooks/exhaustive-deps */
import BdFlag from '@/assets/images/BD-flag.svg';
import UsaFlag from '@/assets/images/USA-flag.svg';
import floorprice from '@/assets/images/floorPrice.svg';
import addStock from '@/assets/images/game-add-stcok.svg';
import addedStock from '@/assets/images/game-addedd-stocks.svg';
import decreaseStock from '@/assets/images/game-decrease-stocks.svg';
import increaseStock from '@/assets/images/game-increase-stocks.svg';
import searchIcon from '@/assets/images/game-search-icon.svg';
import NextActive from '@/assets/images/next-active-btn-game.svg';
import NextDisable from '@/assets/images/next_disable.svg';
import PreviousActive from '@/assets/images/previous-active-btn-game.svg';
import PreviousDisable from '@/assets/images/previous_disable.svg';
import sorting from '@/assets/images/sortingYTD.svg';
import { useGetGameSellStocksListQuery } from '@/redux/api/apiSlice';
import { formatNumberWithTwoDecimalPlaces } from '@/utils/flootNumberAndIsNegative';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import GameProductGraphModal from './GameProductGraphModal';
import { useSelector } from 'react-redux';
import { getCookies } from 'cookies-next';
import Swal from "sweetalert2";

const SellStocks = ({ isMobileView }) => {
	const router = useRouter();
	const [input, setInput] = useState('');
	const [activeIndex, setActiveIndex] = useState(0);
	const [selectedItems, setSelectedItems] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const [openSearchList, setOpenSearchList] = useState(true);
	const [results, setResults] = useState([]);
	const [pageCount, setpageCount] = useState(1);
	const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [graphModalShow, setGraphModalShow] = useState(false);
	const [dataForModal, setDataForModal] = useState({});

	const [searchInfo, setSearchInfo] = useState({
		searchTerm: '',
		page: '',
		limit: '',
		sortBy: '',
		sortOrder: '',
	});

	const customRefetchValue = useSelector((state) => state.customRefetch.value);

	const { data, isLoading, error, refetch } =
		useGetGameSellStocksListQuery(searchInfo);

	useEffect(() => {
		refetch();
		setpageCount(data?.data?.meta?.pageCount);
		setSearchItem(data?.data?.searchTitle);
		if (data?.data?.meta?.pageCount === 1) {
			setIsPreviousDisabled(true);
			setIsNextDisabled(true);
		}
	}, [data, selectedItems,customRefetchValue]);

	const handleDivClick = (index) => {
		setActiveIndex(index);
		setInput('');
		setCurrentPage(0);

		if (index === 0) {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				page: '',
				sortBy: '',
				sortOrder: '',
			}));
		} else if (index === 1) {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				fin_id: 5,
				page: '',
				sortBy: '',
				sortOrder: '',
			}));
		} else {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				fin_id: 10,
				page: '',
				sortBy: '',
				sortOrder: '',
			}));
		}
	};

	const handleChange = (value) => {
		setInput(value);
		setActiveIndex(0);
		setOpenSearchList(true);
		searchList(value);
		setSearchInfo((prevInfo) => ({
			searchTerm: value,
			is_floor_flag: '',
			page: '',
			limit: '',
			sortBy: '',
			sortOrder: '',
		}));
	};

	const searchList = (value) => {
		const filteredResults = searchItem.filter((item) => {
			return (
				item &&
				item.PROD_NAME && // Check if the property exists
				item.PROD_NAME.toLowerCase().includes(value.toLowerCase())
			);
		});
		setResults(filteredResults);
	};

	const handleSelectSearchItem = (value) => {
		setInput(value);
		searchList(value);
		setSearchInfo((prevInfo) => ({
			...prevInfo,
			searchTerm: value.toLowerCase(),
		}));

		setOpenSearchList(false);
	};

	const handleClearInput = () => {
		setInput('');
		setOpenSearchList(false);
		setActiveIndex(0);
		setSearchInfo((prevInfo) => ({
			searchTerm: '',
			is_floor_flag: '',
			order_sl: '',
			page: '1',
			limit: '',
			sortBy: '',
			sortOrder: '',
		}));
	};

	const handleSorting = () => {
		setSearchInfo((prevInfo) => ({
			...prevInfo,
			sortBy: 'YEAR_TO_DATE',
			sortOrder: prevInfo.sortOrder === 'asc' ? 'desc' : 'asc',
		}));
	};

	const handelAddItem = (addItem) => {
		const isIdIncluded = selectedItems.some(
			(product) =>
				product?.FIN_PROD_ID === addItem?.FIN_PROD_ID &&
				product?.TRADE_CODE === addItem?.TRADE_CODE
		);

		if (isIdIncluded) {
			setSelectedItems((prevSelected) =>
				prevSelected.filter(
					(item) =>
						item?.FIN_PROD_ID !== addItem?.FIN_PROD_ID ||
						item?.TRADE_CODE !== addItem?.TRADE_CODE
				)
			);
		} else {
			setSelectedItems((prevSelected) => [...prevSelected, addItem]);
		}
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
		<span style={{ fontWeight: 'bold', color: '#fff' }}>. .</span>
	) : (
		<span style={{ fontWeight: 'bold', color: '#fff' }}>. . .</span>
	);

	const openGraphModal = (id, yearToDate, closePrice) => {
		const modalInfo = {
			id,
			yearToDate,
			closePrice,
		};
		setDataForModal(modalInfo); // Set the data you want to send to the modal
		setGraphModalShow(true); // Open the modal
	};

	const handleSendSelectedStocks = async () => {
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_API_URL}/game/selected-game-stock-session/${process.env.NEXT_PUBLIC_SELL_REQ}`,
				{
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						authorization: `${getCookies('accessToken').accessToken}`,
					},
					body: JSON.stringify(selectedItems),
				}
			);

			const information = await response.json();
		};

		fetchData();

		router.push({
			pathname: '/trading-game/stocks/sell-stocks/stock-units',
		}); 
	};

	return (
		<>
			<div className="search-bar-container mt-4">
				<div className="mt-0 mt-lg-5 d-flex justify-content-center align-items-center">
					<div className="search-container w-100">
						<Image src={searchIcon} alt="Search Icon" className="search-icon" />
						<input
							type="text"
							placeholder={`Search Stocks`}
							className="search-input"
							value={input}
							onChange={(e) => handleChange(e.target.value)}
						/>
					</div>
					<div className="ms-2 ms-lg-4">
						<div onClick={handleClearInput} className="game-clear-btn">
							Clear
						</div>
					</div>
				</div>
				{input && openSearchList && results && results.length > 0 && (
					<div className="results-list">
						{results.map((result) => (
							<div
								style={{ cursor: 'pointer' }}
								className="search-result"
								key={result?.FIN_PROD_ID}
								onClick={() => {
									handleSelectSearchItem(result?.PROD_NAME);
								}}
							>
								{result?.PROD_NAME} - {result?.TRADE_CODE}
							</div>
						))}
					</div>
				)}
			</div>

			<div className="mt-3 game-filter-btn-area">
				<p
					className={
						activeIndex === 0
							? `mb-0 filter-game-btn-active`
							: `mb-0 filter-game-btn-inactive`
					}
					onClick={() => handleDivClick(0)}
				>
					All
				</p>
				<p
					className={
						activeIndex === 1
							? `mb-0 mx-lg-3 mx-2 filter-game-btn-active`
							: `mb-0 mx-lg-3 mx-2 filter-game-btn-inactive`
					}
					onClick={() => handleDivClick(1)}
				>
					<Image src={BdFlag} alt="flag" className="game-filter-flag" />
				</p>
				<p
					className={
						activeIndex === 2
							? `mb-0 filter-game-btn-active`
							: `mb-0 filter-game-btn-inactive`
					}
					onClick={() => handleDivClick(2)}
				>
					<Image src={UsaFlag} alt="flag" className="game-filter-flag" />
				</p>
			</div>

			<div className="table-responsive container mt-3 px-0">
				<table
					className="table table-striped custom-game-stripe"
					id="my-custom-table"
				>
					<thead>
						<tr>
							<th className="table-header-history text-start">Stocks</th>
							<th className="table-header-history">Price</th>
							<th
								className="table-header-history"
								onClick={handleSorting}
								style={{ cursor: 'pointer' }}
							>
								Gain/Loss (%)
								<span>
									<Image src={sorting} alt="sorting" />
								</span>
							</th>
							<th className="table-header-history">Select</th>
						</tr>
					</thead>
					<tbody>
						{data?.data?.data.length > 0 ? (
							data?.data?.data?.map((item, index, array) => (
								<tr key={item?.FIN_PROD_ID} className={index === array.length - 1 ? 'custom-game-border-bottom' : ''}>
									<td className="table-tr-padding profile-value-td">
										<p className="mb-1 game-stock-trade-code text-white">
											<span
											className='text-white'
												style={{ cursor: 'pointer' }}
												onClick={() =>
													openGraphModal(
														item?.FIN_PROD_ID,
														item?.YEAR_TO_DATE,
														item?.UNIT_PRICE
													)
												}
											>
												{item?.TRADE_CODE}{' '}
											</span>
											{item?.IS_FLOOR_FLAG ? (
												<span className="game-tooltip">
													<Image
														className="ms-1"
														style={{ marginBottom: '6px' }}
														src={floorprice}
														alt="floorprice"
													/>
													<span className="game-tooltipText">
														This stock is at floor price. Due to low trading
														volume, you may face difficulties selling this stock
													</span>
												</span>
											) : null}
											<Image
												src={item?.FIN_ID === 5 ? BdFlag : UsaFlag}
												alt="flag"
												className="game-filter-flag-product"
											/>
										</p>
										<p className="mb-0 game-stocks-product-name">
											Shares: {item?.PROD_UNITS}
										</p>
									</td>

									<td className="table-tr-padding profile-value-td text-center text-white">
										{formatNumberWithCommasAndDecimal(
											formatNumberWithTwoDecimalPlaces(item?.UNIT_PRICE)
										)}
									</td>

									<td className="table-tr-padding profile-value-td text-center">
										<div
											className="d-flex justify-content-center align-items-center"
											style={{
												color:
													item?.GAIN_LOSS >= 0
														? item?.GAIN_LOSS === 0
															? '#fff'
															: '#66EA51'
														: '#f26e6e',
											}}
										>
											
											{formatNumberWithTwoDecimalPlaces(item?.GAIN_LOSS)}%
											<Image
												className="game-ytd-value-icon"
												src={
													item?.GAIN_LOSS >= 0 ? increaseStock : decreaseStock
												}
												alt="increase"
											/>
										</div>
									</td>

									<td
										className="p-3 profile-value-td text-center"
										style={{ cursor: 'pointer' }}
										onClick={() => handelAddItem(item)}
									>
										{selectedItems.some(
											(selectedItem) =>
												selectedItem.FIN_PROD_ID === item.FIN_PROD_ID
										) ? (
											<Image
												src={addedStock}
												alt="remove stock"
												className="game-stock-add-icon add-product-image-size"
											/>
										) : (
											<Image
												src={addStock}
												alt="add stock"
												className="game-stock-add-icon"
											/>
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="text-center">
									No Data Found
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* Graph Modal */}
				{graphModalShow && (
					<GameProductGraphModal
						data={dataForModal}
						show={graphModalShow}
						onHide={() => setGraphModalShow(false)}
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

				{selectedItems.length > 0 ? (
					<div className="game-fixed-button">
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex align-items-center">
								<p className="game-count-selected-stocks">
									{selectedItems.length}
								</p>
								<p className="ms-2 mb-0">Stocks Selected</p>
							</div>
							<div className="game-next-btn" onClick={handleSendSelectedStocks}>
								Next
							</div>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default SellStocks;
