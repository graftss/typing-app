import React, { Component } from 'react';
import { Route } from 'react-router';
import './App.css';

import Navbar from '../Navbar';
import TypingTestRoute from '../TypingTestRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Route path="/test" component={TypingTestRoute} />
        </div>
      </div>
    );
  }
}

export default App;
