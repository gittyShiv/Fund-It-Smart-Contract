import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";
import { abi,contractAddress } from "./constants.js"
// import { showStatusBar, hideStatusBar } from './ui.js';


const messageDivone = document.getElementById("fund-message");
const messageDivtwo = document.getElementById("withdraw-message");

function showMessageone(text, color = "#00ffa5") {
    messageDivone.innerText = text;
    messageDivone.style.color = color;
    messageDivone.classList.remove("hidden");
    messageDivone.classList.add("visible");

    setTimeout(() => {
        messageDivone.classList.remove("visible");
        messageDivone.classList.add("hidden");
    }, 4000);
}

function showMessagetwo(text, color = "#00ffa5") {
    messageDivtwo.innerText = text;
    messageDivtwo.style.color = color;
    messageDivtwo.classList.remove("hidden");
    messageDivtwo.classList.add("visible");

    setTimeout(() => {
        messageDivtwo.classList.remove("visible");
        messageDivtwo.classList.add("hidden");
    }, 4000);
}

const connectBtn = document.getElementById("connect-btn");
const fundBtn = document.getElementById("fund-btn");
const getBalanceBtn = document.getElementById("getBalance-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
connectBtn.onclick = connect;
fundBtn.onclick = fund;
getBalanceBtn.onclick = getBalance;
withdrawBtn.onclick = withdraw;
//connect
async function connect(){
    if(typeof window.ethereum !== "undefined"){
        await window.ethereum.request({method: "eth_requestAccounts"});
        connectBtn.innerHTML = "Connected";
    }
    else{
        connectBtn.innerHTML = "please install metamask";
    }
}
// fund 
async function fund(){
    let ethAmount = document.getElementById("ethAmount").value;
    console.log(`funding with ${ethAmount}....`);
    if(typeof window.ethereum !== "undefined"){
       const provider = new ethers.providers.Web3Provider(window.ethereum);// provider/connection to blockchain// signer / person who is funding/wallet
       const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,abi,signer);// contract we are interacting with// ABI and contractAddress
        try{
            const txResponse = await contract.fund({value:ethers.utils.parseEther(ethAmount)});
            // showStatusBar("⛏️ Mining transaction...");
            // wait for tx
            await listenForTransactionMine(txResponse, provider);
            showMessageone(`✅ Funded ${ethAmount} ETH`);
            document.getElementById("ethAmount").value = "";
            // hideStatusBar();
            console.log("DONE TRANSATION COMPLETED")
        }
        catch(e){
            console.log(e);
            showMessageone("❌ Funding failed", "#ff6b6b");
            document.getElementById("ethAmount").value = "";
        }
    }
    else{
        document.getElementById("connect-btn").innerHTML = "please install metamask";
    }
}

// getbalance
async function getBalance() {
    const display = document.getElementById("balance-display");
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            const balance = await provider.getBalance(contractAddress);
            const ethBalance = ethers.utils.formatEther(balance);
            display.innerText = `💰 Balance: ${ethBalance} ETH`;
            display.classList.remove("hidden");
            display.classList.add("visible");
        } catch (e) {
            display.innerText = "⚠️ Failed to fetch balance";
            display.style.color = "#ff6b6b";
            display.classList.remove("hidden");
            display.classList.add("visible");
        }
    }
}
//withdraw
async function withdraw(){
        if(typeof window.ethereum !== "undefined"){
        console.log(`Withdrawing....`)
        const provider = new ethers.providers.Web3Provider(window.ethereum);   
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,abi,signer);
        try{
            const txResponse = await contract.withdraw();
            // showStatusBar("⛏️ Mining transaction...");
            // wait for tx
            await listenForTransactionMine(txResponse, provider);
            showMessagetwo("💸 Withdrawal complete");
            // hideStatusBar();
            console.log("Amount is Withdrawl");
        }
        catch(e){
            console.log(`this is the ${e}`);
            showMessagetwo("❌ Withdraw failed", "#ff6b6b");
        }
    }
}
//listening
function listenForTransactionMine(txResponse, provider) {
    console.log(`Mining ${txResponse.hash}...`);

    return new Promise((resolve, reject) => {
        provider.once(txResponse.hash, (txReceipt) => {
            console.log(`Completed with ${txReceipt.confirmations} confirmations`);
            console.log(txReceipt);
            resolve(); // resolve the Promise after mined
        });
    });
}