import {
	formatNumberWithCommasAndDecimal,
	formatNumberWithCommasAndInt,
} from '@/utils/formatNumberWithCommasAndDecimal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import NextActive from '../../../../assets/images/next_active.svg';
import NextDisable from '../../../../assets/images/next_disable.svg';
import PreviousActive from '../../../../assets/images/previous_active.svg';
import PreviousDisable from '../../../../assets/images/previous_disable.svg';
import PortfolioModal from './PortfolioModal';

const PortfolioValueTable = ({
	isMobileView,
	searchInfo,
	setSearchInfo,
	currentPage,
	setCurrentPage,
	data,
}) => {
	const [pageCount, setpageCount] = useState(1);
	const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);
	const [searchItem, setSearchItem] = useState([]);
	const [dataForModal, setDataForModal] = useState({});
	const [portfolioModalShow, setPortfolioModalShow] = useState(false);

	const openPortfolioModal = (prodName, units, profilebalance, gainLoss, gainLossPerc) => {
		const modalInfo = {
			prodName, units, profilebalance, gainLoss, gainLossPerc
		};
		
		setDataForModal(modalInfo); // Set the data you want to send to the modal
		setPortfolioModalShow(true); // Open the modal
	};

	useEffect(() => {
		setpageCount(data?.data?.meta?.pageCount);
		setSearchItem(data?.data?.searchTitle);
		if (data?.data?.meta?.pageCount === 1) {
			setIsPreviousDisabled(true);
			setIsNextDisabled(true);
		}
	}, [data]);

	const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
		setSearchInfo((prevInfo) => ({
			...prevInfo,
			page: selectedPage.selected + 1,
		}));

		// Calculate disabled states based on the current page
		const isPreviousDisabled = selectedPage.selected === 0;
		const isNextDisabled = selectedPage.selected === pageCount - 1;

		// Update the disabled state
		setIsPreviousDisabled(isPreviousDisabled);
		setIsNextDisabled(isNextDisabled);
	};

	const breakLabel = isMobileView ? (
		<span style={{ fontWeight: 'bold' }}>. .</span>
	) : (
		<span style={{ fontWeight: 'bold' }}>. . .</span>
	);

	return (
		<>
			{isMobileView ? (
				<div className="table-responsive container mt-4 px-0">
					<table className="table table-striped custom-stripe" id="my-custom-table">
						<thead style={{ backgroundColor: '#2C7C7A' }}>
							<tr>
								<th
									className="table-header-history"
									style={{ padding: '12px 16px' }}
								>
									Product Name
								</th>
								<th className="table-header-history">Unit(s) Held</th>
								<th className="table-header-history">Portfolio Value (Tk)</th>
								<th className="table-header-history">Gain/Loss (Tk)</th>
								<th className="table-header-history">Gain/Loss (%)</th>
							</tr>
						</thead>
						<tbody>
							{data?.data?.data?.portfolioValue.length > 0 ? (
								data?.data?.data?.portfolioValue.map((value, index, array) => (
									<tr key={value?.FIN_PROD_ID}
										style={{ cursor: 'pointer' }}
										className={index === array.length - 1 ? 'custom-border-bottom' : ''}
										
									>
										<td className="p-3 profile-value-td text-center">
											{value?.PROD_NAME}
										</td>
										<td className="p-3 profile-value-td text-center">
											{formatNumberWithCommasAndInt(value?.UNITS)}
										</td>
										<td className="p-3 profile-value-td text-center">
											{formatNumberWithCommasAndInt(value?.PORTFOLIO_BALANCE)}
										</td>
										<td
											className="p-3 profile-value-td text-center"
											style={{
												color:
													parseInt(value?.GAIN_LOSS) < 0
														? '#D60D0D'
														: '#389429',
											}}
										>
											{formatNumberWithCommasAndDecimal(value?.GAIN_LOSS)}
										</td>
										<td
											className="p-3 profile-value-td text-center"
											style={{
												color:
													parseInt(value?.GAIN_LOSS_PERC) < 0
														? '#D60D0D'
														: '#389429',
											}}
										>
											{formatNumberWithCommasAndDecimal(value?.GAIN_LOSS_PERC)}%
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5} className="text-center">
										No Data Found
									</td>
								</tr>
							)}

							{
								data?.data?.data?.totalPortfolioBalance > 0 &&
							<tr>
								<td className="p-3 profile-value-td text-center" style={{fontSize:'16px', fontWeight:"600"}}>Total</td>
								<td className="p-3 profile-value-td text-center" style={{fontSize:'16px', fontWeight:"600"}}>
									{formatNumberWithCommasAndInt(data?.data?.data?.totalUnits)}
								</td>
								<td className="p-3 profile-value-td text-center" style={{fontSize:'16px', fontWeight:"600"}}>
									{formatNumberWithCommasAndInt(
										data?.data?.data?.totalPortfolioBalance
									)}
								</td>
								<td
									className="p-3 profile-value-td text-center"
									style={{
										color:
											parseInt(data?.data?.data?.gainLossTaka) < 0
												? '#D60D0D'
												: '#389429',fontSize:'16px', fontWeight:"600"
									}}
								>
									{formatNumberWithCommasAndDecimal(
										data?.data?.data?.gainLossTaka
									)}
								</td>
								<td className="p-3 profile-value-td text-center"></td>
							</tr>
							}
						</tbody>
					</table>
				</div>
			) : (
				<div className="table-responsive container mt-4 px-0">
					<table className="table table-striped custom-stripe" id="my-custom-table">
						<thead style={{ backgroundColor: '#2C7C7A' }}>
							<tr>
								<th
									className="table-header-history text-start"
								>
									Product Name
								</th>
								<th className="table-header-history">Portfolio Value (Tk)</th>
								<th className="table-header-history">Gain/Loss (Tk)</th>
							</tr>
						</thead>
						<tbody>
							{data?.data?.data?.portfolioValue.length > 0 ? (
								data?.data?.data?.portfolioValue?.map((value, index, array) => (
									<tr 
									key={value?.FIN_PROD_ID}
									className={index === array.length - 1 ? 'custom-border-bottom' : ''}
									onClick={() =>openPortfolioModal(
												value?.PROD_NAME,
												formatNumberWithCommasAndInt(value?.UNITS),
												formatNumberWithCommasAndInt(value?.PORTFOLIO_BALANCE),
												formatNumberWithCommasAndDecimal(value?.GAIN_LOSS),
												formatNumberWithCommasAndDecimal(value?.GAIN_LOSS_PERC)
											)
										}
									>
										<td className="table-tr-padding profile-value-td text-decoration-underline text-start">
											{value?.TRADE_CODE}
										</td>

										<td className="table-tr-padding profile-value-td text-center">
											{formatNumberWithCommasAndInt(value?.PORTFOLIO_BALANCE)}
										</td>
										<td
											className="table-tr-padding profile-value-td text-center"
											style={{
												color:
													parseInt(value?.GAIN_LOSS) < 0
														? '#D60D0D'
														: '#389429',
											}}
										>
											{formatNumberWithCommasAndDecimal(value?.GAIN_LOSS)}
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
							{
								data?.data?.data?.totalPortfolioBalance > 0 &&
							<tr>
								<td className="table-tr-padding profile-value-td text-start">Total</td>
								<td className="table-tr-padding profile-value-td text-center">
									{formatNumberWithCommasAndInt(
										data?.data?.data?.totalPortfolioBalance
									)}
								</td>
								<td
									className="table-tr-padding profile-value-td text-center"
									style={{
										color:
											parseInt(data?.data?.data?.gainLossTaka) < 0
												? '#D60D0D'
												: '#389429',
									}}
								>
									{formatNumberWithCommasAndDecimal(
										data?.data?.data?.gainLossTaka
									)}
								</td>
								<td className="table-tr-padding profile-value-td text-center"></td>
							</tr>
							}
						</tbody>
					</table>
				</div>
			)}

			{portfolioModalShow && (
				<PortfolioModal
					data={dataForModal}
					show={portfolioModalShow}
					onHide={() => setPortfolioModalShow(false)}
				/>
			)}

			{/* <PortfolioValueExpandDiv items={data?.data?.data?.portfolioValue} /> */}

			{data?.data?.meta?.total > 0 && (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="mt-3">
								{1 > 0 && (
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
										pageRangeDisplayed={isMobileView ? 3 : 5}
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
			)}
		</>
	);
};

export default PortfolioValueTable;
