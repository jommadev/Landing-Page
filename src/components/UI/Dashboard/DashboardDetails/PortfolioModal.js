import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import close from '../../../../assets/images/btn_close.svg';

const PortfolioModal = (props) => {
	console.log(props);

	return (
		<Modal
			{...props}
			size="xl"
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
			<Modal.Body className="custom-modal-body">
				<div className="modal-title">
					<p className='mb-1'>{props?.data?.prodName}</p>
				</div>
				<div className="modal-title-divider my-2"></div>

				<table className="borderless">
					<tbody style={{ fontSize: '12px' }}>
						<tr style={{ height: '25px', color: '#000' }}>
							<td style={{ width: '130px' }}>Unit Held</td>
							<td>
								<p
									className="mb-0"
									style={{ fontSize: '14px', fontWeight: 500 }}
								>
									{props?.data?.units}
								</p>
							</td>
						</tr>
						<tr style={{ height: '25px', color: '#000' }}>
							<td>Portfolio Value (Tk)</td>
							<td>
								<p
									className="mb-0"
									style={{ fontSize: '14px', fontWeight: 500 }}
								>
									{props?.data?.profilebalance}
								</p>
							</td>
						</tr>
						<tr style={{ height: '25px', color: '#000' }}>
							<td>Gain/Loss (Tk) </td>
							<td>
								<p
									className="mb-0"
									style={{
										fontSize: '14px',
										fontWeight: 500,
										color:
											parseInt(props?.data?.gainLoss) < 0
												? '#D60D0D'
												: '#389429',
									}}
								>
									{props?.data?.gainLoss}
								</p>
							</td>
						</tr>
						<tr style={{ height: '25px', color: '#000' }}>
							<td>Gain/Loss (%)</td>
							<td>
								<p
									className="mb-0"
									style={{
										fontSize: '14px',
										fontWeight: 500,
										color:
											parseInt(props?.data?.gainLossPerc) < 0
												? '#D60D0D'
												: '#389429',
									}}
								>
									{props?.data?.gainLossPerc}%
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer className="custom-modal-footer"></Modal.Footer>
		</Modal>
	);
};

export default PortfolioModal;
