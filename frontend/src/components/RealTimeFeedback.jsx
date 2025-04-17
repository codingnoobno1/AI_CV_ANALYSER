import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const RealTimeFeedback = () => {
  const data = {
    labels: ['0s', '10s', '20s', '30s', '40s'], 
    datasets: [
      {
        label: 'Interview Performance',
        data: [0, 1, 2, 3, 4],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointRadius: 5,  // Customize point size here if necessary
        pointBackgroundColor: 'rgb(75, 192, 192)',  // Customize point color here if necessary
      },
    ],
  };

  return <Line data={data} />;
};

export default RealTimeFeedback;
