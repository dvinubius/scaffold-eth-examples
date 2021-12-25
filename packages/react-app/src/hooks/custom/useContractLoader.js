import { useEffect, useMemo, useState } from "react";
import { parseProviderOrSigner } from "./providerOrSigner";
const ethers = require("ethers");

export const useContractLoader = (providerOrSigner, config, chainId) => {
  const initialConfigAddress =
    config.deployedContracts[31337].localhost.contracts.YourContract &&
    config.deployedContracts[31337].localhost.contracts.YourContract.address;

  const [contracts, setContracts] = useState({});
  const configDep = useMemo(() => JSON.stringify(config ?? {}), [config]);

  useEffect(() => {
    let active = true;

    const loadContracts = async () => {
      if (providerOrSigner && typeof providerOrSigner !== "undefined") {
        console.log(`loading contracts`);
        console.log(providerOrSigner, config);
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          if (typeof providerOrSigner !== "undefined") {
            // we need to check to see if this providerOrSigner has a signer or not
            const { providerNetwork } = await parseProviderOrSigner(providerOrSigner);

            const cool =
              config.deployedContracts[31337].localhost.contracts.YourContract &&
              config.deployedContracts[31337].localhost.contracts.YourContract.address === initialConfigAddress;
            debugger;
            // find the current chainId based on this order:
            //  - chainId passed in or a fallback of provider chainId
            const currentChainId = chainId ?? providerNetwork?.chainId ?? 0;

            const contractList = { ...(config.deployedContracts ?? {}) };
            const externalContractList = {
              ...(config.externalContracts ?? {}),
            };
            let combinedContracts = {};

            // combine partitioned contracts based on all the available and chain id.
            if (contractList?.[currentChainId] != null) {
              for (const hardhatNetwork in contractList[currentChainId]) {
                if (Object.prototype.hasOwnProperty.call(contractList[currentChainId], hardhatNetwork)) {
                  if (!config.hardhatNetworkName || hardhatNetwork === config.hardhatNetworkName) {
                    combinedContracts = {
                      ...combinedContracts,
                      ...contractList?.[currentChainId]?.[hardhatNetwork]?.contracts,
                    };
                  }
                }
              }
            }

            if (externalContractList?.[currentChainId] != null) {
              combinedContracts = { ...combinedContracts, ...externalContractList[currentChainId].contracts };
            }

            const newContracts = Object.keys(combinedContracts).reduce((accumulator, contractName) => {
              const address =
                config.customAddresses && Object.keys(config.customAddresses).includes(contractName)
                  ? config.customAddresses[contractName]
                  : combinedContracts[contractName].address;
              accumulator[contractName] = new ethers.Contract(
                address,
                combinedContracts[contractName].abi,
                providerOrSigner,
              );
              return accumulator;
            }, {});

            if (active) setContracts(newContracts);
          }
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    };

    void loadContracts();

    return () => {
      active = false;
      debugger;
    };
    // disable as configDep is used for dep instead of config
  }, [providerOrSigner, configDep]);

  return contracts;
};
