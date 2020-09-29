import React, { Component } from 'react';
import './App.css';

import GameBoard from './Components/GameBoard/GameBoard';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>Path Finders</header>
        <GameBoard />
      </div>
    );
  }
}

export default App;
