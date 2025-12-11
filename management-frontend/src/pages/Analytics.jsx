import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import api from '../api/axios';
import '../styles/analytics.css';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from backend
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        setData(res.data);
      } catch (error) {
        console.error('Failed to fetch analytics', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const COLORS = ['#00FF00', '#E5E7EB'];

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">Chats</p>
          <p className="tooltip-value">{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="analytics-page">
        <div className="analytics-loading">Loading analytics...</div>
      </div>
    );
  }

  // Use safe defaults if data is missing
  const safeData = data || {
    resolvedVsUnresolved: { resolved: 0, unresolved: 0 },
    totalChats: 0,
    avgReplyTime: 0,
    missedChatsHistory: []
  };

  // Calculate resolved vs unresolved from backend data
  const resolvedData = [
    { name: 'Resolved', value: safeData.resolvedVsUnresolved?.resolved || 0 },
    { name: 'Unresolved', value: safeData.resolvedVsUnresolved?.unresolved || 0 }
  ];

  // Calculate percentage for display
  const totalTickets = resolvedData[0].value + resolvedData[1].value;
  const resolvedPercentage = totalTickets > 0
    ? Math.round((resolvedData[0].value / totalTickets) * 100)
    : 0;

  // Custom label for pie chart center
  const renderCustomLabel = () => {
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="pie-center-label">
        <tspan x="50%" dy="-0.2em" fontSize="24" fontWeight="bold" fill="#00FF00">
          {resolvedPercentage}%
        </tspan>
      </text>
    );
  };

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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={safeData.missedChatsHistory || []}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                domain={[0, 25]}
                ticks={[0, 5, 10, 15, 20, 25]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="chats"
                stroke="#00FF00"
                strokeWidth={3}
                dot={{ fill: '#fff', stroke: '#000', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="metrics-grid">
        {/* Average Reply Time */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Average Reply time</h3>
            <p>
              For highest customer satisfaction rates you should aim to reply to an incoming
              customer's message in 15 seconds or less. Quick responses will get you more
              conversations, help you earn customers trust and make more sales.
            </p>
          </div>
          <div className="metric-value green">
            {safeData.avgReplyTime || 0} secs
          </div>
        </div>

        {/* Resolved Tickets */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Resolved Tickets</h3>
            <p>
              A callback system on a website, as well as proactive invitations, help to attract
              even more customers. A separate round button for ordering a call with a small
              animation helps to motivate more customers to make calls.
            </p>
          </div>
          <div className="metric-chart">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={resolvedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {resolvedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
                  ))}
                </Pie>
                {renderCustomLabel()}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Total Chats */}
        <div className="metric-card">
          <div className="metric-info">
            <h3>Total Chats</h3>
            <p>
              This metric Shows the total number of chats for all Channels for the selected
              the selected period
            </p>
          </div>
          <div className="metric-value green">
            {safeData.totalChats || 0} Chats
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
