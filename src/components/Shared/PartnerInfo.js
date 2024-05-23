import Image from "next/image";

const PartnerInfo = ({ name, img }) => {
	return (
		<div className="me-3 me-lg-5 d-flex justify-content-center align-items-center"> {/* Added align-items-center */}
			<div className="partner-marquee-section">
				<Image src={img} alt="" className="w-100"/> 
				<p className="mb-0 text-center">{name}</p>
            </div>
		</div>
	);
};

export default PartnerInfo;
