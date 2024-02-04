import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const UserPerformanceGraph = ({ graphData }) => {
  const [chartHeight, setChartHeight] = useState(330);


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setChartHeight(250);
      } else {
        setChartHeight(330);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        show: false,
      },
      color: '#fff'
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
      min: graphData.length > 0 ? new Date(graphData[0][0])?.getTime() : undefined,
      tickAmount: 6,
      labels: {
        style: {
          colors: "#fff", // Change label color to white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff", // Change label color to white
        },
      },
    },
    tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
        y: {
          formatter: function (val) {
            return `${val} BDT`
          },
          title: {
            formatter: function (seriesName) {
              return 'Price'
            }
          }
        },
        style: {
          color: '#000', // Set the text color to black
        },
      },
      
    fill: {
      type: "gradient",
      gradient: {
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: "#FFB200",
            opacity: 0.8,
          },
          {
            offset: 100,
            color: "#FFB200",
            opacity: 0.4,
          },
        ],
      },
    },
    grid: {
      show: true,
      borderColor: "#FFFFFF29",
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
      colors: ["#FFB200"] ,
      width: 1,
    }
  };

  return (
    <div id="chart">
      <div id="chart-timeline">
        <ReactApexChart
          options={options}
          series={[{ data: graphData }]}
          type="area"
          height={chartHeight}
        />
      </div>
    </div>
  );
};

export default UserPerformanceGraph;
