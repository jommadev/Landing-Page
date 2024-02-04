import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import close from "../../../assets/images/game-modal-close.svg";
import {
  formatNumberWithTwoDecimalPlaces,
  isNegative,
} from "@/utils/flootNumberAndIsNegative";
import { useGetSingleMarketValueQuery } from "@/redux/api/apiSlice";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GameProductGraph from "@/components/Shared/GameProductGraph";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false,
});

const GameProductGraphModal = (props) => {
  const [chartHeight, setChartHeight] = useState(350);
  const { data, isLoading, error } = useGetSingleMarketValueQuery(
    props?.data?.id
  );

  useEffect(()=>{
    function handleResize() {
      if (window.innerWidth <= 768) {
        setChartHeight(200); 
      } else {
        setChartHeight(350); 
      }
    }

    handleResize(); 

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])

  

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      contentClassName="custom-modal-container graph-modal-area"
      centered
    >
      <Modal.Header className="custom-modal-header">
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
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <div className="modal-title">
          <p className="game-modal-product-name">{data?.data?.PROD_NAME}</p>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6 col-6">
              <div
                className="modal-title-value"
                style={
                  !isNegative(props?.data?.yearToDate)
                    ? props?.data?.yearToDate == 0
                      ? { backgroundColor: "#FFFFFF29" }
                      : { backgroundColor: "#18FF0029" }
                    : props?.data?.yearToDate < 0
                    ? { backgroundColor: "#D60D0D29" }
                    : null
                }
              >
                <p className="modal-title-value-title text-white">Year to Date</p>
                <p
                  className=""
                  //todo: chake style
                  style={
                    !isNegative(props?.data?.yearToDate)
                      ? props?.data?.yearToDate == 0
                        ? { color: "#fff" }
                        : { color: "#24FF00" }
                      : props?.data?.yearToDate < 0
                      ? { color: "#d60d0d" }
                      : null
                  }
                >
                  {formatNumberWithTwoDecimalPlaces(props?.data?.yearToDate)} %
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 col-6">
              <div className="modal-title-value" style={{backgroundColor: "#FFFFFF29"}}>
                <p className="modal-title-value-title text-white">Close Price (Tk)</p>
                <p className="modal-title-value-text text-white">
                  {props?.data?.closePrice}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-title-divider"></div>
        <div className="chart-container">
        {
          data?.data?.data ?
          <GameProductGraph graphData = {data?.data?.data} closePrice={props?.data?.closePrice} lastYearPrice={props?.data?.yearToDate} chartHeight={chartHeight} />
          :
          <Skeleton height={chartHeight} />
        }
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer"></Modal.Footer>
    </Modal>
  );
};

export default GameProductGraphModal;
