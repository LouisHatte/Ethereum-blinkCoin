# Blink Smart Contract Documentation
In this Readme, we are going to see how our smart contracts are working, by detailing the process of each function and the different variables.

## Token.sol
```
	string public name = "Blink Token"
```
> It is how we define the name of the *Blink* token.

```
	string public symbol = "BLINK"
```
> It is how we define the symbol of the *Blink* token.

```
	uint256 public eth_coeeficient = 16
```
>  This variable help us to convert ether into blinkcoin.

---

### getBalance(address addr) public  view  returns (uint256)

#### Description
The goal of this function is to return the amout of BLINK at a specific address.

#### Parameters
```
	address addr : This is the address of a wallet
```

#### Return value
This function return a uint256, that contain the amount of the wallet at a specific address in wei.

---
### withdrawBlink() public  payable  returns (bool)

#### Description
The goal of this function is to buy some BLINK with some Ether.

#### Parameters
```
	msg.sender: This is the address of the user that want to buy some BLINK
	msg.value: This is the amount of ether the user will pay in wei
```

#### Return value
This function return a boolean that state the success of the process. If it return false, it means that the process failed, and true means that nothing went wrong.

---

### depositBlink(uint256 _value) public  payable  returns (bool)

#### Description
The goal of this function is to change some BLINK to some Ether.

#### Parameters
```
	uint256 _value : This is the number of selling BLINK
	msg.sender: This is the address of the user that want to sell some BLINK
```

#### Return value
This function return a boolean that state the success of the process. If it return false, it means that the process failed, and true means that nothing went wrong.

---

### transferBlink(address _to,  uint256 _value) public  returns (bool)
The goal of this function is to transfert some BLINK from an account to another one.

#### Parameters
```
	address _to : This is the address of the receiver
	uint256 _value : This is te number of BLINK to transfert
```

#### Return value
This function return a boolean that state the success of the process. If it return false, it means that the process failed, and true means that nothing went wrong.
