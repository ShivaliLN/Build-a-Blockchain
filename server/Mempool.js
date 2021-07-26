const Block = require('./Block');
const db = require('./db');
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];
let mining = false;

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction);
    console.log("MP: " + mempool.length)
}

function getMempoolHeight(){
//console.log("MP1: " + mempool.length)
return (mempool.length);
}


function startMining(pubKeyBal) {
  mining = true;
  mine(pubKeyBal);
}

function stopMining() {
  mining = false;
}

function mine(pubKeyBal) {
    if(!mining) return;	

    console.log("Inside Mine")
    // TODO: mine a block
    const block = new Block();
   
    for (let i = 0; i < MAX_TRANSACTIONS;i++){
	block.addTransactions(mempool.pop());
        //block.transactions.push();
        if(mempool.length == 0){
            break;
        }
    }
	
    console.log("#txs added to block:" + block.transactions.length)

  while(BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
    block.nonce++;
  }
  //console.log("Before")
  //console.log(pubKeyBal)
  for(let i=0;i<block.transactions.length;i++){
	const minedTx = block.transactions[i]
        //console.log(minedTx)
	pubKeyBal[minedTx["sender"]] -= minedTx["amount"];	
	pubKeyBal[minedTx["recipient"]] = (pubKeyBal[minedTx["recipient"]] || 0) + +minedTx["amount"];
        //console.log("After")
        //console.log(pubKeyBal)
  }
  	
  db.blockchain.addBlock(block);

  console.log(`Mined block #${db.blockchain.chainHeight()} with a hash of ${block.hash()} at nonce ${block.nonce}`);


}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool, 
    getMempoolHeight,
    startMining,
};