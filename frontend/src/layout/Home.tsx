import React from 'react';

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  return (
    <div className="home-page">
      <h2>sono nella home</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
