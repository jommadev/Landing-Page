import React from 'react';
import styles from '@/styles/home/home.module.css';
import stock from "../../../assets/images/product_stock.svg"
import thematic from "../../../assets/images/product_thematic.svg"
import mutual from "../../../assets/images/product_mutual.svg"
import bond from "../../../assets/images/product_bond.svg"
import market from "../../../assets/images/product_market.svg"
import dashboard from "../../../assets/images/product_dashboard.svg"
import prefund from "../../../assets/images/product_prefund.svg"
import Image from 'next/image';
import Link from 'next/link';

const Products = ({icCompleteBo}) => {

    return (
        <div className={`${styles.ProductSection}`}>
        <div className={`container ${styles.ProductSectionArea}`}>
            <div className="row g-3 g-md-4 g-lg-4">
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                     <Link href={'/stocks'} className={`${styles.ProductCard}`}>
                        <Image src={stock} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductStocksTitle} ${styles.ProductStocksTitleSize}`}>Stocks</p>
                    </Link> 
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={'/investment-themes'} className={`${styles.ProductCard}`}>
                        <Image src={thematic} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductThematicTitle} ${styles.ProductStocksTitleSize}`}>Investment Themes</p>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={'/mutual-funds'} className={`${styles.ProductCard}`}>
                        <Image src={mutual} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductMutualTitle} ${styles.ProductStocksTitleSize}`}>Mutual Funds</p>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={'/bonds'} className={`${styles.ProductCard}`}>
                        <Image src={bond} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductBondTitle} ${styles.ProductStocksTitleSize} px-2 px-lg-0 px-md-0`}>Private Bonds</p>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={'/markets'} className={`${styles.ProductCard}`}>
                        <Image src={market} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductMarketTitle} ${styles.ProductStocksTitleSize}`}>Markets</p>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={'/dashboard'} className={`${styles.ProductCard}`}>
                        <Image src={dashboard} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductDashboardTitle} ${styles.ProductStocksTitleSize}`}>Dashboard</p>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                    <Link href={`${icCompleteBo === 0 ? '/onboarding/nid-verification' : '/prefund'}`} className={`${styles.ProductCard}`}>
                        <Image src={prefund} alt='stock' layout="" className = {`${styles.productImageSize}`}/>
                        <p className={`${styles.ProductPrefundTitle} ${styles.ProductStocksTitleSize}`}>BO Prefund & Withdraw</p>
                    </Link>
                </div>

            </div>

        </div>
            
        </div>
    );
};

export default Products;