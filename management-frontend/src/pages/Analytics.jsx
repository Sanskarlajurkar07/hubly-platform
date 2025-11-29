import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import '../styles/Analytics.css';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="analytics-page">Loading...</div>;
  if (!data) return <div className="analytics-page">No data available yet</div>;

  // Mock data for the line chart visualization since backend only provides summary
  // In a real app, backend should provide historical data
  const chartPoints = [13, 8, 14, 9, 6, 12, 4, 9, 16, 18];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h2>Analytics</h2>
      </div>

      {/* Missed Chats Chart Section */}
      <div className="chart-section">
        <div className="chart-header">
          <h3>Missed Chats</h3>
          <span className="more-options">•••</span>
        </div>
        <div className="line-chart-container">
          {/* Simplified CSS Line Chart Visualization */}
          <svg viewBox="0 0 500 150" className="line-chart-svg">
            {/* Grid lines */}
            <line x1="0" y1="120" x2="500" y2="120" stroke="#f1f5f9" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" />
            <line x1="0" y1="40" x2="500" y2="40" stroke="#f1f5f9" />

            {/* The Line */}
            <path
              d={`M0,${150 - chartPoints[0] * 5} 
                       C25,${150 - chartPoints[0] * 5} 25,${150 - chartPoints[1] * 5} 50,${150 - chartPoints[1] * 5}
                       C75,${150 - chartPoints[1] * 5} 75,${150 - chartPoints[2] * 5} 100,${150 - chartPoints[2] * 5}
                       C125,${150 - chartPoints[2] * 5} 125,${150 - chartPoints[3] * 5} 150,${150 - chartPoints[3] * 5}
                       C175,${150 - chartPoints[3] * 5} 175,${150 - chartPoints[4] * 5} 200,${150 - chartPoints[4] * 5}
                       C225,${150 - chartPoints[4] * 5} 225,${150 - chartPoints[5] * 5} 250,${150 - chartPoints[5] * 5}
                       C275,${150 - chartPoints[5] * 5} 275,${150 - chartPoints[6] * 5} 300,${150 - chartPoints[6] * 5}
                       C325,${150 - chartPoints[6] * 5} 325,${150 - chartPoints[7] * 5} 350,${150 - chartPoints[7] * 5}
                       C375,${150 - chartPoints[7] * 5} 375,${150 - chartPoints[8] * 5} 400,${150 - chartPoints[8] * 5}
                       C425,${150 - chartPoints[8] * 5} 425,${150 - chartPoints[9] * 5} 450,${150 - chartPoints[9] * 5}
                       `}
              fill="none"
              stroke="#00FF00"
              strokeWidth="3"
            />

            {/* Points */}
            {chartPoints.map((val, idx) => (
              <circle
                key={idx}
                cx={idx * 50}
                cy={150 - val * 5}
                r="4"
                fill="white"
                stroke="black"
                strokeWidth="2"
              />
            ))}

            {/* Tooltip Mockup */}
            <g transform="translate(250, 60)">
              <rect x="-25" y="-35" width="50" height="30" rx="4" fill="black" />
              <text x="0" y="-20" textAnchor="middle" fill="white" fontSize="8">Chats</text>
              <text x="0" y="-8" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">13</text>
              <path d="M-5,-5 L0,0 L5,-5 Z" fill="black" />
            </g>
          </svg>
          <div className="chart-labels">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
            <span>Week 5</span>
            <span>Week 6</span>
            <span>Week 7</span>
            <span>Week 8</span>
            <span>Week 9</span>
            <span>Week 10</span>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        {/* Average Reply Time */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Average Reply time</h3>
            <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>
          </div>
          <div className="metric-value green">
            {data.averageReplyTime || 0} secs
          </div>
        </div>

        {/* Resolved Tickets */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Resolved Tickets</h3>
            <p>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
          </div>
          <div className="metric-chart">
            <div className="pie-chart-container">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${data.resolvedRatio || 0}, 100`}
                  d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{data.resolvedRatio || 0}%</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Total Chats */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Total Chats</h3>
            <p>This metric Shows the total number of chats for all Channels for the selected the selected period</p>
          </div>
          <div className="metric-value green">
            {data.totalChats || 0} Chats
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;