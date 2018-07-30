module.exports = {
  default: {
    deployment: {
      host: "localhost",
      port: 8545,
      type: "rpc"
    },
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545"
    ],
    gas: "auto",
    contracts: {}
  }
};
