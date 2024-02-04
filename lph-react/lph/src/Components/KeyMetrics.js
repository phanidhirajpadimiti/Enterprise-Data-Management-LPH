import React from 'react';

const KeyMetric = ({ label, value, trend }) => (
  <div className="key-metric">
    <h2>{label}</h2>
    <p>
      {value}
      {trend === 'up' && <span className="trend-up">↑</span>}
      {trend === 'down' && <span className="trend-down">↓</span>}
    </p>
  </div>
);

const KeyMetrics = ({ data }) => (
  <section className="key-metrics">
    {data.map((metric) => (
      <KeyMetric key={metric.label} {...metric} />
    ))}
  </section>
);

export default KeyMetrics;
