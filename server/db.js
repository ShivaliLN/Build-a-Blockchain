const Blockchain = require('./Blockchain');

const db = {
  blockchain: new Blockchain()  
}

module.exports = db;
