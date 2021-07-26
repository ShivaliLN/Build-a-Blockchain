Project - Build a blockchain with PoW and Cryptography concepts

Steps:
1. Upon server start generate Public Key and Private Key for three accounts which are associated with some default balances.
2. From the client UI - Initiate a transaction to trasfer amount from Account A to Account B providing the Account A's private key.
3. Authenticate the transaction using 'Elliptic' signature and if verified add the transaction to the Mempool
4. Unverified transactions are not added to the Mempool
5. There is a UI button to get the number of TXs in the Mempool at any given time - 'Get count of Mempool transactions'
6. Once transactions are added to the Mempool, click on **'Start Mining'** button
7. This will initiate the mining process where following occurs:
    a. A new block is created
    b. Transactions are added from Mempool into the block
    c. Block is mined by incrementing the nonce to satisfy the target difficulty
    d. Once block is mined, transactions in the block are executed
    e. Block is added to the blockchain
8. **'Stop Mining**, just stops the Mining process, you can add transactions to the mempool and check the count. The count should not change to 0 (i.e. Transactions should not be executed)
