// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry');
      const nameReg = await NameRegistry.deployed();

      let val = await nameReg.read('foo');
      console.log('Value is: ' + val);

      await nameReg.register('foo', 'bar2');
      
      val = await nameReg.read('foo');
      console.log('Value is: ' + val);
  
      callback(0);
    } catch (error) {
      console.error(error);
      callback(1);
    }
  };