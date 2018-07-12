import EmbarkJS from 'Embark/EmbarkJS';
import FIFSRegistrar from 'Embark/contracts/FIFSRegistrar';
import React from 'react';
import { Alert, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
const hash = require('eth-ens-namehash').hash;

window.EmbarkJS = EmbarkJS;

class ENS extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      valueResolve: 'ethereumfoundation.eth',
      responseResolve: null,
      isResolveError: false,
      valueLookup: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
      responseLookup: null,
      isLookupError: false,
      valueRegister: '',
      responseRegister: null,
      isRegisterError: false,
      embarkLogs: []
    };
  }

  handleChange(stateName, e) {
    this.setState({ [stateName]: e.target.value });
  }

  registerSubDomain(e) {
    e.preventDefault();
    console.log(this.state.valueRegister, hash(this.state.valueRegister));
    const toSend = FIFSRegistrar.methods.register(hash(this.state.valueRegister), web3.eth.defaultAccount);

    toSend.estimateGas().then(gasEstimated => {
      console.log("Register would work. :D Gas estimated: " + gasEstimated);
      return toSend.send({ gas: gasEstimated + 1000 }).then(txId => {
        if (txId.status === "0x1" || txId.status === "0x01") {
          console.log("Register send success. :)");
        } else {
          console.log("Register send errored. :( Out of gas? ");
        }
        console.dir(txId)
      }).catch(err => {
        console.log("Register send errored. :( Out of gas?");
        console.dir(err);
      }).finally(() => {
        console.log('Go');
      });
    }).catch(err => {
      console.log("Register would error. :/ Already Registered? Have Token Balance? Is Allowance set?");
      console.dir(err);
    });
  }

  resolveName(e) {
    e.preventDefault();
    const embarkLogs = this.state.embarkLogs;
    embarkLogs.push(`EmbarkJS.Names.resolve('${this.state.valueResolve}', console.log)`);

    this.setState({
      embarkLogs: embarkLogs
    });
    EmbarkJS.Names.resolve(this.state.valueResolve, (err, result) => {
      if (err) {
        return this.setState({
          responseResolve: err.message || err,
          isResolveError: true
        });
      }
      this.setState({
        responseResolve: result,
        isResolveError: false
      });
    });
  }

  lookupAddress(e) {
    e.preventDefault();
    const embarkLogs = this.state.embarkLogs;
    embarkLogs.push(`EmbarkJS.Names.resolve('${this.state.valueLookup}', console.log)`);

    this.setState({
      embarkLogs: embarkLogs
    });
    EmbarkJS.Names.lookup(this.state.valueLookup, (err, result) => {
      if (err) {
        return this.setState({
          responseLookup: err,
          isLookupError: true
        });
      }
      this.setState({
        responseLookup: result,
        isLookupError: false
      });
    });
  }

  render() {
    return (<React.Fragment>
        <h3>Resolve a name</h3>
        <Form inline>
          <FormGroup>
            {this.state.responseResolve &&
            <Alert className="alert-result" bsStyle={this.state.isResolveError ? 'danger' : 'success'}>
              Resolved address: <span className="value">{this.state.responseResolve}</span>
            </Alert>}
            <FormControl
              type="text"
              defaultValue={this.state.valueResolve}
              onChange={(e) => this.handleChange('valueResolve', e)}/>
            <Button bsStyle="primary" onClick={(e) => this.resolveName(e)}>Resolve name</Button>
          </FormGroup>
        </Form>

        <h3>Lookup an address</h3>
        <Form inline>
          <FormGroup>
            {this.state.responseLookup &&
            <Alert className="alert-result" bsStyle={this.state.isLookupError ? 'danger' : 'success'}>
              Looked up domain: <span className="value">{this.state.responseLookup}</span>
            </Alert>}
            <FormControl
              type="text"
              defaultValue={this.state.valueLookup}
              onChange={(e) => this.handleChange('valueLookup', e)}/>
            <Button bsStyle="primary" onClick={(e) => this.lookupAddress(e)}>Lookup address</Button>
          </FormGroup>
        </Form>

        <h3>Register subdomain</h3>
        <Form inline>
          <FormGroup>
            {this.state.responseRegister &&
            <Alert className="alert-result" bsStyle={this.state.isRegisterError ? 'danger' : 'success'}>
              Looked up domain: <span className="value">{this.state.responseRegister}</span>
            </Alert>}
            <FormControl
              type="text"
              defaultValue={this.state.valueRegister}
              onChange={(e) => this.handleChange('valueRegister', e)}/>
            <Button bsStyle="primary" onClick={(e) => this.registerSubDomain(e)}>Register subdomain</Button>
          </FormGroup>
        </Form>

        <h3>Embark Calls </h3>
        <p>Javascript calls being made: </p>
        <div className="logs">
          {
            this.state.embarkLogs.map((item, i) => <p key={i}>{item}</p>)
          }
        </div>
      </React.Fragment>
    );
  }
}

export default ENS;
