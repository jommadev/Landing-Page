import React from 'react';
import styles from '@/styles/markets/news.module.css';
import Link from 'next/link';
import mixpanel from 'mixpanel-browser';

const NewsCard = ({newsItem}) => {
    const handleNewsCLick = async() =>{
        mixpanel.track('News Click', {
                'News Title': newsItem?.ARTICLE_TITLE,
                'Mobile Number': "Unknown User",
                })
      }
    return (
        <div className={`${styles.newsCard} mt-3`}>

        <Link href={`${newsItem?.ARTICLE_LINK}`} onClick={handleNewsCLick} target='_blank' className={`${styles.newsTitle}`}>{newsItem?.ARTICLE_TITLE}</Link>

        <p className={`${styles.newsPaperName}`}>{newsItem?.PAPER_NAME}</p>
            
        </div>
    );
};

export default NewsCard;