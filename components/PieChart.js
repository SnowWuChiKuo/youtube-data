import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="flex justify-center items-center text-center">{data.label}</h2>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
            }
          }
        }}
      />
    </div>
  );
};

export default PieChart;