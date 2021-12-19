import { Button, Card, Spin } from "antd";
import { useContractLoader, useContractReader } from "eth-hooks";

import React, { useState } from "react";
import externalContracts from "../../contracts/external_contracts";
import deployedContracts from "../../contracts/hardhat_contracts.json";
import { injectContract } from "../../helpers/injectContractConfig";
import { cardGradient, mainColWidth, primaryColor } from "../../styles";
import { Transactor } from "../../helpers";
import { Address } from "..";
import CustomAddress from "../CustomKit/CustomAddress";

const YourContract = ({ contract, injectableAbis, localProvider, userSigner, localChainId, gasPrice }) => {
  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userSigner, gasPrice);

  /**
   * contractConfig not from props, but we create it locally
   * because injecting the Staker is a side effect you
   * may not want to be felt outside this component
   */
  const contractConfig = { deployedContracts: deployedContracts || {}, externalContracts: externalContracts || {} };
  injectContract({
    contractConfig: contractConfig,
    contractAddress: contract.address,
    contractName: "YourContract",
    abi: injectableAbis.YourContract,
    localChainId,
  });

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractConfig);

  // If you want to make 🔐 write transactions to your contracts, use the userSigner:
  const writeContracts = useContractLoader(userSigner, contractConfig, localChainId);

  // ** keep track of total 'threshold' needed of ETH
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  console.log("🧭 purpose:", purpose);

  const [pendingPurposeChange, setPendingPurposeChange] = useState(false);

  // DISPLAY ONLY WHEN ALL LOADED for consistency

  // besides "purpose" you can put in any UI state that needs to be initialized from on-chain contract state
  const essentialState = [purpose];
  const readyAll = essentialState.map(el => typeof el !== "undefined").reduce((acc, el) => acc && el);

  // HACKY HACKY
  // comes in handy if, after certain actions, UI doesn't update automatically
  // use with caution
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return (
    <div>
      <Card
        style={{
          width: mainColWidth,
          margin: "0 auto",
          background: cardGradient,
        }}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              alignSelf: "center",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "1.25rem" }}>{contract.name}</div>

            <CustomAddress noBlockie={true} fontSize={"1.25rem"} value={contract.address} />
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Show Spinner until all your essential contract state is loaded */}
          {!readyAll && (
            <div
              style={{
                height: "30vh",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          )}
          {readyAll && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ fontSize: "1rem" }}>
                Purpose: <span style={{ color: primaryColor }}>{purpose}</span>
              </div>
              <Button
                size="medium"
                loading={pendingPurposeChange}
                type="default"
                onClick={() => {
                  setPendingPurposeChange(true);
                  tx(writeContracts.YourContract.setPurpose("🧑‍💻 Code 24/7"), update => {
                    if (update && (update.error || update.reason)) {
                      setPendingPurposeChange(false);
                    }
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                      setPendingPurposeChange(false);
                      forceUpdate();
                    }
                    if (update && update.code) {
                      // metamask error
                      // may be that user denied transaction, but also actual errors
                      // handle them particularly if you need to
                      // https://github.com/MetaMask/eth-rpc-errors/blob/main/src/error-constants.ts
                      setPendingPurposeChange(false);
                    }
                  });
                }}
              >
                {`Change to 🧑‍💻 Code 24/7`}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default YourContract;
