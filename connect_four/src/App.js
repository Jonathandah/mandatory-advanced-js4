import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      player: "red",
      field: {},
    }

  }

  onClick(){

  }

  render() {
    return (
      <div className="App">
        <main className="App__main">
          <div className="App__main__field">
            
          </div>
        </main>
      </div>
    );
  }
}

export default App;
