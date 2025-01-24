// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    createAccount(name, initialBalance = 0) {
        this.name = name;
        const account = new Account(name, initialBalance);
        return account;
    }
    // Example: createAccount(name, initialDeposit)

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    deposit(amount){
        
        if (amount <= 0){
            throw new Error ('Deposit amount must be greater than zero');
        }

        this.balance += amount;

        const transaction = { transactionType: 'Deposit', amount: amount};
        this.transactionHistory.push(transaction);

        return transaction;
    }
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    // Example: withdraw(amount)
    withdraw(amount){
        
        if (amount <= 0){
            throw new Error ('Withdraw amount must be greater than zero');
        }

        this.balance -= amount;

        const transaction = { transactionType: 'Withdrawal', amount: amount};
        this.transactionHistory.push(transaction);

        return transaction;
    }
    // example data to be stored in transactionHistory { transactionType: 'Withdrawal', amount: 200 }

    // Example: transfer(amount, recipientAccount)
    transfer(amount, recipientAccount){
        
        if (amount <= 0){
            throw new Error ('Transfer amnount must be greater than zero');
        }
        if (this.balance < amount){
            throw new Error ('Insufficient funds for transfer');
        }

        this.balance -= amount;
        recipientAccount.balance += amount;

        const accountSending = { transactionType: 'Transfer', amount: amount, to: recipientAccount.name };
        this.transactionHistory.push(accountSending);

        const accountRecieving = { transactionType: 'Received', amount: amount, from: this.name };
        recipientAccount.transactionHistory.push(accountRecieving);
    }

    // example data to be stored in transactionHistory:
    // for account sending { transactionType: 'Transfer', amount: 300, to: recipientName }
    // for account recieving { transactionType: 'Received', amount: 300, from: senderName }
    
    // Example: checkBalance()
    checkBalance(){
        return this.balance;
    }
}

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
