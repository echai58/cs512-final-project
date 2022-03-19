const nameRegistry = artifacts.require('nameRegistry');

module.exports = async function (deployer) {
    await deployer.deploy(nameRegistry);
};