import React from 'react';

const LineChart = ({ data, title }) => {
  if (!data || data.length === 0) {
    return <div className="line-chart empty">No data available</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const width = 800;
  const height = 300;
  const padding = 40;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (d.value / maxValue) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div className="line-chart">
      <h3 className="chart-title">{title}</h3>
      <svg width={width} height={height} className="chart-svg">
        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`grid-${i}`}
            x1={padding}
            y1={padding + (i / 4) * chartHeight}
            x2={width - padding}
            y2={padding + (i / 4) * chartHeight}
            stroke="#e0e0e0"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#333" strokeWidth="2" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#333" strokeWidth="2" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#667eea" strokeWidth="3" />

        {/* Points */}
        {points.map((p, i) => (
          <circle key={`point-${i}`} cx={p.x} cy={p.y} r="5" fill="#667eea" />
        ))}
      </svg>
      <div className="chart-legend">
        {data.map((d, i) => (
          <div key={`legend-${i}`} className="legend-item">
            <span className="legend-label">{d.label}:</span>
            <span className="legend-value">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
