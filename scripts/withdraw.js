//manuel funding by deployer
async function main() {
    const [deployer] = await ethers.getSigners();
    
    // Replace with your real deployed address from .ignition/deployments/
    const fundMeAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

    const FundMe = await ethers.getContractFactory("FundMe", deployer);
    const fundMe = FundMe.attach(fundMeAddress);

    console.log("Withdrawing...");
    const txResponse = await fundMe.withdraw();
    await txResponse.wait(1);
    console.log("Withdrawed!");
}


main()
    .then(()=>process.exit(0))
    .catch((error)=>{
        console.error(error);
        process.exit(1);
    })