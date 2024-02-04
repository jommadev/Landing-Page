import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PortfolioGraphView = ({data}) => {
    const [chartHeight, setChartHeight] = useState(380);
	const [titleStyle, setTitleStyle] = useState({
		fontSize:"14px", fontWeight:600
	});
	const [titleLabelStyle, setTitleLabelStyle] = useState({
		fontSize:"12px", fontWeight:500
	});
	useEffect(() => {
		function handleResize() {
			if (window.innerWidth <= 768) {
			  setChartHeight(230); 
			  setTitleStyle({
				fontSize:"10px", fontWeight:400
			  });
			  setTitleLabelStyle({
				fontSize:"8px", fontWeight:400
			  }
				)
			} else {
			  setChartHeight(380); 
			  setTitleStyle({
				fontSize:"14px", fontWeight:600
			  });
			  setTitleLabelStyle({
				fontSize:"12px", fontWeight:500
			  }
				)
			}
		  }
	  
		  handleResize(); 
	  
		  window.addEventListener('resize', handleResize);
		  return () => {
			window.removeEventListener('resize', handleResize);
		  };
	  }, []);
    const options = {
		chart: {
		  id: "area-datetime",
		  type: "area",
		  zoom: {
			autoScaleYaxis: true,
		  },
		  toolbar: {
			show: false
		}
		},
		dataLabels: {
		  enabled: false,
		},
		markers: {
		  size: 0,
		  style: "hollow",
		},
		xaxis: {
		  type: "datetime",
		  min: new Date(data?.graph[0][0]).getTime(),
		  tickAmount: 6,
		  title: {
			text: "Date",
			style: {
			  fontSize: titleStyle?.fontSize,
			  fontWeight: titleStyle?.fontWeight,
			  color: "#333",
			},
			offsetY: 3,
		  },
		  labels: {
			style: {
			  fontSize: titleLabelStyle?.fontSize,
			  fontWeight: titleLabelStyle?.fontWeight,
			},
		  }
		},
		yaxis: {
		  title: {
			text: "Portfolio Value (Tk)",
			style: {
			    fontSize: titleStyle?.fontSize,
			  fontWeight: titleStyle?.fontWeight,
			  color: "#333",
			},
			offsetY: 5,
		  },
		  labels: {
			formatter: function(val) {
				return val.toFixed(0);
			  },
		
			style: {
			  fontSize: titleLabelStyle?.fontSize,
			  fontWeight: titleLabelStyle?.fontWeight,
			},
		  }
		},
		tooltip: {
		  x: {
			format: "dd MMM yyyy", 
		  },
		  y: {
			formatter: function(val) {
			  return `${val} BDT`
			},
			title: {
			  formatter: function (seriesName) {
				return 'Index'
			  }
			}
		  }
		},
	
	
		fill: {
		  type: "gradient",
		  gradient: {
			stops: [0, 100],
			colorStops: [
			  {
				offset: 0,
				color: true ?  "#2C7C7A" : "#D60D0D",
				//color:"transparent",
				opacity: 0.6,
			  },
			  {
				offset: 100,
				color: true ?  "#2C7C7A" : "#D60D0D",
				//color:"transparent",
				opacity: 0.2,
			  },
			],
		  },
		},
		grid: {
		  show: true,
		  borderColor: "#DCDCDD",
		  xaxis: {
			lines: {
			  show: true,
			},
		  },
		  yaxis: {
			lines: {
			  show: true,
			},
		  },
		},
		stroke: {
		  show: true,
		  curve: 'smooth',
		  colors:true ?  ["#2C7C7A"] : ["#D60D0D"],
		  width: 1, 
	  }
	  
	  };
    return (
        <div id="chart mt-4">
      <div id="chart-timeline">
      
        <ReactApexChart
          options={options}
          series={[{ data: data?.graph }]}
          type="area"
          height={chartHeight}
        />

      </div>
    </div>
    );
};

export default PortfolioGraphView;