const fs = require('fs')
const MAX_RAND_INT = 10
const GWEI = 10e9
const INCREMENT = 0.25
const DEFAULT_GAS_PRICE = GWEI
const MAX_GAS_PRICE = 2 * GWEI
const TESTNET = 'Rinkeby'

async function writeResult(testnet, key, val, gasPrice, time) {
  fs.appendFile(`${testnet}-log.txt`, `${key}, ${val}, ${gasPrice / GWEI}, ${time}\n`, err => {
    if(err) {
      console.log(err)
      return
    }

    console.log('Logged!')
  })
}

// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()
      let gasPrice = DEFAULT_GAS_PRICE;

      while (gasPrice <= MAX_GAS_PRICE) {
          const key = `key-${gasPrice / GWEI}`
          var start = new Date().getTime() / 1000;

          console.log('Starting transaction...')
          const result = await nameReg.register(key, 
                                                (Math.floor(Math.random() * MAX_RAND_INT).toString()),
                                                { gasPrice: gasPrice })
          console.log(result.receipt)

          const val = await nameReg.read(key)
          var end = new Date().getTime() / 1000;

          console.log(`Value is: ${val}`)
          console.log(`Time taken is: ${end - start}`)

          await writeResult(TESTNET, key, val, gasPrice, end - start)
        
          gasPrice += INCREMENT * GWEI;
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }