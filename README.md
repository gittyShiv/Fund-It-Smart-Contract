
# FUND-IT

FundIt - Decentralized Crowdfunding Smart Contract

[![Contributors](https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge)](https://github.com/github_username/repo_name/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge)](https://github.com/github_username/repo_name/network/members)
[![Stargazers](https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge)](https://github.com/github_username/repo_name/stargazers)
[![Issues](https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge)](https://github.com/github_username/repo_name/issues)
[![License](https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge)](https://github.com/github_username/repo_name/blob/master/LICENSE.txt)

---

## 📖 About The Project

FundIt is a simple decentralized crowdfunding smart contract built with Solidity and Hardhat. It allows users to contribute ETH to the contract, with a minimum USD value enforced using live ETH/USD price data via Chainlink Price Feeds. The contract owner can withdraw the accumulated funds, making it suitable for transparent and trustless fundraising use cases.

### 🚀 Features

- Accepts ETH contributions from anyone  
- Enforces a minimum funding amount in USD (via Chainlink)  
- Stores contributor addresses and amounts  
- Allows only the contract owner to withdraw funds  
- Gas optimized with custom errors and immutable/constant variables  

---

## 🧰 Built With

- Solidity  
- Hardhat  
- Chainlink Price Feeds  
- Ethers.js  
- Mocha & Chai  

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js  
- npm

Install latest npm:
```bash
npm install npm@latest -g
```

### Installation

```bash
git clone https://github.com/xyz......
cd FUND-IT
npm init
npm install --save-dev hardhat
npx hardhat init
```

---

## ⚙️ Usage

### 🚀 Deploy (Local Network with Ignition)

```bash
npx hardhat ignition deploy ignition/modules/FundMeModule.js --network localhost
```

### 🧪 Run Tests

```bash
npx hardhat test
```

### 🧮 Test Coverage

```bash
npx hardhat coverage
```

### ⛽ Estimate Gas

```bash
npx hardhat test
```

> Check the output file `gas-report.txt`.

---

### 💻 Local Deployment (with scripts)

Start a local Hardhat node:

```bash
npx hardhat node
```

In a separate terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🌐 Deployment to Sepolia Testnet

### Set up `.env`

Create a `.env` file and add the following:

```ini
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

> ⚠️ Use test accounts with no real funds.

### Get Sepolia Testnet ETH

Use [https://faucets.chain.link](https://faucets.chain.link) to request test ETH.

### Deploy

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Verify on Etherscan

```bash
npx hardhat ignition verify chain-11155111
```

---

## 🛣️ Roadmap

- [ ] Add frontend DApp integration  
- [ ] Add multiple fundraising goals  
- [ ] Add refund feature for failed campaigns  
- [ ] Add donation history per user  

See [issues](https://github.com/github_username/repo_name/issues) for more.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project  
2. Create your branch:
```bash
git checkout -b feature/AmazingFeature
```
3. Commit your changes:
```bash
git commit -m "Add some AmazingFeature"
```
4. Push to the branch:
```bash
git push origin feature/AmazingFeature
```
5. Open a pull request

---

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## 📬 Contact

**Shivam**  
📧 shivamvision07@gmail.com  
🔗 [Project Repository](https://github.com/github_username/repo_name)
