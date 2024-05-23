import Image from 'next/image';
import Link from 'next/link';
import SubscriptionGroup from '../../assets/images/subscription_group.svg';

const Subscription = () => {
	return (
		<>
			<div className="container  mt-5">
			<div className="subscription-area">
				<div className="row">
					<div className="col-lg-7 d-flex justify-content-center align-items-center">
						<div className="subscription-info-area text-lg-start text-center">
							<h1>Subscribe & Access All Contents</h1>
							<p>
								Get all Jomma contents delivered to you on Whatsapp & Stay
								updated with Jomma for only Tk 20.
							</p>
							<Link href={''}>Subscribe</Link>
						</div>
					</div>
					<div className="col-lg-5">
						<div className="d-flex justify-content-lg-end justify-content-center">
							<Image
								src={SubscriptionGroup}
								alt="Jomma Subscription Section"
								className="subscription-group-image"
							/>
						</div>
					</div>
				</div>
			</div>
			</div>
		</>
	);
};

export default Subscription;
