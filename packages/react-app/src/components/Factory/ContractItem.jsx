import React from "react";
import { softTextColor, primaryColor, dialogOverlayGradient } from "../../styles";
import externalContracts from "../../contracts/external_contracts";
import deployedContracts from "../../contracts/hardhat_contracts.json";
import { injectContract } from "../../helpers/injectContractConfig";
import { useContractLoader, useContractReader } from "eth-hooks";
import { Card, Descriptions } from "antd";
import CustomAddress from "../CustomKit/CustomAddress";
import { UserOutlined } from "@ant-design/icons";

const ContractItem = ({ openContract, contract, abi, localChainId, localProvider, userAddress }) => {
  /**
   * contractConfig not from props, but we create it locally,
   * so that YourContract has the address of the particular contract
   * instance this component is displaying
   */
  const contractConfig = {
    deployedContracts: deployedContracts || {},
    externalContracts: externalContracts || {},
  };
  injectContract({
    contractConfig: contractConfig,
    contractAddress: contract.address,
    contractName: "YourContract",
    abi,
    localChainId,
  });
  const readContracts = useContractLoader(localProvider, contractConfig);
  const owner = useContractReader(readContracts, "YourContract", "owner");
  const isOwnedByCurrentUser = owner === userAddress;
  console.log("owner:", owner);

  // const isOwnedByCurrentUser = false;
  const cellHeight = "2.5rem";
  return (
    <Card
      size="small"
      className="hoverableLight"
      onClick={() => openContract(contract)}
      title={
        <div
          style={{
            padding: "0 0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            justifyContent: "space-between",
            fontWeight: 400,
          }}
        >
          <div style={{ fontSize: "1rem", fontWeight: 500 }}>{contract.name}</div>
          <CustomAddress noBlockie={true} fontSize="1rem" value={contract.address} />
        </div>
      }
    >
      <div style={{ padding: "0.5rem" }}>
        <Descriptions bordered size="small" labelStyle={{ textAlign: "center", height: cellHeight }}>
          <Descriptions.Item
            label="Created"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              width: "10rem",
            }}
            span={4}
          >
            <div>{contract.time.toLocaleString()}</div>
          </Descriptions.Item>
          <Descriptions.Item
            label="By"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            span={4}
          >
            <CustomAddress fontSize={14} value={contract.creator} />
          </Descriptions.Item>
          <Descriptions.Item
            label="Current Owner"
            labelStyle={{ color: softTextColor }}
            contentStyle={{
              padding: "0 1rem",
              height: cellHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              position: "relative",
            }}
            span={4}
          >
            <CustomAddress fontSize={14} value={owner} />
            {isOwnedByCurrentUser && (
              <div
                style={{
                  position: "absolute",
                  right: "1rem",
                  top: "50%",
                  transform: "translateY(calc(-50% - 2px))",
                }}
              >
                <UserOutlined
                  style={{
                    color: primaryColor,
                    background: "hsla(209deg, 100%, 92%, 1)",
                    borderRadius: "50%",
                    width: "1.25rem",
                    height: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${primaryColor}`,
                  }}
                />
              </div>
            )}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Card>
  );
};

export default ContractItem;
