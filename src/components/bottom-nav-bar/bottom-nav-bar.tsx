import { CircleUserRound, House, Search, Settings } from 'lucide-react';
import React from 'react';
import './bottom-nav-bar.scss';

export const BottomNavBar: React.FC = () => {
  return (
    <div className="bottom-nav-bar">
      <button className="nav-item">
        <House size={24} />
      </button>
      <button className="nav-item">
        <Search size={24} />
      </button>
      <button className="nav-item">
        <CircleUserRound size={24} />
      </button>
      <button className="nav-item">
        <Settings size={24} />
      </button>
    </div>
  );
};
