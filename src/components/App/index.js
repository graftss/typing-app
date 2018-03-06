import React, { Component } from 'react';
import './App.css';

import Navbar from '../Navbar';
import TypingTest from '../TypingTest';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="App-content">
          <TypingTest />
        </div>
      </div>
    );
  }
}

export default App;
