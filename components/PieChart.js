import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  console.log('data: ', data)
  const result = []

  const labels = data.labels
  const datas = data.data
  console.log('dataLabels: ', data.labels)
  console.log('dataData: ', data.data)

  for (let i = 0; i < labels.length; i++) {
    const list = {
      label: labels[i],
      value: datas[i]
    };
    result.push(list);
  }

  console.log('result: ', result)

  return (
    <div className="chart-container">
      <h2 className="flex justify-center items-center text-center">{data.label}</h2>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Chart Data"
            }
          },
        }}
      />
        <ul className="mt-5">
      {result.map((item, index) => (
          <li key={index}>{item.label}: {item.value}</li>
        ))}
        </ul>
    </div>
  );
};

export default PieChart;