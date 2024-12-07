import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface MonthlyData {
  date: string;
  byDay: number;
  invest: number;
  diff: number;  // Keeping this in the interface, but not using for chart
  diffWithoutInvest: number;
  middleMonthValue: number;
  in: number;
  out: number;
}

const MonthlyChart: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MonthlyData[]>(`${process.env.REACT_APP_API_URL}/month/short`);
        setMonthlyData(response.data.reverse()); // Reverse the data to show latest first
      } catch (error) {
        console.error('Error fetching monthly data:', error);
      }
    };

    fetchData();
  }, []);

  const data = monthlyData.map(item => ({
    name: item.date,
    'Average Daily Value': item.diffWithoutInvest,
    'Investment': item.invest,
    'Middle Month Value': item.middleMonthValue
  }));

  return (
    <div style={{ width: '100%', height: 900 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Monthly Financial Data</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Average Daily Value" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Investment" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Middle Month Value" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;