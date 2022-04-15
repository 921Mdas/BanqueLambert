import "../Depenses/Depenses.scss";

import { RiWallet3Fill } from "react-icons/ri";
import { BiGasPump, BiBus } from "react-icons/bi";
import { GiShoppingCart, GiBus } from "react-icons/gi";
import { AiOutlineCar } from "react-icons/ai";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const data = [
  { name: "Chauffeur", value: 100 },
  { name: "Provision", value: 170 },
  { name: "Essence/PJ", value: 20 },
  { name: "Transport", value: 30 },
];

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={"#ffff"}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={"#ffc008"}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={"#ffc008"}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#ffff"
      >{`${value} $`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#ffc008"
      >
        {`${(percent * 100).toFixed()}%`}
      </text>
    </g>
  );
};

class PIECHARTEXP extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-active-shape-y93si";

  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={"100%"} height={400}>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#c6c3f8"
            dataKey="value"
            onMouseEnter={this.onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

const Depenses = () => {
  return (
    <div className="depenses">
      <div className="depenses_title">
        <RiWallet3Fill className="depense_icon" /> <h1>Depenses</h1>
      </div>
      <div className="expenses_detail_chart">
        <h6>Depenses Mensuels</h6>
        <PIECHARTEXP />
      </div>

      <div className="list_of_expenses">
        <div className="expenses_item">
          <div className="description_expense">
            <AiOutlineCar className="depense_icon_list" />
            <div className="expense_info">
              <h5>{data[0].name}</h5>
              <div className="due">12/4/2022</div>
            </div>
          </div>
          <div className="cost_price_expense">
            {data[0].value} <span>$</span>
          </div>
        </div>
      </div>
      <div className="list_of_expenses">
        <div className="expenses_item">
          <div className="description_expense">
            <GiShoppingCart className="depense_icon_list" />
            <div className="expense_info">
              <h5>{data[1].name}</h5>
              <div className="due">12/4/2022</div>
            </div>
          </div>
          <div className="cost_price_expense">
            {data[1].value} <span>$</span>
          </div>
        </div>
      </div>
      <div className="list_of_expenses">
        <div className="expenses_item">
          <div className="description_expense">
            <BiGasPump className="depense_icon_list" />
            <div className="expense_info">
              <h5>{data[2].name}</h5>
              <div className="due">12/4/2022</div>
            </div>
          </div>
          <div className="cost_price_expense">
            {data[2].value} <span>$</span>
          </div>
        </div>
      </div>
      <div className="list_of_expenses">
        <div className="expenses_item">
          <div className="description_expense">
            <BiBus className="depense_icon_list" />
            <div className="expense_info">
              <h5>{data[3].name}</h5>
              <div className="due">12/4/2022</div>
            </div>
          </div>
          <div className="cost_price_expense">
            {data[3].value} <span>$</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Depenses;
