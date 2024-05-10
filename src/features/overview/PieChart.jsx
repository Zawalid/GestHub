import { getProgress } from '@/utils/helpers';
import { useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
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
        cornerRadius='30%'
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        cornerRadius='30%'
        fill={fill}
      />
      {!props.isLoading && (
        <>
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill='none' />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill='var(--text-primary)'
            className='font-semibold text-sm'
          >
            {value}
          </text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={12}
            textAnchor={textAnchor}
            fill='var(--text-secondary)'
            className='text-[8px] font-bold'
          >
            {`${getProgress(percent * 100)}%`}
          </text>
        </>
      )}
    </g>
  );
};

export default function PieChartStats({ data, title, legend, COLORS, className = '', isLoading,active }) {
  const [activeIndex, setActiveIndex] = useState(active);

  const loadingData = [
    { name: 'Loading...', value: 20 },
    { name: 'Loading...', value: 55 },
    { name: 'Loading...', value: 25 },
  ];

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
      <ResponsiveContainer className={`flex-1 ${isLoading ? 'animate-pulse' : ''}`}>
        <PieChart>
          <Pie
            data={isLoading ? loadingData : data}
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
            activeShape={(props) => renderActiveShape({ ...props, isLoading })}
            onMouseEnter={(_, i) => setActiveIndex(i)}
          >
            {(isLoading ? loadingData : data).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className='outline-none'
                stroke='transparent'
                fill={isLoading ? 'var(--background-secondary)' : COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
