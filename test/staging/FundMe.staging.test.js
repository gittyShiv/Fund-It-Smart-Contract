// const { expect } = require("chai");
// const { ethers, network } = require("hardhat");

// describe("FundMe Staging Tests", function () {
//     let fundMe;
//     let deployer;
//     const sendValue = ethers.parseEther("0.05");

//     beforeEach(async function () {
//         deployer = (await ethers.getSigners())[0];
//         fundMe = await ethers.getContract("FundMe", deployer);
//     });

//     it("Allows funding and withdrawal on live network", async function () {
//         const txResponse = await fundMe.fund({ value: sendValue });
//         await txResponse.wait(1);

//         const amountFunded = await fundMe.s_addressToAmountFunded(deployer.address);
//         expect(amountFunded.toString()).to.equal(sendValue.toString());

//         const txWithdraw = await fundMe.withdraw();
//         await txWithdraw.wait(1);

//         const postWithdraw = await fundMe.s_addressToAmountFunded(deployer.address);
//         expect(postWithdraw.toString()).to.equal("0");
//     });
// });
