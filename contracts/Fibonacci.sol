//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Fibonacci {

    event beforeGenerationOfSeries(uint a, uint b,string str);
    event afterGenerationOfSeries(uint[] res,string s);
    

    uint public term1 = 0;
    uint public term2 = 1;
    uint[] public arr;

    function fibonacci(uint noOfTerms) public   returns (uint[] memory){
        emit beforeGenerationOfSeries(term1,term2,"First two terms in fibonacci series!" );
        require(noOfTerms > 2,"Number of terms required is more than two!");
        arr.push(term1);
        arr.push(term2);
        for(uint i = 3; i <= noOfTerms; i++){
            uint sum = term1 + term2 ;
            arr.push(sum);
            term1 = term2;
            term2 = sum;
        }
        emit afterGenerationOfSeries(arr,"Fibonacci Series");
        return arr;
    }


}