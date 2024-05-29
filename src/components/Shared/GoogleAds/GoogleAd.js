import React from "react";
import { Adsense } from "@ctrl/react-adsense";

const GoogleAd = ({slotID}) => {
  return (
    <div className="container text-center adsbygoogle my-3">
      <Adsense
        client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
        slot={slotID}
        style={{ display: "block" }}
        layout="in-article"
        format="fluid"
      />
    </div>
  );
}

export default GoogleAd;


