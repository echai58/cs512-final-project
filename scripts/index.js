const fs = require('fs')
const MAX_RAND_INT = 10
const GWEI = 1e9
const INCREMENT = 0.1
const DEFAULT_GAS_PRICE = 1.0 * GWEI
const MAX_GAS_PRICE = 5.0 * GWEI
const TESTNET = process.argv[process.argv.length - 1]
const TRIALS = 5

async function writeResult(key, val, gasPrice, time) {
  fs.appendFile(`${TESTNET}-log.txt`, `${key}, ${val}, ${gasPrice / GWEI}, ${time}\n`, err => {
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
      console.log(TESTNET)

      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()
      let gasPrice = DEFAULT_GAS_PRICE;

      while (gasPrice <= MAX_GAS_PRICE) {
        for (let i = 0; i < TRIALS; i++) {
          const key = `key-${gasPrice / GWEI}`
          let start = new Date().getTime() / 1000;
          console.log('Starting transaction...')
          const result = await nameReg.register(key, 
                                                (Math.floor(Math.random() * MAX_RAND_INT).toString()),
                                                { gasPrice: gasPrice })
          console.log(result.receipt)

          const val = await nameReg.read(key)
          let end = new Date().getTime() / 1000;

          console.log(`Value is: ${val}`)
          console.log(`Time taken is: ${end - start}`)

          await writeResult(key, val, gasPrice, end - start)
        
          gasPrice += INCREMENT * GWEI;
        }
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }