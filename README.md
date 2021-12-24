# 🏗 Scaffold-ETH - Dynamic Multi-Contract Starter Kit

> A Starter Kit for dApps where **users** can create and manage multiple contracts

> - 🍦 lean vanilla contract factory 🏭
> - 💪 use-case flexibility 🌍
> - 🧐 mini tutorial 🧭  

> Solidity & React are set up to
> - create contracts
> - browse created contracts
> - interact with created contracts

🧪 Quickly experiment with Solidity using a frontend that adapts to your smart contract:

![image](https://user-images.githubusercontent.com/2653167/124158108-c14ca380-da56-11eb-967e-69cde37ca8eb.png)

🚀 Start with a basic **master-detail UI**, add your functionality

SCREENSHOT 1 & 2

# 🏄‍♂️ Quick Start

### Manual setup

Prerequisites: [Node](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

> clone/fork 🏗 scaffold-eth:

```bash
git clone -b factory-setup https://github.com/scaffold-eth/scaffold-eth-examples.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd scaffold-eth-examples
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd scaffold-eth
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd scaffold-eth
yarn deploy
```

🌍 You need an RPC key for production deployments/Apps, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js`

🔏 Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

# Tutorial 

Whether you're a web3 noob or experienced dev, the following tutorial is a good way to 
- get more **familiar with scaffold-eth**
- learn some ideas for **design patterns**

If you're in for the tutorial, you're in for a treat! 🍭 🤓 Here's what we'll look at

1. Explore the setup - what can a user do?
2. Technicalities - how is it built so far?
3. UX challenges - where can we take it from here? 
# 1. 🤩 Explore the setup

> 🔖 **Create and track** contracts that each have a "purpose" variable

In the "Your Contracts" tab, create a new contract. The dialog keeps the user informed. This is a common UX pattern beyond the generic tx status notifications.

SCREENSHOT 

> 🗺 **Browse** all contracts in a list : ```<CreatedContractsUI/>```

Your new contract should have appeared in the UI. Create a second contract. Observe how the **list updates automatically** as soon as the transaction is mined.

List items only contain data that was available at the moment when the contracts were created.

SCREENSHOT

> 🕹 **Interact** with any particular contract in a detail view: ```<YourContract/>```

Click on a contract to enter the detailed view.

Click any button to change its purpose.

> 🔐 **Access controls** are in place

Open a new browser window in incognito mode, go to [localhost:3000](http://localhost:3000).

Here you won't be able to change the purpose of existing contracts. In this incognito window you are someone else (notice the address at the top of the window). The current signer is not the owner of those contracts.

> 𝌋 A similar master-detail navigation is available in the **Debug UI**

SCREENSHOT

Check out the "Debug Contracts" tab.
- See what the factory's public functions offer. Are they useful?
- What else might be useful in there?

> ** 👩‍💻 😍  **UX** 😍 🧑‍💻 Frontend Side Quest  - Improve UX when setting the purpose **

Return to the UI where you have 2 buttons to set the purpose of a contract.
 
Issue: if you click any of the buttons, both show a spinner while the TX is pending. Not ideal
 
(SCREENSHOT)

Your challenge: find a way to obtain this behaviour instead
 
(SCREENSHOT) 

# 2. 🤓 Technicalities
### YourContract.sol

- The core functionality of your app

- Right now it only has a purpose that can be changed by the owner.

### YourContractFactory.sol

- Creates instances of YourContract and keeps track of them all.

- Kept as lean as possible. 
 
The setup allows **users to create** their own YourContracts **and control them** independent of the factory contract.

As a starting point for developing dApps with this setup, we want **loose coupling**:
- keep created contracts unaware of the factory
- keep the factory unaware of what created contracts actually do

All our factory needs to know is the addresses of created contracts 

SCREENSHOT

We emit **events on contract creation**, so the frontend can easily retrieve a list of all.

SCREENSHOT

We include useful data in those events.

## 📇 Readable Names
👩‍💻 😍 **UX** 😍 🧑‍💻 
 In a dApp built like this user-given **individual contract names** are probably a good feature to have. 

A *simple and cheap* solution is to put the name in the creation event data. If it doesn't need to change over time this works fine.

SCREENSHOT

This retrieval happens via **a single RPC** call made via the ```useEventListener``` hook.

For any more particular / dynamic data, like contract "purpose", contract owner, etc. the frontend uses the contract address to make susequent RPC calls to that particular YourContract instance.

This is what we do in ```<YourContract/>```

SCREENSHOT

## 👨🏻‍💻 🤓  Code Design : Injection! 💉
> 📝 If you're used to scaffold-eth, notice the pattern: we **dynamically inject** the ```YourContract``` **abi** and the particular contract instance address into a locally created ```contractConfig```. After that it's business as usual with ```useContractLoader```. 
> 
> Without the injection there would be no abi at all for ```YourContract``` in the config. Why?
> 
> Because in our hardhat setup we never deployed ```YourContract```.
> 
> 🧐 Looking more closely you'll notice the file ```react-app/contracts/hardhat_non_deployed_contracts.json``` 
> 
> This one is usually not present because we usually include all our contracts when we ```yarn deploy```. They all get fixed deployment addresses there.
> 
> But in our **factory setup**, the ``YourContract`` instances are **created on-chain** and can have any address. So ```yarn deploy``` just makes the **abi** of YourContract available to the frontend by putting it into the file above. Later it can be injected at runtime in combination with a specific address.

## **Challenge 1** : Track purpose changes

> Lets show our users when and how purpose changes happen!

Find the solidity code that refers to SetPurpose events. Uncomment it.

Redeploy with ```yarn deploy --reset```

Find the React code that displays SetPurpose events in ```<YourContract/>```. It is commented out, uncomment it.

Create a new contract. Change its purpose.

> Now, for any particular YourContract, our app
> - displays contract events
> - displays contract state
> - enables contract interaction

SCREENSHOT

## 🔐 🧑‍💻 🔏 Ownership

Our factory ensures that the user who creates a contract also becomes the owner

SCREENSHOT

Without this code, the factory would remain the owner of all YourContract instances.
## **Challenge 2** Contract details in the master view

> 👩‍💻 😍 **UX** 😍 🧑‍💻 
> Suppose we wanted to **display the owner** of any contract in the master view. Probably your users want to easily identify the contracts they've created.

(SCREENSHOT)

The owner can change over time, unlike the creator. We can't build this feature by using contract creation event data.

> 🤔 How do we get the owners of all contracts? 

In each ```<ContractItem />```, we apply the pattern from ```<YourContract/>```: 💉  we dynamically inject the abi & address, so we can read from each particular contract instance. 

Go to ```ContractItem.jsx``` and find the code that fetches owner data. Uncomment it. Find the code that displays this data. Uncomment that.

Now you should see owner information in the contracts list of the master view.

### UX upgrade!
> 👩‍💻 😍 **UX** 😍 🧑‍💻 Owner addresses are hard quite to read. In the contracts list, let's **highlight** items which belong to **the current user**.

```uncomment some code```

### **Challenge 3** : Does it scale?  

> What if there were 100 contracts? 
> 
> Would you make 100 requests in the ```<CreatedContractsUI/>```, immediately after it has retrieved the events? 

It's probably better if we retrieve contract state (the owner) only when that particular contract is actually in view.


### TASK: Add **Pagination** for the contract list 

 
> - This would improve the UX a lot, whether we display contract owners or not
> - If you've done item 1, the frontend only retrieves owners of current page

### 3. TASK: Even better UX


> ** 🧙‍♂️ 🧝‍♀️ 🧞‍♂️ Frontend Side Quest - Allow users to **filter** contracts by name in the list view **

- use an input field
- how do you combine this with the pagination feature?
  
> ** 🧙‍♂️ 🧝‍♀️ 🧞‍♂️ Frontend Side Quest - Allow users to **filter** contracts by only listing their own ones **

- use a switch or checkbox "only mine"
- how do you combine this with the pagination feature?

# Final Thoughts

## 1 Opinionated Solutions
Our approaches in solving UX challenges depend on many factors. If your project is going to have lots of complex data to retrieve, you'll probably use a [**subgraph**](https://docs.scaffoldeth.io/scaffold-eth/toolkit/infrastructure/the-graph) or other web3 indexing tools like [Moralis](https://docs.moralis.io/moralis-server/automatic-transaction-sync/smart-contract-events). These are more capable than the ```useEventListener``` hook, which makes basic RCP calls to query specific events.
## 2 Factory Use Cases

> There are many use cases for a setup similar to this
> 
> Take Uniswap:
> - users create liquidity pools
> - each liquidity pool is a separate contract
> 
> Sometimes the created contracts may be more tightly coupled to the factory - it depends on the use case: how much **control over the contracts** should a user have / should the factory keep?

> ** 🧙‍♂️ 🧝‍♀️ 🧞‍♂️ **Advanced Contract Design** Quest: Dig into the [UniswapV3](https://docs.uniswap.org/protocol/reference/core/UniswapV3Factory) Docs.
> Here the factory is indeed more tightly coupled to the created pools.
> - Why do you think is that?
> - How does Uniswap handle fees?
>   - pool owner fees?
>   - uniswap fees?

### Automated with Gitpod

To deploy this project to Gitpod, click this button:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)

# 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://solidity.readthedocs.io/en/v0.6.6/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/austintgriffith/scaffold-eth/branches/active), [open issues](https://github.com/austintgriffith/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/austintgriffith/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/austintgriffith/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/austintgriffith/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/austintgriffith/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/austintgriffith/scaffold-eth/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/austintgriffith/scaffold-eth/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/austintgriffith/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/austintgriffith/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/austintgriffith/scaffold-eth/tree/aave-ape)

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!
