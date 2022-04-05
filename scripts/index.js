const fs = require('fs')
const MAX_RAND_INT = 10
const GWEI = 1e9
const INCREMENT = 1.0
const DEFAULT_GAS_PRICE = 60.0 * GWEI
const MAX_GAS_PRICE = 100.0 * GWEI
const TESTNET = process.argv[process.argv.length - 1]
const TEST = process.argv[process.argv.length - 2]
const TRIALS = 5
const GAS_LIMIT_INCREMENT = 1000
const DEFAULT_GAS_LIMIT_PRICE = 71000
const MAX_GAS_LIMIT_PRICE = 91000


async function writeResult(key, val, gasPrice, time) {

  fs.appendFile(`${TESTNET}-log.txt`, `${key}, ${val}, ${TEST === 'gas' ? gasPrice / GWEI : gasPrice}, ${time}\n`, err => {
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

      if (TEST === 'gas'){
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
          }
          gasPrice += INCREMENT * GWEI;
        }
      }
      else if (TEST === 'limit'){
        let limit = DEFAULT_GAS_LIMIT_PRICE;

        while (limit <= MAX_GAS_LIMIT_PRICE) {
          for (let i = 0; i < TRIALS; i++) {
            const key = `key-${limit}`
            let start = new Date().getTime() / 1000;
            console.log('Starting transaction...')
            const result = await nameReg.register(key, 
                                                  (Math.floor(Math.random() * MAX_RAND_INT).toString()),
                                                  )
            console.log(result.receipt)

            const val = await nameReg.read(key)
            let end = new Date().getTime() / 1000;

            console.log(`Value is: ${val}`)
            console.log(`Time taken is: ${end - start}`)

            await writeResult(key, val, limit, end - start)
          }
          limit += GAS_LIMIT_INCREMENT;
        }
      }
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  }