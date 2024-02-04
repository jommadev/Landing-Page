import addedStock from '@/assets/images/add-complete-stock-icon.svg';
import addStock from '@/assets/images/add-stock-icon.svg';
import decreaseStock from '@/assets/images/decrease-stock-icon.svg';
import floorprice from '@/assets/images/floorPrice.svg';
import increaseStock from '@/assets/images/increase-stock-icon.svg';
import NextActive from '@/assets/images/next_active.svg';
import NextDisable from '@/assets/images/next_disable.svg';
import PreviousActive from '@/assets/images/previous_active.svg';
import PreviousDisable from '@/assets/images/previous_disable.svg';
import searchIcon from '@/assets/images/search_icon.svg';
import sorting from '@/assets/images/sortingYTD.svg';
import ButtonPrimary from '@/components/UI/ButtonPrimary';
import ButtonSecondary from '@/components/UI/ButtonSecondary';
import GraphModal from '@/components/UI/Markets/GraphModal';
import { useGetStockBuyRequestQuery } from '@/redux/api/apiSlice';
import styles from '@/styles/products/products.module.css';
import { formatNumberWithTwoDecimalPlaces } from '@/utils/flootNumberAndIsNegative';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import { getCookies } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pagination from 'react-paginate';

const BuyRequestDetails = ({ isMobileView }) => {
	const router = useRouter();
	const [input, setInput] = useState('');
	const [selectedItems, setSelectedItems] = useState([]);
	const [searchItem, setSearchItem] = useState([]);
	const [openSearchList, setOpenSearchList] = useState(true);
	const [results, setResults] = useState([]);
	const [pageCount, setpageCount] = useState(1);
	const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [isDisabled, setIsDisabled] = useState(false);

	const [searchInfo, setSearchInfo] = useState({
		searchTerm: '',
		fin_id: 4,
		fund_manager_id: '2',
		is_floor_flag: '',
		order_sl: '',
		page: '',
		limit: '',
		sortBy: 'market_cap',
		sortOrder: '',
	});


	const { data, isLoading, error, refetch } =
		useGetStockBuyRequestQuery(searchInfo);

	useEffect(() => {
		setpageCount(data?.data?.meta?.pageCount);
		setSearchItem(data?.data?.searchTitle);
		if (data?.data?.meta?.pageCount === 1) {
			setIsPreviousDisabled(true);
			setIsNextDisabled(true);
		}
	}, [data, selectedItems]);

	const handleChange = (value) => {
		setInput(value);
		setOpenSearchList(true);
		searchList(value);
		setSearchInfo((prevInfo) => ({
			searchTerm: value,
			fin_id: 4,
			is_floor_flag: '',
			order_sl: '',
			page: '',
			limit: '',
			sortBy: '',
			sortOrder: '',
			fund_manager_id: '2',
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
		setSearchInfo((prevInfo) => ({
			searchTerm: '',
			fin_id: 4,
			is_floor_flag: '',
			order_sl: '',
			page: '',
			limit: '',
			sortBy: '',
			sortOrder: '',
			fund_manager_id: '2',
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
			setSelectedItems((prevSelected) => [addItem]);
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
		<span style={{ fontWeight: 'bold' }}>. .</span>
	) : (
		<span style={{ fontWeight: 'bold' }}>. . .</span>
	);

	const handleSendSelectedStocks = async () => {
		setIsDisabled(true);
		const fetchData = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/selected-mutualfunds-session/${process.env.NEXT_PUBLIC_BUY_REQ}`,
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
			setIsDisabled(true);
		};

		fetchData();

		router.push({
			pathname: '/mutual-funds/buy-mutual-funds/mutual-fund-units',
		});
	};

	const [graphModalShow, setGraphModalShow] = useState(false);
	const [dataForModal, setDataForModal] = useState({});
	const openGraphModal = (id, yearToDate, closePrice, floorFlag) => {
		const modalInfo = {
			id,
			yearToDate,
			closePrice,
			floorFlag
		};
		setDataForModal(modalInfo); // Set the data you want to send to the modal
		setGraphModalShow(true); // Open the modal
	};

	return (
		<>
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
							placeholder={`Search Mutual Funds`}
							className={`${styles.searchInput}`}
							value={input}
							onChange={(e) => handleChange(e.target.value)}
						/>
					</div>
					<div className="ms-2 ms-lg-4">
						<ButtonSecondary
							onClick={handleClearInput}
							size={!isMobileView ? 'custom-small' : 'custom-medium'}
						>
							Clear
						</ButtonSecondary>
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
									handleSelectSearchItem(result?.PROD_NAME);
								}}
							>
								{result?.PROD_NAME} - {result?.TRADE_CODE}
							</div>
						))}
					</div>
				)}
			</div>

			

			<div className="table-responsive container mt-4 px-0">
				<table className="table table-striped custom-stripe" id="my-custom-table">
					<thead style={{ backgroundColor: '#2C7C7A' }}>
						<tr>
							<th
								className="table-header-history text-start"
							>
								Product Name
							</th>
							<th className="table-header-history">NAV (Tk)</th>
							<th
								className="table-header-history"
								onClick={handleSorting}
								style={{ cursor: 'pointer' }}
							>
								Year to Date (%){' '}
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
								<tr key={item?.FIN_PROD_ID} className={index === array.length - 1 ? 'custom-border-bottom' : ''}>
									<td className="table-tr-padding profile-value-td">
										<p className={`mb-1 ${styles.stockBuyTreadCode}`}>
										<span onClick={() =>
											openGraphModal(
												item?.FIN_PROD_ID,
												item?.YEAR_TO_DATE,
												item?.UNIT_PRICE,
												item?.IS_FLOOR_FLAG
											)
										}>{item?.TRADE_CODE}</span>
											{item?.IS_FLOOR_FLAG ? (
												<span className={styles.tooltip}>
													<Image
														className="ms-1"
														style={{ marginBottom: '6px' }}
														src={floorprice}
														alt="floorprice"
													/>
													<span className={styles.tooltipText}>
														This stock is at floor price. Due to low trading
														volume, you may face difficulties selling this stock
													</span>
												</span>
											) : null}
										</p>
										<p className={`mb-0 ${styles.stockBuyProductName}`}>
											{item?.PROD_NAME}
										</p>
									</td>

									<td className="table-tr-padding profile-value-td text-center">
										<p
											className={`mb-0 ${styles.stockBuyProductName} text-dark font-w-500 ${styles.ProductTableDatavalue}`}
										>
											{formatNumberWithCommasAndDecimal(formatNumberWithTwoDecimalPlaces(item?.UNIT_PRICE))}
										</p>
									</td>

									<td className="table-tr-padding profile-value-td text-center">
										<div className="d-flex justify-content-center align-items-center">
											<p
												className={`mb-0 ${styles.stockBuyProductName} ${styles.ProductTableDatavalue}
                ${
									item?.YEAR_TO_DATE >= 0
										? `${styles.stockIncrease}`
										: `${styles.stockDecrease}`
								} font-w-500 `}
											>
												{formatNumberWithTwoDecimalPlaces(item?.YEAR_TO_DATE)}
											</p>
											<Image
												className="ms-1 mb-1"
												src={
													item?.YEAR_TO_DATE >= 0
														? increaseStock
														: decreaseStock
												}
												alt="increase"
											/>
										</div>
									</td>

									<td
										className="table-tr-padding profile-value-td text-center"
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
												className='add-product-image-size'
											/>
										) : (
											<Image
												src={addStock}
												alt="add stock"
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
				<p className="" style={{ fontSize: '12px', color: '#D60D0D' }}>
				Select one mutual fund at a time
			</p>

				{graphModalShow && (
				<GraphModal
					data={dataForModal}
					show={graphModalShow}
					onHide={() => setGraphModalShow(false)}
				/>)}

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
										pageLinkClassName="page-link"
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
					<div className={`${styles.fixedButton}`}>
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex align-items-center">
								<p className={`${styles.countSelectedItemName}`}>
									{selectedItems[0]?.TRADE_CODE}
								</p>
								<p className="ms-2 mb-0">Selected&nbsp;</p>
							</div>
							<ButtonPrimary
								onClick={handleSendSelectedStocks}
								size={!isMobileView ? 'custom-small' : 'custom-medium'}
								isDisabled={isDisabled}
							>
								Next
							</ButtonPrimary>
						</div>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default BuyRequestDetails;
