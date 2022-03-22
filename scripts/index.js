const TRIALS = 3
const MAX_RAND_INT = 10;
const DEFAULT_GAS_PRICE = 1;

// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()

      for(let i = 0; i < TRIALS; i++) {
        const key = `key-${i}`
        const result = await nameReg.register(key, 
                                              (Math.floor(Math.random() * MAX_RAND_INT).toString()))
        console.log(result.receipt)

        const val = await nameReg.read(key)
        console.log(`Value is: ${val}`)
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }