import React, { PureComponent } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrendingG = ({ ALLOWANCE_SPONSORS }) => {
  return (
    <div className="allowance_graph" style={{ width: "100%", height: "200px" }}>
      <h6>Contributions</h6>
      <ResponsiveContainer width="100%" height="88%">
        <AreaChart
          width={550}
          height={400}
          data={ALLOWANCE_SPONSORS}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="allowance"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendingG;
