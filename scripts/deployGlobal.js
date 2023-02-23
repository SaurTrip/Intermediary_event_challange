
const hre = require("hardhat");
const hardhatConfig = require("../hardhat.config");


async function main() { 
const [theDefaultDeployer, acc1] = await ethers.getSigners();
const amountDeposited = hre.ethers.utils.parseEther("500");
const amountWithdrawn = hre.ethers.utils.parseEther("29");
const GlobalTest = await hre.ethers.getContractFactory("GlobalFunctions");
const globalTest = await GlobalTest.connect(acc1).deploy();
await globalTest.deployed();

await globalTest.deposit({value:amountDeposited});
await globalTest.withdraw({value:amountWithdrawn})
const bal = await globalTest.getBalance(acc1.address)

globalTest.on("AmountFundedBy", (adressOfFunder,amountFundedByFunder,str) => {
    console.log(`${str} : ${adressOfFunder} => ${amountFundedByFunder}`);
})

globalTest.on("AmountWithdrawn", (_fromAccount,amount) => {
    console.log(`Amount withdrawn by  ${_fromAccount} : ${amount}`);
})

globalTest.on("ShowBalance", (account,balance) => {
    console.log(`Balance in  ${account} : ${balance}`);
})


  console.log(
    `Contract deployed to ${globalTest.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
