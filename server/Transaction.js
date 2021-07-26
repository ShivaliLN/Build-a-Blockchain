class Transaction {
    constructor(sender, recipient, amount, privateKey) {
        this.sender = sender;
	this.recipient = recipient;
	this.amount = amount;
	this.privateKey = privateKey;
    }
}
module.exports = Transaction;