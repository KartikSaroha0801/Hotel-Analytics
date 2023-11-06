import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AdultVisitorsSparkline = ({ data }) => {
  return (
    <div className="adult-visitors-sparkline">
      <h2>Adult Visitors Trend</h2>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="adultVisitors" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdultVisitorsSparkline;
