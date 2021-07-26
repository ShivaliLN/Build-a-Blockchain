const Block = require('./Block');
const db = require('./db');
const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction);
    console.log("MP: " + mempool.length)
}

function getMempoolHeight(){
//console.log("MP1: " + mempool.length)
return (mempool.length);
}


function mine() {
    // TODO: mine a block
    const block = {
        id:blocks.length,
        transactions:[],
        nonce:0
    }

    for (let i = 0; i < MAX_TRANSACTIONS;i++){
        block.transactions.push(mempool.pop());
        if(mempool.length == 0){
            break;
        }
    }
    
    let blockHash;

    while(true){
        blockHash = SHA256(JSON.stringify(block));
        if (BigInt(`0x${blockHash}`) > TARGET_DIFFICULTY ){
            block.nonce++
        }
        else{
            break;
        }
    }

    block.hash = blockHash;
    blocks.push(block)
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool, 
    getMempoolHeight
};