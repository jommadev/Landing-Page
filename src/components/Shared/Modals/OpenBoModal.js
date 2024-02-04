import Image from 'next/image';
import React from 'react';
import close from "../../../assets/images/btn_close.svg";
import { Modal } from 'react-bootstrap';
import ButtonPrimary from '@/components/UI/ButtonPrimary';
import { redirectToPageBaseOnJS } from '@/utils/boProfile';

const OpenBoModal = (props) => {
    const handelBoAccount = () => {
        redirectToPageBaseOnJS(router, props?.data?.JOURNEY_STATUS)
    }
    return (
        <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="custom-modal-container"
      centered
    >
				<Modal.Header className="custom-modal-header pb-0">
					<Modal.Title id="contained-modal-title-vcenter"></Modal.Title>

					<div
						type=""
						className="close"
						aria-label="Close"
						onClick={props.onHide}
					>
						<Image
							src={close}
							alt="Close"
							style={{ width: '20px', height: '20px', cursor: 'pointer' }}
						/>
					</div>
				</Modal.Header>
				<Modal.Body className="custom-modal-body text-center">
						<p className="mb-1">
                            {
                                props?.data?.JOURNEY_STATUS == 0  && props?.data?.COMPLETE_YN == 0 ? 'Please complete your user profile to open a new BO account\n CDBL BO Account Maintenance Fee - BDT 450 per year\nFee will be deducted by your Broker from your BO Account balance every year by 31 July.':
                            'Your BO Account has not yet been opened. Please initiate pre-fund after BO account opening, which can take 1-2 working days.'
                            }
						</p>
				</Modal.Body>
				<div className="d-flex justify-content-center mt-2">
                    <ButtonPrimary onClick={handelBoAccount} size="custom-medium">
                        {props?.data?.JOURNEY_STATUS > 0 ? 'Complete Bo' : 'Open Bo'}
                    </ButtonPrimary>
					
				</div>
				<Modal.Footer className="custom-modal-footer p-1"></Modal.Footer>
			</Modal>
      
    );
};

export default OpenBoModal;