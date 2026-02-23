// components/analytics/Analytics.jsx
import React, { useState } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [activePeriod, setActivePeriod] = useState('month');

  // Function to handle period change
  const handlePeriodChange = (period) => {
    setActivePeriod(period);
    // Here you would typically fetch new data based on the selected period
    console.log(`Fetching data for: ${period}`);
  };

  // Mock data for different periods
  const getMetricsByPeriod = (period) => {
    const metricsData = {
      week: [
        { id: 1, label: 'Total Revenue', value: '₱12,450', change: '+5%', trend: 'up', period: 'vs last week' },
        { id: 2, label: 'Total Bookings', value: '58', change: '+3%', trend: 'up', period: 'vs last week' },
        { id: 3, label: 'Avg. Order Value', value: '₱820', change: '-2%', trend: 'down', period: 'vs last week' },
        { id: 4, label: 'Customer Retention', value: '75%', change: '+1%', trend: 'up', period: 'vs last week' }
      ],
      month: [
        { id: 1, label: 'Total Revenue', value: '₱45,670', change: '+12%', trend: 'up', period: 'vs last month' },
        { id: 2, label: 'Total Bookings', value: '234', change: '+8%', trend: 'up', period: 'vs last month' },
        { id: 3, label: 'Avg. Order Value', value: '₱850', change: '+5%', trend: 'up', period: 'vs last month' },
        { id: 4, label: 'Customer Retention', value: '78%', change: '+3%', trend: 'up', period: 'vs last month' }
      ],
      year: [
        { id: 1, label: 'Total Revenue', value: '₱524,890', change: '+24%', trend: 'up', period: 'vs last year' },
        { id: 2, label: 'Total Bookings', value: '2,845', change: '+18%', trend: 'up', period: 'vs last year' },
        { id: 3, label: 'Avg. Order Value', value: '₱895', change: '+9%', trend: 'up', period: 'vs last year' },
        { id: 4, label: 'Customer Retention', value: '82%', change: '+7%', trend: 'up', period: 'vs last year' }
      ]
    };
    return metricsData[period];
  };

  // Mock data for popular services by period
  const getServicesByPeriod = (period) => {
    const servicesData = {
      week: [
        { id: 1, service: 'Dog Grooming', bookings: 22, revenue: 11000, color: '#f53799' },
        { id: 2, service: 'Cat Grooming', bookings: 12, revenue: 4800, color: '#9b51e0' },
        { id: 3, service: 'Daycare', bookings: 10, revenue: 2000, color: '#f2994a' },
        { id: 4, service: 'Pet Hotel', bookings: 8, revenue: 2400, color: '#2d9cdb' },
        { id: 5, service: 'Birthday Parties', bookings: 6, revenue: 12000, color: '#6fcf97' }
      ],
      month: [
        { id: 1, service: 'Dog Grooming', bookings: 85, revenue: 42500, color: '#f53799' },
        { id: 2, service: 'Cat Grooming', bookings: 42, revenue: 16800, color: '#9b51e0' },
        { id: 3, service: 'Pet Hotel', bookings: 38, revenue: 11400, color: '#2d9cdb' },
        { id: 4, service: 'Daycare', bookings: 45, revenue: 9000, color: '#f2994a' },
        { id: 5, service: 'Birthday Parties', bookings: 12, revenue: 24000, color: '#6fcf97' }
      ],
      year: [
        { id: 1, service: 'Dog Grooming', bookings: 1020, revenue: 510000, color: '#f53799' },
        { id: 2, service: 'Cat Grooming', bookings: 504, revenue: 201600, color: '#9b51e0' },
        { id: 3, service: 'Pet Hotel', bookings: 456, revenue: 136800, color: '#2d9cdb' },
        { id: 4, service: 'Daycare', bookings: 540, revenue: 108000, color: '#f2994a' },
        { id: 5, service: 'Birthday Parties', bookings: 144, revenue: 288000, color: '#6fcf97' }
      ]
    };
    return servicesData[period];
  };

  // Mock data for peak hours by period
  const getPeakHoursByPeriod = (period) => {
    const peakData = {
      week: [
        { time: 'Saturday', bookings: 62, percentage: 100 },
        { time: 'Friday', bookings: 48, percentage: 77 },
        { time: 'Sunday', bookings: 45, percentage: 73 },
        { time: 'Thursday', bookings: 42, percentage: 68 },
        { time: 'Wednesday', bookings: 35, percentage: 56 }
      ],
      month: [
        { time: '10:00 AM - 12:00 PM', bookings: 45, percentage: 100 },
        { time: '2:00 PM - 4:00 PM', bookings: 38, percentage: 84 },
        { time: '4:00 PM - 6:00 PM', bookings: 32, percentage: 71 },
        { time: '8:00 AM - 10:00 AM', bookings: 28, percentage: 62 },
        { time: '12:00 PM - 2:00 PM', bookings: 22, percentage: 49 }
      ],
      year: [
        { time: 'December', bookings: 312, percentage: 100 },
        { time: 'July', bookings: 278, percentage: 89 },
        { time: 'October', bookings: 245, percentage: 79 },
        { time: 'May', bookings: 198, percentage: 63 },
        { time: 'February', bookings: 156, percentage: 50 }
      ]
    };
    return peakData[period];
  };

  // Mock data for customer insights by period
  const getInsightsByPeriod = (period) => {
    const insightsData = {
      week: {
        newCustomers: 12,
        repeatRate: '75%',
        avgVisits: '1.8',
        activeDay: 'Saturday',
        popularPet: 'Dogs (68%)',
        satisfaction: '4.7/5'
      },
      month: {
        newCustomers: 45,
        repeatRate: '78%',
        avgVisits: '3.2',
        activeDay: 'Saturday',
        popularPet: 'Dogs (65%)',
        satisfaction: '4.8/5'
      },
      year: {
        newCustomers: 520,
        repeatRate: '82%',
        avgVisits: '8.5',
        activeDay: 'Saturday',
        popularPet: 'Dogs (63%)',
        satisfaction: '4.9/5'
      }
    };
    return insightsData[period];
  };

  // Mock data for revenue trend by period
  const getRevenueTrendByPeriod = (period) => {
    const trendData = {
      week: {
        current: [28, 32, 35, 42, 48, 62, 45],
        previous: [22, 28, 30, 38, 42, 55, 40],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      month: {
        current: [45, 52, 48, 58, 62, 55, 48, 52, 58, 62, 68, 72],
        previous: [38, 42, 40, 48, 52, 48, 42, 45, 50, 55, 58, 62],
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']
      },
      year: {
        current: [45000, 52000, 48000, 58000, 62000, 68000, 72000, 78000, 82000, 88000, 92000, 98000],
        previous: [38000, 42000, 40000, 48000, 52000, 58000, 62000, 68000, 72000, 78000, 82000, 88000],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
    return trendData[period];
  };

  const metrics = getMetricsByPeriod(activePeriod);
  const popularServices = getServicesByPeriod(activePeriod);
  const peakHours = getPeakHoursByPeriod(activePeriod);
  const insights = getInsightsByPeriod(activePeriod);
  const revenueTrend = getRevenueTrendByPeriod(activePeriod);
  
  const totalRevenue = popularServices.reduce((sum, service) => sum + service.revenue, 0);

  return (
    <div className="analytics-container">
      {/* Header Section */}
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">Analytics Dashboard</h1>
          <p className="analytics-subtitle">Track and monitor your business performance metrics</p>
        </div>
        
        {/* Period Selector */}
        <div className="analytics-period-selector">
          <button 
            className={`period-btn ${activePeriod === 'week' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('week')}
          >
            Week
          </button>
          <button 
            className={`period-btn ${activePeriod === 'month' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('month')}
          >
            Month
          </button>
          <button 
            className={`period-btn ${activePeriod === 'year' ? 'active' : ''}`}
            onClick={() => handlePeriodChange('year')}
          >
            Year
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="analytics-metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <div className="metric-header">
              <span className="metric-label">{metric.label}</span>
              <span className={`metric-trend trend-${metric.trend}`}>
                {metric.change}
              </span>
            </div>
            <div className="metric-value">{metric.value}</div>
            <div className="metric-period">{metric.period}</div>
            
            {/* Mini Sparkline Chart Placeholder */}
            <div className="metric-sparkline">
              <div className="sparkline-bar">
                <div 
                  className="sparkline-fill" 
                  style={{ 
                    width: `${metric.trend === 'up' ? '70' : '45'}%`,
                    background: metric.trend === 'up' ? '#f53799' : '#dc3545'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="analytics-charts-grid">
        {/* Revenue Trend Chart - Placeholder */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3 className="chart-title">Revenue Trend ({activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)})</h3>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#f53799' }}></span>
                This Period
              </span>
              <span className="legend-item">
                <span className="legend-dot" style={{ background: '#ffb6d9' }}></span>
                Previous Period
              </span>
            </div>
          </div>
          <div className="chart-container">
            <div className="line-chart-placeholder">
              {revenueTrend.current.map((value, index) => {
                const maxValue = Math.max(...revenueTrend.current, ...revenueTrend.previous);
                const currentHeight = (value / maxValue) * 100;
                const previousHeight = (revenueTrend.previous[index] / maxValue) * 100;
                
                return (
                  <div key={index} className="chart-bar-group">
                    <div className="chart-bar previous" style={{ height: `${previousHeight}%` }}></div>
                    <div className="chart-bar current" style={{ height: `${currentHeight}%` }}></div>
                  </div>
                );
              })}
            </div>
            <div className="chart-labels">
              {revenueTrend.labels.map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Service Distribution - Donut Chart Placeholder */}
        <div className="chart-card">
          <h3 className="chart-title">Service Distribution</h3>
          <div className="donut-chart-placeholder">
            <div className="donut-center">
              <span className="donut-value">
                {popularServices.reduce((sum, s) => sum + s.bookings, 0)}
              </span>
              <span className="donut-label">Total Bookings</span>
            </div>
            <svg viewBox="0 0 100 100" className="donut-svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f0f0f0" strokeWidth="15" />
              {popularServices.map((service, index) => {
                const totalBookings = popularServices.reduce((sum, s) => sum + s.bookings, 0);
                const percentage = service.bookings / totalBookings;
                const circumference = 2 * Math.PI * 40;
                const strokeDasharray = circumference;
                const strokeDashoffset = circumference * (1 - percentage);
                const rotation = index === 0 ? -90 : -90 + (popularServices.slice(0, index).reduce((sum, s) => sum + (s.bookings / totalBookings) * 360, 0));
                
                return (
                  <circle
                    key={service.id}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={service.color}
                    strokeWidth="15"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(${rotation} 50 50)`}
                  />
                );
              })}
            </svg>
          </div>
          <div className="service-legend">
            {popularServices.slice(0, 3).map(service => (
              <div key={service.id} className="legend-item">
                <span className="legend-dot" style={{ background: service.color }}></span>
                <span>{service.service}</span>
                <span className="legend-value">{((service.revenue / totalRevenue) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables and Insights Grid */}
      <div className="analytics-insights-grid">
        {/* Popular Services Table */}
        <div className="insights-card large">
          <h3 className="insights-title">Popular Services ({activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)})</h3>
          <div className="table-wrapper">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Bookings</th>
                  <th>Revenue</th>
                  <th>% of Total</th>
                </tr>
              </thead>
              <tbody>
                {popularServices.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <div className="service-cell">
                        <span className="service-dot" style={{ background: service.color }}></span>
                        {service.service}
                      </div>
                    </td>
                    <td>{service.bookings}</td>
                    <td>₱{service.revenue.toLocaleString()}</td>
                    <td>
                      <div className="percentage-cell">
                        <span>{((service.revenue / totalRevenue) * 100).toFixed(1)}%</span>
                        <div className="percentage-bar">
                          <div 
                            className="percentage-fill" 
                            style={{ 
                              width: `${(service.revenue / totalRevenue) * 100}%`,
                              background: service.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Peak Hours */}
        <div className="insights-card">
          <h3 className="insights-title">
            {activePeriod === 'week' ? 'Peak Days' : activePeriod === 'month' ? 'Peak Hours' : 'Peak Months'}
          </h3>
          <div className="peak-hours-list">
            {peakHours.map((hour, index) => (
              <div key={index} className="peak-hour-item">
                <div className="hour-info">
                  <span className="hour-time">{hour.time}</span>
                  <span className="hour-bookings">{hour.bookings} bookings</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${hour.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Insights */}
        <div className="insights-card">
          <h3 className="insights-title">Customer Insights ({activePeriod.charAt(0).toUpperCase() + activePeriod.slice(1)})</h3>
          <div className="insights-list">
            <div className="insight-item">
              <span className="insight-label">New Customers</span>
              <div className="insight-value-wrapper">
                <span className="insight-value">{insights.newCustomers}</span>
                <span className="insight-badge">this {activePeriod}</span>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-label">Repeat Customers</span>
              <div className="insight-value-wrapper">
                <span className="insight-value">{insights.repeatRate}</span>
                <div className="mini-progress">
                  <div 
                    className="mini-progress-fill" 
                    style={{ width: insights.repeatRate }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-label">Avg. Visits per Customer</span>
              <span className="insight-value">{insights.avgVisits}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">
                {activePeriod === 'week' ? 'Most Active Day' : activePeriod === 'month' ? 'Most Active Day' : 'Peak Season'}
              </span>
              <span className="insight-value highlight">{insights.activeDay}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Popular Pet</span>
              <span className="insight-value">{insights.popularPet}</span>
            </div>
            <div className="insight-item">
              <span className="insight-label">Customer Satisfaction</span>
              <div className="insight-value-wrapper">
                <span className="insight-value">{insights.satisfaction}</span>
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(parseFloat(insights.satisfaction)))}
                  {'☆'.repeat(5 - Math.floor(parseFloat(insights.satisfaction)))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;