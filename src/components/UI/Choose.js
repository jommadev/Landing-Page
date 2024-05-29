import React from 'react';
import Image from 'next/image';
import PlayLearn from '../../assets/images/tabler_device-gamepad-3.svg';
import OnlineBo from '../../assets/images/fluent_desktop-20-regular.svg';
import DailyMarket from '../../assets/images/fluent-mdl2_market.svg';
import styles from '../../styles/home/home.module.css'; // Import your CSS file for styling

const Choose = () => {
    return (
        <div className={`${styles.ProductSectionArea} container `}>
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="feature-item">
                        <Image src={PlayLearn} alt="Play & Learn Trading" className="mb-3"/>
                        <p className={`${styles.ChooseHeading}`}>Play & Learn Trading</p>
                        <p className={`${styles.ChooseDetails}`}>Play jomma trading game and learn trading while earning money.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-item">
                        <Image src={OnlineBo} alt="Online BO Account" className="mb-3"/>
                        <p className={`${styles.ChooseHeading}`}>Online BO Account</p>
                        <p className={`${styles.ChooseDetails}`}>Open a BO account with Jomma’s affiliated broker from the comfort of your home.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="feature-item">
                        <Image src={DailyMarket} alt="Daily Market Information" className="mb-3"/>
                        <p className={`${styles.ChooseHeading}`}>Daily Market Information</p>
                        <p className={`${styles.ChooseDetails}`}>Daily market information and price alerts delivered to you.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Choose;
