import React, { useState } from 'react';
import style from '../../../../styles/bank-interest-rate.module.css'
import BankInterestTable from '@/components/Shared/BankInterestTable';

const Fdr = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleDivClick = (index) => {
		setActiveIndex(index);
		/* setInput('');
		setCurrentPage(0);

		if (index === 0) {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				fin_id: 5,
				is_floor_flag: '',
				order_sl: '',
				page: '',
				sortBy: 'market_cap',
			}));
		} else if (index === 1) {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				fin_id: 5,
				is_floor_flag: '0',
				order_sl: '',
				page: '',
				sortBy: 'market_cap',
			}));
		} else {
			setSearchInfo((prevInfo) => ({
				searchTerm: '',
				fin_id: 5,
				is_floor_flag: '',
				order_sl: '3',
				page: '',
				sortBy: 'market_cap',
			}));
		} */
	};

    const [selectedValue, setSelectedValue] = useState('0');

	const handleSelectedValue = (event) => {
		setSelectedValue(event.target.value);
	};
    return (
        <div>
            <div className="mt-4 d-flex justify-content-lg-between justify-content-md-between flex-lg-row flex-md-row flex-column">
				<div className=" d-flex justify-content-center justify-content-lg-start align-items-center">
                <p
					className={
						activeIndex === 0
							? `mb-0 ${style.filterBtnActive}`
							: `mb-0 ${style.filterBtnInactive}`
					}
					onClick={() => handleDivClick(0)}
				>
					All
				</p>
				<p
					className={
						activeIndex === 1
							? `mb-0 mx-lg-3 mx-2 ${style.filterBtnActive}`
							: `mb-0 mx-lg-3 mx-2 ${style.filterBtnInactive}`
					}
					onClick={() => handleDivClick(1)}
				>
					Public Bank
				</p>
				<p
					className={
						activeIndex === 2
							? `mb-0 ${style.filterBtnActive}`
							: `mb-0 ${style.filterBtnInactive}`
					}
					onClick={() => handleDivClick(2)}
				>
					Private Bank
				</p>

                </div>
				<div className=" d-flex justify-content-center justify-content-lg-start">
                <div className={`dropdown dropdown-custom ${style.generationSelection}`}>
								<select
									className={`form-select custom-form-selector ${style.generationSelection}`}
									aria-label="Default select example"
									onChange={handleSelectedValue}
									value={selectedValue}
									style={{ cursor: 'pointer', borderRadius:'100px', fontSize:'14px' }}
								>
									<option
										value="0"
									>
										All Generation
									</option>
									<option
										value="1"
									>
										First Generation
									</option>
									<option
										value="2"
									>
										Seconed Generation
									</option>
									<option
										value="3"
									>
										Third Generation
									</option>
								</select>
							</div>

                </div>
			</div>

            <BankInterestTable/>
        </div>
    );
};

export default Fdr;