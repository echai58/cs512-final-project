const TRIALS = 10
const MAX_RAND_INT = 10;
const gwei = 10e9;
const DEFAULT_GAS_PRICE = gwei/2;

// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()
      let gasPrice = DEFAULT_GAS_PRICE;
      console.log(gwei)
      while (gasPrice < 10*gwei) {
          const key = `key-${gasPrice/gwei}`
          var start = new Date().getTime() / 1000;
          const result = await nameReg.register(key, 
                                                (Math.floor(Math.random() * MAX_RAND_INT).toString()),
                                                { gasPrice: gasPrice })
          console.log(result.receipt)
          const val = await nameReg.read(key)
          var end = new Date().getTime() / 1000;
          console.log(`Value is: ${val}`)
          console.log(`Time taken is: ${end - start}`)
          gasPrice += gwei/2;
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }