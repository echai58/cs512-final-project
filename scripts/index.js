const TRIALS = 10
const MAX_RAND_INT = 10;
const gwei = 10^9;
const DEFAULT_GAS_PRICE = 1000000000;

// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()
      const gasPrice = DEFAULT_GAS_PRICE;
      while (gasPrice < 100*gwei) {
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
          gasPrice + 10*gwei;
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }