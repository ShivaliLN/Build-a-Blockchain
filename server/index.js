const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const sv = require('./signverify');
const Transaction = require('./Transaction');
const {addTransaction, getMempoolHeight, startMining} = require('./Mempool');


// 07182021 SS - import elliptic library
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Challenge 2 include SHA256 library
const SHA256 = require('crypto-js/sha256');

// 07182021 SS - declare and initialize key as array
const key = [];
const pubKeyBal = {};

// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}

// 07182021 SS - for all key-values pair in balances generate key and display on console
console.log("Available Accounts");
console.log("------------------");

let count = 0;
let pubAddress = "";
for (let acctAdd in balances){
key[count] = ec.genKeyPair();
pubAddress = key[count].getPublic().encode('hex').toString().slice(-40)
//console.log(pubAddress)
//console.log("(" + acctAdd + ") "  + key[count].getPublic().encode('hex') + " (" + balances[acctAdd] + ")" ) 
console.log("(" + acctAdd + ") "  + key[count].getPublic().encode('hex').toString().slice(-40) + " (" + balances[acctAdd] + ")" ) 
pubKeyBal[pubAddress] = balances[acctAdd]
count++
}

/*
for (let pubKeyy in pubKeyBal) {
console.log(pubKeyBal[pubKeyy])
}
*/

console.log("Private Keys");
console.log("------------------");
count = 0;
for (let acctAdd in balances){
console.log("(" + acctAdd + ") "  + key[count].getPrivate().toString(16)) 
count++
}

//console.log("# of Accounts :" + count)

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  //console.log("Address :" + address)
  //const balance = balances[address] || 0;
  const balance = pubKeyBal[address] || 0;
  res.send({ balance });
});


app.get('/mempoolHeight', (req, res) => {
  //console.log('In here')
  const memcount = getMempoolHeight() || 0;
  //console.log('memcount' + memcount)
  res.send({ memcount });
});



app.post('/send', (req, res) => {
  const {sender, recipient, amount, privateKey} = req.body;
	
count = 0;  
for (let pubAdd in pubKeyBal){
if(pubAdd == sender){
		publicKey = key[count].getPublic().encode('hex')
		//console.log('publicKey : ' + publicKey );
	break;
	}else {
		count++;
	} 
}

if (sv.signVerify(privateKey, publicKey)){
const TX = new Transaction(sender, recipient, amount, privateKey);
  console.log(TX);
  addTransaction(TX);
  console.log("Message Verified");
  res.send({ message: "Transaction added to the mempool" });
}else {
	console.log("Message authentication failed");
	res.send({ message: "Transaction authentication failed" });
}    
});



app.get('/startMining', (req, res) => {
  startMining(pubKeyBal);
  res.send({ message: "Mining Started" });
});

app.get('/stopMining', (req, res) => {
  res.send({ message: "Mining Stoped" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
