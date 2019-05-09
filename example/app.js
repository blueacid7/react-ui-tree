// import '../lib/react-ui-tree.css';
import './theme.css';
import './app.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppBarHeader from './AppBarHeader';
import SimpleTabs from './SimpleTabs';
import WysiwygEditor from './WysiwygEditor';

class App extends Component {
  state = {
    showNavBar: true
  };

  render() {
    return (
      <div className="app">
        <AppBarHeader toggleNavbar={() => this.setState({showNavBar: !this.state.showNavBar})} />
        {this.state.showNavBar && <SimpleTabs style={{maginTop: '100px'}} />}
        <div>
          <div className="inspector">
            <WysiwygEditor />
          </div>
        </div>
      </div>
    );
  }

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

}

ReactDOM.render(<App />, document.getElementById('app'));
