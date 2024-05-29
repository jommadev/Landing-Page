import styles from '@/styles/markets/news.module.css';
import Image from 'next/image';
import Modal from 'react-bootstrap/Modal';
import close from '../../../assets/images/btn_close.svg';

function ShortsModal({ shortsModalShow, shortsLink, handleModalClose, videoType }) {
	/* const [show, setShow] = useState(false);
	const handleClose = () => setShow(false); */
	

	return (
		<>
			<Modal
				show={shortsModalShow}
				dialogClassName={`${videoType===1 ? styles.ShortsCustomModal : styles.VideoCustomModal}`}
				centered
				aria-labelledby="example-custom-modal-styling-title"
			>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter"></Modal.Title>

					<div
						type=""
						className="close"
						aria-label="Close"
						onClick={handleModalClose}
					>
						<Image
							src={close}
							alt="Close"
							style={{ width: '20px', height: '20px', cursor: 'pointer' }}
						/>
						
					</div>
				</Modal.Header>
				<Modal.Body>
					<iframe
						src={`https://www.youtube.com/embed/${shortsLink}?playlist=${shortsLink}&playsinline=1&iv_load_policy=3&rel=0&showinfo=0&controls=1&fs=0&start=0&autoplay=1&loop=1&enablejsapi=1&widgetid=1`}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
						allowFullScreen
						className={`${videoType===1 ? styles.ShortsCustomModalIframe : styles.VideoCustomModalIframe}`}
					></iframe>
					
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ShortsModal;
