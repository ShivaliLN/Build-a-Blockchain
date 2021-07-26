class Blockchain {
    constructor() {
        this.chain = [];
    }
addBlock(block){      
        this.chain.push(block);
    }
chainHeight() {
    return this.chain.length;
  }
}

module.exports = Blockchain;