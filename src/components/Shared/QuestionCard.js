import { truncateText } from '@/utils/subStringLength';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const QuestionCard = ({topics, topicId, title}) => {
	const router = useRouter()

	const handleDetailsPage = (slug) =>{
		if(topicId === 1)
		router.push(`/information/${slug}`);
	else
	router.push(`/question/${slug}`);
	}

    return (
			<div>
				<h1 className="text-center video-section-header mb-0 mt-5">{title}</h1>
        <div className="question-area">
			<div className="row gy-3 gx-1 mt-0 mt-lg-3">
				{topics?.map((item) => (
					<div
						className="col-lg-4 col-md-4 col-sm-6 col-6 d-flex flex-column"
						key={item.INFO_ID} onClick={()=>handleDetailsPage(item?.INFO_SLUG)}
					>
						<div className="help-center-topic-section">
							{item?.INFO_IMAGE ? (
								<div className="help-center-image-area">
									<Image src={item?.INFO_IMAGE} alt="" width={item?.INFO_TITLE_EN === 'About Jomma' || 
	item?.INFO_TITLE_EN === 'Brac EPL Wealth Management product' || 
	item?.INFO_TITLE_EN === 'IPO (Initial Public Offering)' ? 80 : 40} height={35} ></Image>
								</div>
							) : null}
							<div className="help-center-info-area">
								<p className="question-title-en mb-2">{truncateText(item?.INFO_TITLE_EN, 42)}</p>
								<p
									className="question-title-bn mb-2"
									style={{ fontFamily: 'Noto Sans Bengali' }}
								>
								{truncateText(item?.INFO_TITLE_BN, 50)}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
			</div>
    );
};

export default QuestionCard;