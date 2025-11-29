import React from 'react';

const CircularProgress = ({ percentage, label, color = '#667eea' }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress">
      <svg width="120" height="120" className="progress-svg">
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="progress-text">
        <span className="percentage">{percentage}%</span>
        <span className="label">{label}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
