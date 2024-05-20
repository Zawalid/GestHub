import { getProgress } from '@/utils/helpers';
import { useEffect, useState } from 'react';
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
            className='text-sm font-semibold'
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

export default function PieChartStats({ data, title, legend, COLORS, className = '', isLoading }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const isEmpty = data.every((el) => +el.value === 0);
  const loadingData = [
    { name: 'Loading...', value: 20 },
    { name: 'Loading...', value: 55 },
    { name: 'Loading...', value: 25 },
  ];
  const emptyData = [
    { name: 'Empty', value: 20 },
    { name: 'Empty', value: 55 },
    { name: 'Empty', value: 25 },
  ];

  useEffect(() => {
    setActiveIndex(data[0].value >= 0 ? 0 : data.findIndex((e) => e.value > 0));
  }, [data]);

  return (
    <div
      className={`flex min-h-[300px] flex-col items-center gap-2 rounded-lg border border-border p-3 shadow-md ${className}`}
    >
      <h2 className='text-lg font-bold text-text-primary'>{title}</h2>
      <Legend legend={legend} />
      <ResponsiveContainer className={`flex-1 ${isLoading ? 'animate-pulse' : ''}`}>
        <PieChart>
          <Pie
            data={isLoading ? loadingData : isEmpty ? emptyData : data}
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
            {(isLoading ? loadingData : isEmpty ? emptyData : data).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                className='outline-none'
                stroke='transparent'
                fill={isLoading || isEmpty ? 'var(--background-secondary)' : COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Legend({ legend }) {
  return (
    <div className='flex items-start justify-center gap-3 pt-2'>
      {legend.map((el) => (
        <div key={el.text} className='flex items-center gap-2'>
          <span className={`h-3 w-6 rounded-md ${el.color}`}></span>
          <span className='text-xs font-medium'>{el.text}</span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function createCustomTooltip(fields) {
  return function CustomTooltip({ payload, active }) {
    if (active && payload && payload.length) {
      return (
        <div className='tooltip'>
          {fields.map(({ key, label, intro, condition }) => (
            <div key={Math.random()}>
              {label && (
                <p className='label mb-1 border-b border-border pb-1 text-text-secondary'>
                  {payload[0].payload[key]} {condition?.(payload[0].payload[key])}
                </p>
              )}
              {intro && (
                <p className='intro mb-0.5 font-medium text-text-primary'>{`${intro} : ${payload[0].payload[key]}`}</p>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };
}
