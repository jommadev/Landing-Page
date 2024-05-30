import backIcon from '@/assets/images/back-icon.svg';
import logo from '@/assets/images/jomma_logo.svg';
import Mobilelogo from '@/assets/images/mobile_jomma_logo.svg';
import RootLayout from '@/components/Layouts/RootLayout';
import QuestionCard from '@/components/Shared/QuestionCard';
import { useGetQuestionListQuery, useGetTopicDetailsQuery, useGetTopicListQuery } from '@/redux/api/apiSlice';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import parse from 'html-react-parser';

const Details = ({slug}) => {
	const { data:details, isLoading:detailsLoading, error, refetch } = useGetTopicDetailsQuery(slug);
	const { data, isLoading, isSuccess } = useGetQuestionListQuery(slug);


	const width = (details?.data?.INFO_TITLE_EN === 'About Jomma' || 
	details?.data?.INFO_TITLE_EN === 'Brac EPL Wealth Management product' || 
	details?.data?.INFO_TITLE_EN === 'IPO (Initial Public Offering)') ? 150 : 80;


	return (
		<>
			<Head>
				<title>{details?.data?.INFO_TITLE_EN} - Jomma</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta name="description" content={`${details?.data?.INFO_META_DESC}`}/>
                <meta name="keywords" content="investment marketplace, open BO account, trade stocks, buy mutual funds, market news, financial news, BRAC EPL Investments, trading game, learn stock market, Bangladesh"></meta>
			</Head>

			<div className="container mt-4">
				<Link href={'/information'} className="back-page-icon">
					<Image src={backIcon} alt="back icon" /> &nbsp;
					<p className="mb-0">Back</p>
				</Link>
				<div className="question-details-area mt-3 mt-md-5">
				{
					details?.data?.INFO_IMAGE &&
					<>

					{/* <Image src={details?.data?.INFO_IMAGE} alt="logo-icon-jomma" width={50} height={60} className="show-logo-pc" /> */}
					<Image
						src={details?.data?.INFO_IMAGE}
						alt="Jomma Logo"
						width={width}
						height={50}
						style={{ marginLeft: '-6px' }}
					/>
					</>
				}
					
					<h1 className="video-section-header mt-2 mb-3 mb-md-4">
						{details?.data?.INFO_TITLE_EN} |{' '}
						<span style={{ fontFamily: 'Noto Sans Bengali' }}>
						{details?.data?.INFO_TITLE_BN}
						</span>
					</h1>

					<div
						className="w-100"
						style={{ height: '1px', backgroundColor: '#A5A5A7' }}
					></div>

					<div className="details-area">
						<div className='information-details'>
						{
							details?.data?.INFO_DESC_EN && parse(details?.data?.INFO_DESC_EN)
						}
						
						
						</div>

						<div className='information-details' style={{ fontFamily: 'Noto Sans Bengali' }}>
						{
							details?.data?.INFO_DESC_BN && parse(details?.data?.INFO_DESC_BN)
						}
						</div>
					</div>
{
	data?.data?.length > 0 ?
<>
<div
						className="w-100"
						style={{ height: '1px', backgroundColor: '#EAEAED' }}
					></div>
					<div className="mt-3 mt-md-4">
						<QuestionCard topics={data?.data} topicId={2} title={`Frequently Asked Questions ${details?.data?.INFO_TITLE_EN}`} />
					</div>
</>
					:
					null
}
				</div>

				
			</div>



		</>
	);
};

export default Details;

Details.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context) => {
	;
	const { params } = context;
	return {
		props: {
			slug: params?.details[0],
		},
	};
};
