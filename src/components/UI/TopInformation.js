import React from 'react';
import TopSectionInfo from '../Shared/TopSectionInfo';
import { useGetTopListQuery } from '@/redux/api/apiSlice';

const TopInformation = () => {
    const { data, isLoading, isSuccess } = useGetTopListQuery();
    return (
        <div className='container pb-3 pb-lg-4 mt-3' style={{borderBottom:'1px solid #E8E8E9'}}>
    <ul className="nav nav-pills justify-content-center" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
            <button
                className="nav-link newsFilter active"
                id="pills-indexs-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-indexs"
                type="button"
                role="tab"
                aria-controls="pills-indexs"
                aria-selected="true"
            >
                Stocks
            </button>
        </li>
        <li className="nav-item" role="presentation">
            <button
                className="nav-link newsFilter"
                id="pills-top-stocks-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-top-stocks"
                type="button"
                role="tab"
                aria-controls="pills-top-stocks"
                aria-selected="false"
            >
                Top 3 Stocks
            </button>
        </li>
        <li className="nav-item" role="presentation">
            <button
                className="nav-link newsFilter"
                id="pills-top-mutual-funds-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-top-mutual-funds"
                type="button"
                role="tab"
                aria-controls="pills-top-mutual-funds"
                aria-selected="false"
            >
                Top 3 Mutual Funds
            </button>
        </li>
    </ul>

    <div className="tab-content mt-3 mb-0 " id="pills-tabContent">
        <div
            className="tab-pane fade show active"
            id="pills-indexs"
            role="tabpanel"
            aria-labelledby="pills-indexs-tab"
        >
            <TopSectionInfo data={data?.data?.index}/>
        </div>

        <div
            className="tab-pane fade"
            id="pills-top-stocks"
            role="tabpanel"
            aria-labelledby="pills-top-stocks-tab"
        >
            <TopSectionInfo data={data?.data?.stocks}/>
        </div>
        
        <div
            className="tab-pane fade"
            id="pills-top-mutual-funds"
            role="tabpanel"
            aria-labelledby="pills-top-mutual-funds-tab"
        >
            <TopSectionInfo data={data?.data?.mutual_funds}/>
        </div>
    </div>
</div>

    );
};

export default TopInformation;