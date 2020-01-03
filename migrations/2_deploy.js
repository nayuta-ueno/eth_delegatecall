const callee = artifacts.require("Callee");
const caller = artifacts.require("Caller");

module.exports = function(deployer) {
  deployer.deploy(callee);
  deployer.deploy(caller);
};
