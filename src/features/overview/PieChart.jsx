import { getProgress } from '@/utils/helpers';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill='var(--text-primary)' className='text-sm font-bold'>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={3}
        textAnchor={textAnchor}
        fill='var(--text-secondary)'
        className='font-medium'
      >
        {`${getProgress(percent * 100)}%`}
      </text>
    </g>
  );
};

export default function PieChartStats({ data, title, legend, COLORS, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className={`flex flex-col gap-5 rounded-lg border border-border p-3 shadow-md ${className}`}>
      <h2 className='text-lg font-bold text-text-primary'>{title}</h2>
      <div className='flex justify-center gap-3'>
        {legend.map((el) => (
          <div key={el.text} className='flex items-center gap-2'>
            <span className={`h-3 w-6 rounded-md ${el.color}`}></span>
            <span className='text-xs font-medium'>{el.text}</span>
          </div>
        ))}
      </div>
      <ResponsiveContainer className='flex-1'>
        <PieChart>
          <text
            x='50%'
            y='50%'
            dy={8}
            textAnchor='middle'
            className='text-2xl font-bold'
            fill='var(--text-primary'
          ></text>

          <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            cornerRadius='30%'
            paddingAngle={5}
            className='text-xs outline-none'
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, i) => setActiveIndex(i)}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} className='outline-none' stroke='transparent' fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
