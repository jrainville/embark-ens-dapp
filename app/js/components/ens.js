/*global web3*/
import EmbarkJS from 'Embark/EmbarkJS';
import FIFSRegistrar from 'Embark/contracts/FIFSRegistrar';
import React from 'react';
import { Alert, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

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
      addressRegister: '',
      responseRegister: null,
      isRegisterError: false,
      embarkLogs: []
    };
  }

  componentWillMount() {
    EmbarkJS.onReady(() => {
      this.setState({
        addressRegister: web3.eth.defaultAccount
      })
    });
  }

  handleChange(stateName, e) {
    this.setState({ [stateName]: e.target.value });
  }

  registerSubDomain(e) {
    e.preventDefault();
    const self = this;
    function callback(message, isError) {
      self.setState({
        responseRegister: message,
        isRegisterError: !!isError
      });
    }

    const resolveAddr = this.state.addressRegister || '0x0000000000000000000000000000000000000000';
    const toSend = FIFSRegistrar.methods.register(web3.utils.sha3(this.state.valueRegister), web3.eth.defaultAccount, resolveAddr);

    toSend.estimateGas().then(gasEstimated => {
      return toSend.send({ gas: gasEstimated + 1000 }).then(transaction => {
        if (transaction.status !== "0x1" && transaction.status !== "0x01") {
          console.warn('Failed transaction', transaction);
          return callback('Failed to register. Check gas cost.', true);
        }
        callback(`Successfully registered "${this.state.valueRegister}" with ${transaction.gasUsed} gas`);
      }).catch(err => {
        callback('Failed to register with error: ' + (err.message || err), true);
        console.error(err);
      });
    }).catch(err => {
      callback("Register would error. Is it already registered? Do you have token balance? Is Allowance set? " + (err.message || err), true);
      console.error(err);
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

        <h3>Register subdomain for embark</h3>
        <Form inline>
          <FormGroup>
            {this.state.responseRegister &&
            <Alert className="alert-result" bsStyle={this.state.isRegisterError ? 'danger' : 'success'}>
              <span className="value">{this.state.responseRegister}</span>
            </Alert>}
            <FormControl
              type="text"
              defaultValue={this.state.valueRegister}
              onChange={(e) => this.handleChange('valueRegister', e)}/>
            <FormControl
              type="text"
              defaultValue={this.state.addressRegister}
              onChange={(e) => this.handleChange('addressRegister', e)}/>
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
