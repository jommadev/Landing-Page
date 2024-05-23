import React from 'react';
import styles from '@/styles/markets/news.module.css';
import Link from 'next/link';

const NewsCard = ({newsItem}) => {
    return (
        <div className={`${styles.newsCard} mt-3`}>

        <Link href={`${newsItem?.ARTICLE_LINK}`} target='_blank' className={`${styles.newsTitle}`}>{newsItem?.ARTICLE_TITLE}</Link>

        <p className={`${styles.newsPaperName}`}>{newsItem?.PAPER_NAME}</p>
            
        </div>
    );
};

export default NewsCard;