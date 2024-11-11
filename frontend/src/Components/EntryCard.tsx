import React from 'react';
import './EntryCard.css';
import { EntryModel } from '../EntryModel';

interface EntryCardProps {
  entry: EntryModel;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const hourIn = new Date(entry.hourIn);
  const hourOut = new Date(entry.hourOut);
  const duration = ((hourOut.getTime() - hourIn.getTime()) / (1000 * 60 * 60)).toFixed(2);
  const maxHours = 8;
  const progress = (parseFloat(duration) / maxHours) * 100;

  return (
    <div className="entry-card">
      <div className="entry-header">
        <h2>Today, {hourIn.toLocaleDateString()}</h2>
        <span className="hours">{duration} / {maxHours}.00 h</span>
      </div>
      <div className="entry-details">
        <p>Hour In: {hourIn.toLocaleTimeString()}</p>
        <p>Hour Out: {hourOut.toLocaleTimeString()}</p>
        <p>{entry.location}</p>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%`, backgroundColor: progress >= 100 ? 'red' : 'green' }}></div>
      </div>
    </div>
  );
};

export default EntryCard;