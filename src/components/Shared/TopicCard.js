import { truncateText } from "@/utils/subStringLength";
import Image from "next/image";
import { useRouter } from "next/router";

const TopicCard = ({item}) => {
	const router = useRouter()


	const handleDetailsPage = (slug) =>{
		router.push(`/information/${slug}`);
	}

	const width = (item?.INFO_TITLE_EN === 'About Jomma' || 
	item?.INFO_TITLE_EN === 'Brac EPL Wealth Management product' || 
	item?.INFO_TITLE_EN === 'IPO (Initial Public Offering)') ? 80 : 40;
	return (
		<div className="help-center-topic-section" onClick={()=>handleDetailsPage(item?.INFO_SLUG)}>
			<div className="help-center-image-area ">
                <Image src={item?.INFO_IMAGE} alt="" width={width} height={35}   className="dynamic-image"  ></Image>
            </div>
			<div className="help-center-info-area">

            <p className="question-title-en mb-2">{truncateText(item?.INFO_TITLE_EN, 42)}</p>
            <p className="question-title-bn mb-2" style={{ fontFamily: "Noto Sans Bengali" }}>{truncateText(item?.INFO_TITLE_BN, 50)}</p>

            </div>
		</div>
	);
};

export default TopicCard;
