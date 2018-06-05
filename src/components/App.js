import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from './Navbar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Navbar />
          <div className="container">
            <Search />          
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
