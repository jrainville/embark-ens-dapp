module.exports = {
  default: {
    enabled: true,
    available_providers: ["ens"],
    provider: "ens",
    register: {
      rootDomain: "embark.eth",
      subdomains: {
        'jonathan': '0x4a17f35f0a9927fb4141aa91cbbc72c1b31598de',
        'iuri': '0x1a2f3b98e434c02363f3dac3174af93c1d690914'
      }
    }
  }
};
