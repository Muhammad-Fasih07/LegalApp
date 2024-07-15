import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import '../Css/stats.css';

interface Stat {
  icon: string;
  number: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: 'fas fa-file-alt', // Font Awesome icon class for case closed
    number: '1820+',
    label: 'Case Closed'
  },
  {
    icon: 'fas fa-user-tie', // Font Awesome icon class for expert attorneys
    number: '1606+',
    label: 'Expert Lawyers'
  },
  {
    icon: 'fas fa-handshake', // Font Awesome icon class for trusted clients
    number: '2105+',
    label: 'Trusted Clients'
  },
  {
    icon: 'fas fa-trophy', // Font Awesome icon class for successful cases
    number: '1011+',
    label: 'Successful Case'
  },
];

const Statistics: React.FC = () => {
  return (
    <div className="statistics-container">
      {stats.map((stat, index) => (
        <div className="stat" key={index}>
          <i className={`${stat.icon} stat-icon`} aria-hidden="true"></i>
          <div className="stat-number">{stat.number}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
