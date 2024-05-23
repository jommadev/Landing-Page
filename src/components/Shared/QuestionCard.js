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
									<Image src={item?.INFO_IMAGE} alt="" width={80} height={35} className="ms-2"></Image>
								</div>
							) : null}
							<div className="help-center-info-area">
								<p className="question-title-en mb-1">{item?.INFO_TITLE_EN}</p>
								<p
									className="question-title-bn mb-1"
									style={{ fontFamily: 'Noto Sans Bengali' }}
								>
									{item?.INFO_TITLE_BN}
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