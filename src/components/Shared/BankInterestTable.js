import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-paginate';
import NextActive from '@/assets/images/next_active.svg';
import NextDisable from '@/assets/images/next_disable.svg';
import PreviousActive from '@/assets/images/previous_active.svg';
import PreviousDisable from '@/assets/images/previous_disable.svg';
import banktable from '@/assets/images/bank-table.svg';

const BankInterestTable = () => {
    const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
	const [isNextDisabled, setIsNextDisabled] = useState(false);
    const [pageCount, setpageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);



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


    const handlePageChange = (selectedPage) => {
		setCurrentPage(selectedPage.selected);
		/* setSearchInfo((prevInfo) => ({
			...prevInfo,
			page: selectedPage.selected + 1,
		})); */

		const isPreviousDisabled = selectedPage.selected === 0;
		const isNextDisabled = selectedPage.selected === pageCount - 1;

		setIsPreviousDisabled(isPreviousDisabled);
		setIsNextDisabled(isNextDisabled);
	};

	const breakLabel = !isMobileView ? (
		<span style={{ fontWeight: 'bold' }}>. .</span>
	) : (
		<span style={{ fontWeight: 'bold' }}>. . .</span>
	);

    const rowsValue = new Array(10).fill(null).map((_, index) => (
        <tr key={index}>
            <td className="table-tr-padding profile-value-td text-start">
                <p className='mb-0 stockBuyProductName text-dark font-w-500 ProductTableDatavalue'>Sonali Bank</p>
            </td>
            <td className="table-tr-padding profile-value-td text-end">
            {
                index === 0 &&
                <Image src={banktable} alt='' className='bank-table-image'/>
            }
            </td>
            <td className="table-tr-padding profile-value-td text-center">
                <p className='mb-0 stockBuyProductName text-dark font-w-500 ProductTableDatavalue'>Public</p>
            </td>
            <td className="table-tr-padding profile-value-td text-center">
                <p className='mb-0 stockBuyProductName text-dark font-w-500 ProductTableDatavalue'>1st</p>
            </td>
            <td className="table-tr-padding profile-value-td text-end">
                <p className='mb-0 stockBuyProductName text-dark font-w-500 ProductTableDatavalue'>
                {
                    index === 0 &&
                <span className='me-1' style={{color:'#2C7C7A'}}>(Highest Rate)</span>
                }
                3%</p>
            </td>
        </tr>
    ));
    return (
        <div className="table-responsive container mt-3 px-0">
				<table className="table table-striped custom-stripe" id="my-custom-table">
					<thead style={{ backgroundColor: '#2C7C7A' }}>
						<tr>
							<th className="table-header-history text-start mobile-product-header"
								style={{ cursor: 'pointer' }}>
								Bank Name
							</th>
							<th className="table-header-history"
								style={{ cursor: 'pointer' }}>
										</th>
							<th className="table-header-history"
								style={{ cursor: 'pointer' }}>Bank Type
										</th>
							<th
								className="table-header-history"
								style={{ cursor: 'pointer' }}
							>
								Generation
								
							</th>
							<th className="table-header-history text-end">Interest Rate (%)</th>
						</tr>
					</thead>
					<tbody>
								{rowsValue}
							
					</tbody>
				</table>

				

				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="mt-3">
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
							</div>
						</div>
					</div>
				</div>

				
			</div>
    );
};

export default BankInterestTable;