
const hre = require("hardhat");

async function main() { 
  const EventTest = await hre.ethers.getContractFactory("Fibonacci");
  const eventTest = await EventTest.deploy();


  await eventTest.deployed();

  eventTest.on("beforeGenerationOfSeries", (term1, term2,str) => {
    console.log(`${str} : ${term1} ${term2} `);
  })

  eventTest.on("afterGenerationOfSeries", (res,s) => {
    console.log(`${s}  : ${res}`);
  })

  console.log(
    `Contract deployed to ${eventTest.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});