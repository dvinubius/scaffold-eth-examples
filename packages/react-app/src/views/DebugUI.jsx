import { Button, Card, Divider, Space } from "antd";
import React, { useState } from "react";
import { Contract } from "../components";
import { injectContract } from "../helpers/injectContractConfig";
import externalContracts from "../contracts/external_contracts";
// contracts
import deployedContracts from "../contracts/hardhat_contracts.json";
import ContractDebugHeader from "../components/Debug/ContractDebugHeader";
import { mediumButtonMinWidth, primaryColor } from "../styles";
import { LeftOutlined } from "@ant-design/icons";
import ContractDebug from "../components/Debug/ContractDebug";

const DebugUI = ({
  factoryName,
  createdContractName,
  factoryAddress,
  createdContracts,
  injectableAbis,
  localChainId,
  localProvider,
  blockExplorer,
  userSigner,
  contractConfig,
}) => {
  const [openedDebugContract, setOpenedDebugContract] = useState();
  const handleBack = () => setOpenedDebugContract(null);
  return (
    <div
      style={{ width: "70vw", padding: "2rem 0 6rem", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Contract
        name={factoryName}
        signer={userSigner}
        provider={localProvider}
        address={factoryAddress}
        blockExplorer={blockExplorer}
        contractConfig={contractConfig}
        noPadding
      />
      <Divider style={{ margin: "3rem 0 0" }}>
        <span style={{ fontSize: "1.5rem" }}>Created Contracts</span>
      </Divider>
      <div style={{ alignSelf: "stretch" }}>
        {/* HEAD SECTION */}
        <div style={{ height: "14rem", display: "flex", alignItems: "center", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "6rem",
            }}
          >
            🏗
          </div>
          {openedDebugContract && (
            <Button style={{ minWidth: mediumButtonMinWidth }} onClick={handleBack}>
              <LeftOutlined /> Back
            </Button>
          )}
        </div>
      </div>

      {createdContracts && injectableAbis && (
        <>
          {/* OPENED ONE */}
          {openedDebugContract && (
            <ContractDebug
              contractName={createdContractName}
              contract={openedDebugContract.contract}
              contractConfig={openedDebugContract.contractConfig}
              localProvider={localProvider}
              blockExplorer={blockExplorer}
              userSigner={userSigner}
            />
          )}
          {/* LIST */}
          {!openedDebugContract && (
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {createdContracts.map(createdContract => {
                /**
                 * define config locally since injection has side effects
                 */
                const contractCfg = {
                  deployedContracts: deployedContracts || {},
                  externalContracts: externalContracts || {},
                };
                injectContract({
                  contractConfig: contractCfg,
                  contractAddress: createdContract.address,
                  contractName: createdContractName,
                  abi: injectableAbis[createdContractName],
                  localChainId,
                });

                const handleOpen = () =>
                  setOpenedDebugContract({
                    contract: createdContract,
                    contractConfig: contractCfg,
                  });
                return (
                  <div size="small" className="hoverableLight" key={createdContract.address} onClick={handleOpen}>
                    <ContractDebugHeader contract={createdContract} hoverable />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DebugUI;
