import React from 'react';
import ReactDOM from 'react-dom';

import ENS from './components/ens';

import '../css/dapp.css';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<div><h3>Embark - Usage Example</h3>
      <ENS/>
    </div>);
  }
}

ReactDOM.render(<App></App>, document.getElementById('app'));
