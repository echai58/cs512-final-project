const TRIALS = 5
const MAX_RAND_INT = 10;
// scripts/index.js
module.exports = async function main (callback) {
    try {
      // Functionality here
      const NameRegistry = artifacts.require('nameRegistry')
      const nameReg = await NameRegistry.deployed()

      // let val = await nameReg.read('foo');
      // console.log('Value is: ' + val);

      // await nameReg.register('foo', 'bar2');
      
      // val = await nameReg.read('foo');
      // console.log('Value is: ' + val);

      for(let i = 0; i < TRIALS; i++) {
        const key = `key-${i}`
        const result = await nameReg.register(key, (Math.floor(Math.random() * MAX_RAND_INT).toString()))
        console.log(result.receipt)

        const val = await nameReg.read(key)
        console.log(`Value is: ${val}`)
      }
  
      callback(0)
    } catch (error) {
      console.error(error)
      callback(1)
    }
  };