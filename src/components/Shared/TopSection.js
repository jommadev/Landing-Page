/* eslint-disable react-hooks/exhaustive-deps */
import { formatDate } from '@/utils/formatDate';
import Image from 'next/image';
import increaseIcon from '../../assets/images/increase-icon.svg';
import takaIcon from '../../assets/images/taka-symbol.svg';
import ButtonSecondary from '../UI/ButtonSecondary';
import Link from 'next/link';
import { formatNumberWithCommasAndDecimal } from '@/utils/formatNumberWithCommasAndDecimal';
import { useGetGlobalInfoQuery } from '@/redux/api/apiSlice';
import { useEffect, useState } from 'react';
import OpenBoModal from './Modals/OpenBoModal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TopSection = () => {
	const router = useRouter()
	const [boModalShow, setBoModalShow] = useState(false);
	/* const [data, setData] = useState({}); */
	const token = useSelector((state) => state?.auth?.accessToken?.accessToken);
	const { data, isLoading, error, refetch } = useGetGlobalInfoQuery(undefined, {
		skip: !token
	  });
	  useEffect(() => {
		const fetchData = async () => {
		  if (token) {
			await refetch();
		  }
		};
	
		fetchData();
	  }, [token, refetch]);

	/* const { data, isLoading, error, refetch } = useGetGlobalInfoQuery();
	useEffect(()=>{refetch();},[]) */

	const handleCheckBoComplete = () => {
		if(data?.data?.COMPLETE_YN){
			router.push('/prefund')
		}else
		setBoModalShow(true);
	}
	return (
		<div className="top-gradient-color">
			<div className="container text-white py-3">
				<h5 className="top-section-title mb-0">Portfolio Value</h5>
				<h2 className="d-flex align-items-center">
					<span className="pb-2">
						<Image src={takaIcon} alt="taka icon" layout="responsive" />
					</span>
					<span className="ps-2">{data?.data?.PORTFOLIO_BALANCE ? formatNumberWithCommasAndDecimal(data?.data?.PORTFOLIO_BALANCE) : formatNumberWithCommasAndDecimal(0)}</span>
					{/* <span>
						<Image src={increaseIcon} alt="increase icon" layout="responsive" />
					</span> */}
				</h2>


				<div className="top-bottom-content">
					<div className="top-left-section">
						<div>
							<h5 className="top-content-title mb-0">
								BO A/C Balance{" "}
								<span className="top-section-title-date">
									(on {formatDate()})
								</span>
							</h5>
							<h4 className="d-flex align-items-center mb-0">
								<span className="pb-2">
									<Image
										src={takaIcon}
										alt="taka icon"
										width={20}
										height={20}
									/>
								</span>
								<span className="ps-1 top-content-title mb-0">{data?.data?.ACC_BALANCE ? formatNumberWithCommasAndDecimal(data?.data?.ACC_BALANCE) : formatNumberWithCommasAndDecimal(0)}</span>
							</h4>
						</div>

						{/* <div className="top-content-divider"></div>

						<div className='mt-1'>
							<h5 className="top-content-title mb-0">Available Purchase Balance</h5>
							<h4 className="d-flex align-items-center mb-0">
								<span className="pb-2">
									<Image
										src={takaIcon}
										alt="taka icon"
										width={20}
										height={20}
									/>
								</span>
								<span className="ps-1 top-content-title">{data?.data?.AVAILABLE_ACC_BALANCE ? formatNumberWithCommasAndDecimal(data?.data?.AVAILABLE_ACC_BALANCE): formatNumberWithCommasAndDecimal(0)}</span>
							</h4>
						</div> */}
					</div>
                    {/* <button href={`${data?.data?.COMPLETE_YN === 0 ? '/onboarding/nid-verification' : '/prefund'}`} className='btn-prefund'>Prefund Now</button> */}
                    <button onClick={handleCheckBoComplete} className='btn-prefund'>Prefund Now</button>

					{boModalShow && (
				<OpenBoModal
					data={data?.data}
					show={boModalShow}
					onHide={() => setBoModalShow(false)}
				/>
			)}
					
				</div>
			</div>
		</div>
	);
};

export default TopSection;
