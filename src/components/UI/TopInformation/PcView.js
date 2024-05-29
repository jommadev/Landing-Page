import TopSectionInfo from '@/components/Shared/TopSectionInfo';
import React from 'react';

const PcView = ({data}) => {
    return (
        <div
			className="pb-3 pb-lg-4 pt-3"
		>
			<ul
				className="nav nav-pills justify-content-center"
				id="pills-tab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link newsFilter active"
						id="pills-pc-indexs-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-pc-indexs"
						type="button"
						role="tab"
						aria-controls="pills-pc-indexs"
						aria-selected="true"
					>
						Stocks
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link newsFilter"
						id="pills-top-pc-stocks-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-top-pc-stocks"
						type="button"
						role="tab"
						aria-controls="pills-top-pc-stocks"
						aria-selected="false"
					>
						Top 3 Stocks
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className="nav-link newsFilter"
						id="pills-top-pc-mutual-funds-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-top-pc-mutual-funds"
						type="button"
						role="tab"
						aria-controls="pills-top-pc-mutual-funds"
						aria-selected="false"
					>
						Top 3 Mutual Funds
					</button>
				</li>
			</ul>

			<div className="tab-content mt-3 mb-0 " id="pills-tabContent">
				<div
					className="tab-pane fade show active"
					id="pills-pc-indexs"
					role="tabpanel"
					aria-labelledby="pills-pc-indexs-tab"
				>
					<div className='d-flex justify-content-center'>
                    {
						data?.data?.index?.map((item, index) => (
							<TopSectionInfo key={index} item={item} />
						))
					}
                    </div>
				</div>

				<div
					className="tab-pane fade"
					id="pills-top-pc-stocks"
					role="tabpanel"
					aria-labelledby="pills-top-pc-stocks-tab"
				>
					<div className='d-flex justify-content-center'>
                    {
						data?.data?.stocks?.map((item, index) => (
							<TopSectionInfo key={index} item={item} />
						))
					}
                    </div>
				</div>

				<div
					className="tab-pane fade"
					id="pills-top-pc-mutual-funds"
					role="tabpanel"
					aria-labelledby="pills-top-pc-mutual-funds-tab"
				>
                    <div className='d-flex justify-content-center'>
                    {
						data?.data?.mutual_funds?.map((item, index) => (
							<TopSectionInfo key={index} item={item} />
						))
					}
                    </div>
				</div>
			</div>
		</div>
    );
};

export default PcView;