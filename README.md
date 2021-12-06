# 🏗 scaffold-eth - 🎫 User-designed Loogie NFT

> (Custom designed Loogie NFT minting example...)

Loogie NFTs are paid for by users when they are minted. Color, chubbiness and a short message can be edited by the user via an interactive preview.

---

## 🏃‍♀️ Quick Start

required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)


```bash
git clone https://github.com/austintgriffith/scaffold-eth.git custom-loogie-nft

cd custom-loogie-nft

git checkout custom-loogie-nft
```

```bash

yarn install

```

```bash

yarn start

```

> in a second terminal window:

```bash
cd custom-loogie-nft
yarn chain

```

---



> in a third terminal window:


```bash
cd custom-loogie-nft

yarn deploy

```

📱 Open http://localhost:3000 to see the app

---

💦 Use the faucet wallet icon in the bottom left of the frontend to give your address **$1000** in testnet ETH.

🎫 Design and Mint a Loogie NFT:

![Screenshot 2021-12-06 at 20 13 08](https://user-images.githubusercontent.com/32189942/144900844-3961842e-6f06-488c-b8e4-596ea25fe32d.png)


👛 Open an *incognito* window and navigate to http://localhost:3000 (You'll notice it has a new wallet address).

⛽️ Grab some gas for each account using the faucet:

![image](https://user-images.githubusercontent.com/2653167/109543971-35b10f00-7a84-11eb-832e-36d6b66afbe7.png)

🎟 Send an NFT to the *incognito* window just to make sure it works.

---

🕵🏻‍♂️ Inspect the `Debug Contracts` tab to figure out what address is the `owner` of `YourCollectible`?

💼 Edit your deployment script `deploy.js` in `packages/hardhat/scripts`

---

🔏 Edit your smart contract `YourCollectible.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`


🔑 Create wallet links to your app with `yarn wallet` and `yarn fundedwallet`

⬇️ Installing a new package to your frontend? You need to `cd packages/react-app` and then `yarn add PACKAGE`

## 📡 Deploy NFT smart contract!

🛰 Ready to deploy to a testnet?

> Change the `defaultNetwork` in `packages/hardhat/hardhat.config.js`

![image](https://user-images.githubusercontent.com/2653167/109538427-4d38c980-7a7d-11eb-878b-b59b6d316014.png)

🔐 Generate a deploy account with `yarn generate`

![image](https://user-images.githubusercontent.com/2653167/109537873-a2c0a680-7a7c-11eb-95de-729dbf3399a3.png)


👛 View your deployer address using `yarn account` (You'll need to fund this account. Hint: use an [instant wallet](https://instantwallet.io) to fund your account via QR code)

![image](https://user-images.githubusercontent.com/2653167/109537339-ff6f9180-7a7b-11eb-85b0-46cd72311d12.png)


👨‍🎤 Deploy your NFT smart contract:

```bash

yarn deploy

```
---
---

> ✏️ Edit your frontend `App.jsx` in `packages/react-app/src` to change the `targetNetwork` to wherever you deployed your contract:

![image](https://user-images.githubusercontent.com/2653167/109539175-3e9ee200-7a7e-11eb-8d26-3b107a276461.png)

You should see the correct network in the frontend:

![image](https://user-images.githubusercontent.com/2653167/109539305-655d1880-7a7e-11eb-9385-c169645dc2b5.png)

An instant wallet running on xDAI insired by [xdai.io](https://xdai.io).

## ⚔️ Side Quests

#### 🐟 Open Sea

> Add your contract to OpenSea (  https://testnets.opensea.io/get-listed/step-two  )

(It can take a while before they show up, but here is an example:)

https://testnets.opensea.io/assets/0xaef88d16092679273065e4a79f6b8ef6c28f1313/1

---


#### 🔍 Etherscan Contract Verification

> run `yarn flatten > flat.txt` (You will need to clean up extra junk at the top and bottom of flat.txt. Sorry, rookie stuff here.)

> copy the contents of `flat.txt` to the block explorer and select compiler `v0.6.7` and `Yes` to `Optimization` (200 runs if anyone asks)

![image](https://user-images.githubusercontent.com/2653167/109540618-f84a8280-7a7f-11eb-9a34-c239f1271247.png)

---

#### 🔶 Infura

> You will need to get a key from [infura.io](https://infura.io) and paste it into `constants.js` in `packages/react-app/src`:

![image](https://user-images.githubusercontent.com/2653167/109541146-b5d57580-7a80-11eb-9f9e-04ea33f5f45a.png)

---

## 🛳 Ship the app!

> ⚙️ build and upload your frontend and share the url with your friends...

```bash

# build it:

yarn build

# upload it:

yarn surge

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA)  to ask questions and find others building with 🏗 scaffold-eth!

yarn s3

===================================================== [⏫ back to the top ⏫](https://github.com/austintgriffith/scaffold-eth#-scaffold-eth)

yarn ipfs
```

![image](https://user-images.githubusercontent.com/2653167/109540985-7575f780-7a80-11eb-9ebd-39079cc2eb55.png)

> 👩‍❤️‍👨 Share your public url with a friend and ask them to design and mint a loogie
