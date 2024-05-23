import Marquee from 'react-fast-marquee';
import Bkash from '../../assets/images/Partner-BKash-bKash.png';
import Brac from '../../assets/images/Partner-BRAC_EPL_Investments_Ltd.svg';
import Edge from '../../assets/images/Partner-Edge-Asset-Management.png';
import MidwaySecurities from '../../assets/images/Partner-Midway-Securities.svg';
import Shanta from '../../assets/images/Partner-Shanta.png';
import PartnerInfo from '../Shared/PartnerInfo';

const data = [
	{
		id: 1,
		name: 'Midway Securities Limited',
		img: MidwaySecurities,
	},
	{
		id: 2,
		name: 'bKash Limited',
		img: Bkash,
	},
	{
		id: 3,
		name: 'Brac EPL Investments',
		img: Brac,
	},
	{
		id: 4,
		name: 'Edge Asset Management',
		img: Edge,
	},
	
];

const Partner = () => {
	return (
		<div className="mt-4 marquee-section">
			<Marquee >
				{data.map((item) => (
					<PartnerInfo key={item?.id} name={item?.name} img={item?.img} />
				))}
			</Marquee>
		</div>
	);
};

export default Partner;
