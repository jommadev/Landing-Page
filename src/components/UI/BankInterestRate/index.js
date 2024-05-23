import { useState } from 'react';
import style from '../../../styles/bank-interest-rate.module.css';
import Fdr from './InfoTable/Fdr';
import Dps from './InfoTable/Dps';

const BankInterestRate = () => {
	const [year, setYear] = useState();


	const handleYear = (event) => {
		const inputYear = event.target.value.replace(/[^0-9.]/g, '');
		setYear(inputYear);
	};
	return (
		<div>
			<p className={`text-center mb-2 ${style.bankYearTitle}`}>
				Duration (years)
			</p>

			<div className={`${style.amountInptArea}`}>
				<input
					type="text"
					placeholder="eg. 5"
					className={`${style.searchInput} text-center`}
					value={year}
					onChange={handleYear}
				/>
			</div>

            <div className="mt-4">
          <div className="new-nav-area">
            <ul
              className="nav nav-pills new-nav-pills"
              id="pills-tab"
              role="tablist"
            >
            <li className="nav-item" role="presentation">
                <button
                  className={`nav-link new-nav-link active`}
                  id="pills-fdr-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fdr"
                  type="button"
                  role="tab"
                  aria-controls="pills-fdr"
                  aria-selected="false"
                >
                  <p className="mb-0 leaderboard-tabpen-title">FDR</p>
                </button>
              </li>
              
              <li className="nav-item game-new-nav-item" role="presentation">
                <button
                  className={`nav-link new-nav-link`}
                  id="pills-dps-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-dps"
                  type="button"
                  role="tab"
                  aria-controls="pills-dps"
                  aria-selected="true"
                >
                  <p className="mb-0 leaderboard-tabpen-title">DPS</p>
                </button>
              </li>
              
            </ul>
          </div>

          <div
            className="tab-content my-4 mt-lg-4  course_web_view"
            id="pills-tabContent"
          >
            
            <div
              
              className={`tab-pane fade show active `}
              id="pills-fdr"
              role="tabpanel"
              aria-labelledby="pills-fdr-tab"
            >
              <Fdr/>
            </div>

            <div
            className={`tab-pane fade`}
              
              id="pills-dps"
              role="tabpanel"
              aria-labelledby="pills-dps-tab"
            >
               <Dps/>
            </div>
          </div>
        </div>
		</div>
	);
};

export default BankInterestRate;
