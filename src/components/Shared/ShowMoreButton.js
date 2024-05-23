// ShowMoreButton.js
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/markets/news.module.css';
import seeMore from '@/assets/images/news-see-more.svg';
import seeLess from '@/assets/images/news-see-less.svg';

const ShowMoreButton = ({showAll, setShowAll}) => {
    
	const toggleShowAll = () => {
		setShowAll(!showAll);
	};

    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
										<p
											className={`mb-0 me-1 ${styles.btnSeeMore}`}
											onClick={toggleShowAll}
										>
											{showAll ? 'See Less' : 'See More'}
										</p>
										<Image
											src={showAll ? seeLess : seeMore}
											alt="see more"
											onClick={toggleShowAll}
											style={{ cursor: 'pointer' }}
										/>
									</div>
    );
};

export default ShowMoreButton;
