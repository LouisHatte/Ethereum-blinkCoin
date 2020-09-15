pragma solidity 0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Token {

    using SafeMath for uint;

    string public name = "Blink Token";
    string public symbol = "BLINK";
    uint256 public eth_coefficient = 16;
    mapping(address => uint256) public balanceOf;

    event WithdrawBlink(address user, uint256 value);
    event DepositBlink(address user, uint256 value);
    event TransferBlink(address from, address to, uint256 value);

    function getBalance(address addr) public view returns (uint256) {
        return address(addr).balance;
    }

    function withdrawBlink() public payable returns (bool) {
        require(msg.value <= getBalance(msg.sender), "user must have enough eth");

        balanceOf[msg.sender] = balanceOf[msg.sender].add(msg.value.div(10 ** eth_coefficient));

        emit WithdrawBlink(msg.sender, msg.value);
        return true;
    }

    function depositBlink(uint256 _value) public payable returns (bool) {
        require(balanceOf[msg.sender] >= _value, "user must have enough blk");

        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        msg.sender.transfer(_value.mul(10 ** eth_coefficient));

        emit DepositBlink(msg.sender, _value);
        return true;
    }

    function transferBlink(address _to, uint256 _value) public returns (bool) {
        require(balanceOf[msg.sender] >= _value, "user must have enough blk");

        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);

        emit TransferBlink(msg.sender, _to, _value);
        return true;
    }
}
