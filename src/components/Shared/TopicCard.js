import Image from "next/image";
import { useRouter } from "next/router";

const TopicCard = ({item}) => {
	const router = useRouter()

	const handleDetailsPage = (slug) =>{
		router.push(`/information/${slug}`);
	}
	return (
		<div className="help-center-topic-section" onClick={()=>handleDetailsPage(item?.INFO_SLUG)}>
			<div className="help-center-image-area ">
                <Image src={item?.INFO_IMAGE} alt="" width={80} height={35}   className="ms-2 "  style={{minWidth:'1px'}} ></Image>
            </div>
			<div className="help-center-info-area">

            <p className="question-title-en mb-1">{item?.INFO_TITLE_EN}</p>
            <p className="question-title-bn mb-1" style={{ fontFamily: "Noto Sans Bengali" }}>{item?.INFO_TITLE_BN}</p>

            </div>
		</div>
	);
};

export default TopicCard;
