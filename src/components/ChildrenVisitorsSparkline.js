import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ChildrenVisitorsSparkline = ({ data }) => {
  return (
    <div className="children-visitors-sparkline">
      <h2>Children Visitors Trend</h2>
      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="childrenVisitors" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChildrenVisitorsSparkline;
