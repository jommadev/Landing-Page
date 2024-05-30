import backIcon from '@/assets/images/back-icon.svg';
import RootLayout from '@/components/Layouts/RootLayout';
import QuestionCard from '@/components/Shared/QuestionCard';
import Contact from '@/components/UI/Contact';
import Videos from '@/components/UI/Videos';
import { useGetQuestionListQuery, useGetTopicListQuery } from '@/redux/api/apiSlice';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';



const Information = () => {
	const [isMobileView, setIsMobileView] = useState(false);
	

	useEffect(() => {
		function handleResize() {
			const shouldSetMobileView = window.innerWidth <= 768;
			if (isMobileView !== shouldSetMobileView) {
				setIsMobileView(shouldSetMobileView);
			}
		}

		window.addEventListener('resize', handleResize);
		handleResize(); // Call it initially to set the state based on the current window size

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isMobileView]); // Only re-run if isMobileView changes

	const { data, isLoading, isSuccess } = useGetTopicListQuery();
	const { data:question, isLoading:isQuestionLoading, isSuccess:isQuestionSuccess } = useGetQuestionListQuery('ALL');

	return (
		<>
        <Head>
				<title>Information - Jomma</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>
				<meta
					name="description"
					content="Your Investment Support Hub in Bangladesh. Get expert answers on stocks, bonds, mutual funds, and more.| জমা হেল্প সেন্টার - বাংলাদেশের বিনিয়োগ সহায়তার নির্ভরযোগ্য স্থান। শেয়ার, বন্ড, মিউচুয়াল ফান্ড ও আরও প্রশ্নের উত্তর পান।"
				/>
			</Head>
			<div className="container mt-4">
				<Link href={'/'} className="back-page-icon">
					<Image src={backIcon} alt="back icon" /> &nbsp;
					<p className="mb-0">Back</p>
				</Link>
			</div>
			<div className={!isMobileView ? 'container' : ''}>
				<div className="header-of-information mt-2">
					<p>Jomma Help Center</p>
					<h1 className="text-white video-section-header mb-0">
						Answers for popular investment related queries
					</h1>
				</div>
			</div>
			<div className="container">
            <QuestionCard topics={data?.data} topicId={1} title={'Popular Topics'}/>
            <QuestionCard topics={question?.data} topicId={2} title={'Frequently Asked Questions'}/>
			</div>


<Videos isMobileView={isMobileView}/>
            <Contact isMobileView={isMobileView}/>
		</>
	);
};

export default Information;
Information.getLayout = function getLayout(page) {
	return <RootLayout>{page}</RootLayout>;
};
