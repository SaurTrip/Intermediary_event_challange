//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract GlobalFunctions {

    event AmountFundedBy(address adressOfFunder,uint amountFundedByFunder, string str);
    event AccountBalanceUpdated(address contract_Address,uint amount_recieved_by_contract);
    event AmountWithdrawn(address _fromAccount,uint amount);
    event ShowBalance(address account,uint balance);

    mapping(address => uint) public addressToAmountFunding;
    address private owner;

    constructor() payable {
        owner = msg.sender;
    }

   function deposit() public payable {

        addressToAmountFunding[owner] += msg.value;
        emit AmountFundedBy(owner, addressToAmountFunding[owner], "Amount deposited");

   }

    function withdraw() public payable {
        addressToAmountFunding[owner] -= msg.value;
        emit AmountWithdrawn(owner, msg.value);
    }

    function getBalance(address _account) public  returns(uint) { 
        emit ShowBalance(_account, addressToAmountFunding[_account]);
        return addressToAmountFunding[owner];
    }



}