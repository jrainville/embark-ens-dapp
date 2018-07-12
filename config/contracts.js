// const namehash = require('eth-ens-namehash');
// const namesConfig = embark.config.namesystemConfig;
// const registration = namesConfig.register;
// let rootNode = namehash.hash(registration.rootDomain);

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
      // "ws://localhost:8546",
      "http://localhost:8545"
    ],
    gas: "auto",
    contracts: {
      /*"ENSRegistry": {
        "deploy": true,
        "args": []
      },
      "FIFSRegistrar": {
        "deploy": true,
        "args": ["$ENSRegistry", rootNode],
        "onDeploy": ["ENSRegistry.methods.setOwner(0, FIFSRegistrar.options.address).send()"]
      }*/
    }
  },
  /*"ropsten": {
    "contracts": {
      "ENSRegistry": {
        "address": "0x112234455c3a32fd11230c42e7bccd4a84e02010"
      },
      "FIFSRegistrar": {
        "deploy": false
      }
    }
  },
  "rinkeby": {
    "contracts": {
      "ENSRegistry": {
        "address": "0xe7410170f87102DF0055eB195163A03B7F2Bff4A"
      },
      "FIFSRegistrar": {
        "deploy": false
      }
    }
  },
  "livenet": {
    "contracts": {
      "ENSRegistry": {
        "address": "0x314159265dd8dbb310642f98f50c066173c1259b"
      },
      "FIFSRegistrar": {
        "deploy": false
      }
    }
  }*/
};
