const { ethers } = require("hardhat");
const { expect, assert } = require("chai");
const provider = ethers.provider;
const sendValue = ethers.parseEther("0.03");

describe("FundMe", function () {
    let fundMe;
    let mockPriceFeed;
    let deployer;

    beforeEach(async function () {
        [deployer] = await ethers.getSigners();

        const MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
        mockPriceFeed = await MockV3Aggregator.deploy(8, "200000000000"); // 1 ETH = $2000

        const FundMe = await ethers.getContractFactory("FundMe");
        fundMe = await FundMe.deploy(mockPriceFeed.target);
    });

    // Constructor Test
    describe("construct", function () {
        it("sets the aggregator address correctly", async function () {
            const response = await fundMe.getPriceFeedAddress();
            assert.equal(response, mockPriceFeed.target);
        });
    });

    //  fund() Tests
    describe("fund", function () {
        it("Fails if you don't send enough ETH", async function () {
            await expect(
                fundMe.fund({ value: ethers.parseEther("0.001") }) // < $50
            ).to.be.revertedWithCustomError(fundMe, "FundMe__NotEnoughFund");
        });

        it("Updates the amount funded data structure", async function () {
            await fundMe.fund({ value: sendValue });

            const response = await fundMe.s_addressToAmountFunded(deployer.address);
            assert.equal(response.toString(), sendValue.toString());
        });

        it("Adds funder to funders array", async function () {
            await fundMe.fund({ value: sendValue });

            const funder = await fundMe.s_funders(0);
            assert.equal(funder, deployer.address);
        });
    });
    describe("withdraw",function(){
      beforeEach(async function(){
        await fundMe.fund({value: sendValue});
      });
      it("Withdraw ETH from single founder",async function(){
        // Arrange
        const startingFundMeBalance = await provider.getBalance(fundMe.target);
        const startingDeployerBalance = await provider.getBalance(deployer.address);
        // Act
        const txResponse = await fundMe.withdraw();
        const txReceipt = await txResponse.wait(1);
        const gasUsed = txReceipt.gasUsed;
        const gasPrice = txReceipt.gasPrice;
        const gasCost = gasUsed * gasPrice;

        const endingFundmeBalance = await provider.getBalance(fundMe.target);
        const endingDeployerBalance = await provider.getBalance(deployer.address);
        //check
        assert.equal(endingFundmeBalance.toString(),"0");
        assert.equal((startingFundMeBalance+startingDeployerBalance-gasCost).toString(),
        endingDeployerBalance.toString());
      })

      it("Allows use to withdraw with multiple funders",async function(){
        //Arrange
        const accounts = await ethers.getSigners();
        for(let i=1;i<6;i++){
            const fundMeConnectedContract = await fundMe.connect(accounts[i]);//connect allfunders not deployer
            await fundMeConnectedContract.fund({value:sendValue}); //sending money by multiple funders
        }
        const startingFundMeBalance = await provider.getBalance(fundMe.target);
        const startingDeployerBalance = await provider.getBalance(deployer.address);

        //Act
        const txResponse = await fundMe.withdraw();
        const txReceipt = await txResponse.wait(1);
        const gasUsed = txReceipt.gasUsed;
        const gasPrice = txReceipt.gasPrice;
        const gasCost = gasUsed * gasPrice;

        const endingFundmeBalance = await provider.getBalance(fundMe.target);
        const endingDeployerBalance = await provider.getBalance(deployer.address);

        //Check
        assert.equal(endingFundmeBalance.toString(),"0");
        assert.equal((startingFundMeBalance+startingDeployerBalance-gasCost).toString(),
        endingDeployerBalance.toString());

        //make sure funders are reset properly
        await expect(fundMe.s_funders(0)).to.be.reverted;//this ensures funders array is empty
        for(let i=1;i<6;i++){
            assert.equal(await fundMe.s_addressToAmountFunded(accounts[i].address),0);
        }

      })
      it("Only allows owner to withdraw",async function(){
        const accounts = await ethers.getSigners();
        const attacker = accounts[1]; // attacker account object 
        const attackerConnectedContract = await fundMe.connect(attacker);//attacker object is added to contract,new connected contract is made
        await expect(attackerConnectedContract.withdraw()).to.be.reverted;
        })
    })
});
