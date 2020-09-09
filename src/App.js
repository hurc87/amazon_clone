import React from 'react';
import './App.css';
import Header from './Header.js';

function App() {
  return (
    // BEM convention - changing classname from App to app
    <div className="app">
      <Header />
      {/* Home component */}
    </div>
  );
}

export default App;
